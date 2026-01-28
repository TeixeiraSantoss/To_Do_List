import { AlterarStatusDTO } from './../../../DTOs/TarefaDTOs/AlterarStatusDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReadTarefaDTO } from 'src/app/DTOs/TarefaDTOs/ReadTarrefaDTO';
import { StatusEnum } from 'src/app/models/StatusEnum';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.scss']
})
export class ListarTarefaComponent {
  constructor (private client: HttpClient, private authService: AuthService, private router: Router){}

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
        console.table(tarefasAPI)
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }

  Excluir(id: number): void{
    //Recupera token do sessionStorage
    const token = this.authService.getToken();

    //Cria o header que vai ser enviado na requisição
    //O token vai ser enviado no header e o middleware faz a autenticação e verificação do token+s
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.client.delete(`https://localhost:7058/tarefa/excluir/${id}`, {headers: headers})
    .subscribe({
      next: ()=>{
        this.Listar()
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }

  Editar(id: number): void{
    this.router.navigate([`tarefa/editar/${id}`])
  }

  Concluir(id: number): void{
    //Recupera token do sessionStorage
    const token = this.authService.getToken();

    //Cria o header que vai ser enviado na requisição
    //O token vai ser enviado no header e o middleware faz a autenticação e verificação do token+s
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const statusConcluida: AlterarStatusDTO = {
      status: StatusEnum.Concluida
    }

    this.client.patch<AlterarStatusDTO>(`https://localhost:7058/tarefa/concluir/${id}`, statusConcluida, {headers: headers})
    .subscribe({
      next: ()=>{
        console.log("Tarefa concluida com sucesso")
      },
      error: (erro)=>{
        console.log(statusConcluida)
        console.log(erro)
      }
    })
  }

  NavegarCadastroTarefa(): void{
    this.router.navigate(['tarefa/cadastrar'])
  }

  ngOnInit(): void{
    this.Listar();
  }
}
