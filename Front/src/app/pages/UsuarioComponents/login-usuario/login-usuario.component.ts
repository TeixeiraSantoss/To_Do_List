import { LoginUsuarioDTO } from './../../../DTOs/UsuarioDTOs/LoginUsuarioDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent {
  constructor(private client: HttpClient, private authService: AuthService){}

  email: string = ""
  senha: string = ""

  onSubmit(): void{
    const dadosLogin: LoginUsuarioDTO ={
      email: this.email,
      senha: this.senha
    }

    this.client.post<{token: string}>("https://localhost:7058/usuario/login", dadosLogin).subscribe({
      next: (response)=>{
        this.authService.setToken(response.token);
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }
}
