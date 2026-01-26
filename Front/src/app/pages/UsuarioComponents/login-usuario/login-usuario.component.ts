import { LoginUsuarioDTO } from './../../../DTOs/UsuarioDTOs/LoginUsuarioDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent {
  constructor(private client: HttpClient){}

  email: string = ""
  senha: string = ""

  onSubmit(): void{
    const dadosLogin: LoginUsuarioDTO ={
      email: this.email,
      senha: this.senha
    }

    this.client.post("https://localhost:7058/usuario/login", dadosLogin).subscribe({
      next: ()=>{
        console.log("Login realizado com sucesso")
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }
}
