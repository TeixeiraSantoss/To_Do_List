import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
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
  constructor(private client: HttpClient, private auth: AuthService, private router: Router){}

  titulo: string = "";
  descricao: string = "";

  onSubmit(): void{
    const novaTarefa: CreateTarefaDTO = {
      titulo: this.titulo,
      descricao: this.descricao,
      status: 1
    }

    //Recupera token do sessionStorage
    const token = this.auth.getToken()

    //Cria o header que vai ser enviado junto da requisição
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 

    this.client.post("https://localhost:7058/tarefa/cadastrar", novaTarefa, {headers: headers})
    .subscribe({
      next: ()=>{
        console.log("Tarefa cadastrada com sucesso")
        this.router.navigate(['tarefa/listar'])
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }
}
