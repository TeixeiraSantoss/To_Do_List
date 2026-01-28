import { NgbDatepickerNavigateEvent } from './../../../../../node_modules/@ng-bootstrap/ng-bootstrap/datepicker/datepicker.d';
import { EditTarefaDTO } from './../../../DTOs/TarefaDTOs/EditTarefaDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.scss']
})
export class EditarTarefaComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute, private authService: AuthService, private router: Router){}

  id: number = 0;                                                    
  titulo: string = "";
  descricao: string = "";

  ngOnInit(): void{
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
            this.titulo = response.titulo
            this.descricao = response.descricao
          },
          error: (erro)=>{
            console.log(erro)
          }
        })
      }
    })
  }

  Editar(): void{
    const tarefaEditada: EditTarefaDTO = {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao
    }

    //Recupera token do sessionStorage
    const token = this.authService.getToken();

    //Cria o header que vai ser enviado na requisição
    //O token vai ser enviado no header e o middleware faz a autenticação e verificação do token+s
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    this.client.patch<EditTarefaDTO>(`https://localhost:7058/tarefa/editar/${this.id}`, tarefaEditada, {headers: headers})
    .subscribe({
      next: ()=>{
        console.log("Tarefa editada com sucesso")
        console.log("cheguei ate aqui")
        
      },
      error: (erro)=>{
        console.log(erro)
        this.NavegarListar();
      }
    })
  }

  NavegarListar(): void{
    this.router.navigate(['tarefa/listar']);
  }
}
