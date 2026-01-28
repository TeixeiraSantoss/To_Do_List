import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReadTarefaDTO } from 'src/app/DTOs/TarefaDTOs/ReadTarrefaDTO';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.scss']
})
export class ListarTarefaComponent {
  constructor (private client: HttpClient, private authService: AuthService, private route: Router){}

  tarefas: ReadTarefaDTO[] = []

  Listar(): void{
    //Recupera token do sessionStorage
    const token = this.authService.getToken();

    //Cria o header que vai ser enviado na requisição
    //O token vai ser enviado no header e o middleware faz a autenticação e verificação do token+s
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.client.get<ReadTarefaDTO[]>("https://localhost:7058/tarefa/listar", {headers: headers})
    .subscribe({
      next: (tarefasAPI)=>{
        this.tarefas = tarefasAPI
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }

  Excluir(id: number): void{
    this.client.delete(`https://localhost:7058/tarefa/excluir/${id}`)
    .subscribe({
      next: ()=>{

      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }

  Editar(id: number): void{
    this.route.navigate([`tarefa/editar/${id}`])
  }

  ngOnInit(): void{
    this.Listar();
  }
}
