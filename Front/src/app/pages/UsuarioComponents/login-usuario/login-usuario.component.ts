import { LoginUsuarioDTO } from './../../../DTOs/UsuarioDTOs/LoginUsuarioDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent {
  constructor(private client: HttpClient, private authService: AuthService, private router: Router, private fb: FormBuilder){}

  form!: FormGroup;

  isSubmitting = false;

  messageErrors: string[] = []

  ngOnInit(): void{
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]],
      senha: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]]
    })
  }

  naoSoEspacosValidator(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null
    if(v == null) return null
    return v.trim().length === 0? {apenasEspacos: true} : null
  }

  get email(): AbstractControl | null {return this.form.get('email')};
  get senha(): AbstractControl | null {return this.form.get('senha')};

  onSubmit(): void{
    if(this.isSubmitting) return

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }

    const formValue = this.form.value;

    const dadosLogin: LoginUsuarioDTO ={
      email: (formValue.email as string).trim(),
      senha: (formValue.senha as string).trim()
    }

    this.client.post<{token: string}>("https://localhost:7058/usuario/login", dadosLogin).subscribe({
      next: (response)=>{
        this.authService.setToken(response.token);

        this.isSubmitting = false
        this.form.reset()

        this.router.navigate(['tarefa/listar']);
      },
      error: (erro)=>{
        console.log(erro)
        this.isSubmitting = false;

        this.messageErrors = ["Senha ou Email incorretos"]
        setTimeout(() => this.messageErrors = [],3000)
      }
    })
  }

  NavegarCadastro(): void{
    this.router.navigate(['usuario/cadastrar'])
  }
}
