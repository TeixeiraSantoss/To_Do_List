import { EditTarefaDTO } from './../../../DTOs/TarefaDTOs/EditTarefaDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.scss']
})
export class EditarTarefaComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute){}

  id: number = 0;                                                    
  titulo: string = "";
  descricao: string = "";

  ngOnInit(): void{
    //Recupera Id do URL
    this.route.params
    .subscribe({
      next: (parametros)=>{
        let {id} = parametros

        this.id = id;

        //Busca pela tarefa
        this.client.get<EditTarefaDTO>(`https://localhost:7058/tarefa/buscar/${id}`)
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

    this.client.patch<EditTarefaDTO>(`https://localhost:7058/tarefa/editar/${this.id}`, tarefaEditada)
    .subscribe({
      next: ()=>{
        console.log("Tarefa editada com sucesso")
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }
}
