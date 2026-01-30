import { NgbDatepickerNavigateEvent } from './../../../../../node_modules/@ng-bootstrap/ng-bootstrap/datepicker/datepicker.d';
import { EditTarefaDTO } from './../../../DTOs/TarefaDTOs/EditTarefaDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.scss']
})
export class EditarTarefaComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute, private authService: AuthService, private router: Router, private fb: FormBuilder){}

  form!: FormGroup;

  isSubmitting = false;

  serverErrors: string[] = [];

  id: number = 0;
  tarefa: EditTarefaDTO | null = null;

  ngOnInit(): void{
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]],
      descricao: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]]
    })

    //Recupera token do sessionStorage
        const token = this.authService.getToken();
    
        //Cria o header que vai ser enviado na requisição
        //O token vai ser enviado no header e o middleware faz a autenticação e verificação do token+s
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
    //Recupera Id do URL
    this.route.params
    .subscribe({
      next: (parametros)=>{
        let {id} = parametros

        this.id = id;

        //Busca pela tarefa
        this.client.get<EditTarefaDTO>(`https://localhost:7058/tarefa/buscar/${id}`, {headers: headers})
        .subscribe({
          next: (response)=>{
            this.tarefa = response
            this.preencherFormulario()
          },
          error: (erro)=>{
            console.log(erro)
          }
        })
      }
    })
  }

  naoSoEspacosValidator(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null
    if(v == null) return null
    return v.trim().length === 0? {apenasEspacos: true} : null
  }
  
  get titulo(): AbstractControl | null {return this.form.get('titulo')};
  get descricao(): AbstractControl | null {return this.form.get('descricao')};

  Editar(): void{
    if(this.isSubmitting) return

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }  

    const formValue = this.form.value;

    const tarefaEditada: EditTarefaDTO = {
      id: this.id,
      titulo: (formValue.titulo as string).trim(),
      descricao: (formValue.descricao as string).trim()
    }

    this.isSubmitting = true

    //Recupera token do sessionStorage
    const token = this.authService.getToken();

    //Cria o header que vai ser enviado na requisição
    //O token vai ser enviado no header e o middleware faz a autenticação e verificação do token+s
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    this.client.patch<EditTarefaDTO>(`https://localhost:7058/tarefa/editar/${this.id}`, tarefaEditada, {headers: headers})
    .subscribe({
      next: (response)=>{
        console.log("Sucesso: ", response)

        this.form.reset()
        this.isSubmitting = false

        this.NavegarListar();        
      },
      error: (erro)=>{
        console.log(erro)
        this.isSubmitting = false
      }
    })
  }

  NavegarListar(): void{
    this.router.navigate(['tarefa/listar']);
  }

  preencherFormulario(){
    //Como estou usando FormGroup para manipular meu fomulario
    //é preciso utilizar das funções oferecidas pelo Angular para manipular esses dados
    //no caso de atribuir um valor a algum campo manualmente, é possivel uilizar o "patchValue" para
    //definir valores a alguns campos especificos
    this.form.patchValue({
      titulo: this.tarefa?.titulo,
      descricao: this.tarefa?.descricao
    })
  }
}
