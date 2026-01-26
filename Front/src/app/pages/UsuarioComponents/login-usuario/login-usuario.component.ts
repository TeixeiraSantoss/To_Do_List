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

  senha: string = ""

  onSubmit(): void{
    
  }
}
