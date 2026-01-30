import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTarefaDTO } from 'src/app/DTOs/TarefaDTOs/CreateTarefaDTO';
import { StatusEnum } from 'src/app/models/StatusEnum';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrls: ['./cadastrar-tarefa.component.scss']
})
export class CadastrarTarefaComponent {
  constructor(private client: HttpClient, private auth: AuthService, private router: Router, private fb: FormBuilder){}

  form!: FormGroup;

  isSubmitting = false;

  serverErrors: string[] = []

  ngOnInit(): void{
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]],
      descricao: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]]
    })
  }

  naoSoEspacosValidator(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null
    if(v == null) return null
    return v.trim().length === 0? {apenasEspacos: true} : null
  }

  get titulo(): AbstractControl | null {return this.form.get('titulo')};
  get descricao(): AbstractControl | null {return this.form.get('descricao')};

  onSubmit(): void{
    if (this.isSubmitting) return

    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }

    const formValue = this.form.value;

    const novaTarefa: CreateTarefaDTO = {
      titulo: (formValue.titulo as string).trim(),
      descricao: (formValue.descricao as string).trim(),
      status: 1
    }

    this.isSubmitting = true;

    //Recupera token do sessionStorage
    const token = this.auth.getToken()

    //Cria o header que vai ser enviado junto da requisição
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 

    this.client.post("https://localhost:7058/tarefa/cadastrar", novaTarefa, {headers: headers})
    .subscribe({
      next: (response)=>{
        console.log("Sucesso: ", response)
        
        this.form.reset()
        this.isSubmitting = false

        this.router.navigate(['tarefa/listar'])
      },
      error: (erro)=>{
        console.log(erro)
        this.isSubmitting = false
      }
    })
  }
}
