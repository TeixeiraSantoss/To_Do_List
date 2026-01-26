import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CreateUsuarioDTO } from 'src/app/DTOs/UsuarioDTOs/CreateUsuarioDTO';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {
  constructor(private client: HttpClient){}

  nome: string = "";
  senha: string = "";

  onSubmit(): void{
    const novoUsuario: CreateUsuarioDTO = {
      id: 0,
      nome: this.nome,
      senha: this.senha
    }

    this.client.post("https://localhost:7058/usuario/cadastrar", novoUsuario).subscribe({
      next: () =>{
        console.log("Usuario cadastrado com sucesso")
      },
      error: (erro) =>{
        console.log(erro)
      }
    })
  }
}
