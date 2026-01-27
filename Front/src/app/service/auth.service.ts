import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly token = 'jwt_token'
  constructor() { }

  //Salva o token após o login com sucesso
  setToken(token: string): void{
    sessionStorage.setItem(this.token, token);
  }

  //Recupera o token para ser enviado nas requisições
  getToken(): string | null{
    return sessionStorage.getItem(this.token)
  }

  //Limpa o token
  logout(): void{
    sessionStorage.removeItem(this.token);
  }

  //Verifica se existe um token
  //"!!" transforma o retorno em TRUE ou FALSE, caso o metodo retorne ou não algum dado
  isLoggedIn(): boolean{
    return !!this.getToken();
  }
}
