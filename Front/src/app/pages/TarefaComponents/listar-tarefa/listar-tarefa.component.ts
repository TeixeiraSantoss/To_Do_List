import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.scss']
})
export class ListarTarefaComponent {
  constructor (private client: HttpClient){}

  

  Listar(): void{

  }
}
