import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUsuarioDTO } from 'src/app/DTOs/UsuarioDTOs/CreateUsuarioDTO';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {
  constructor(private client: HttpClient, private router: Router, private fb: FormBuilder){}

  form!: FormGroup;
  
  isSubmitting = false

  messageErrors: string[] = []

  ngOnInit(): void{
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]],
      email: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]],
      senha: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacosValidator]]
    })
  }

  naoSoEspacosValidator(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null
    if(v == null) return null
    return v.trim().length === 0? {apenasEspacos: true} : null
  }

  get nome(): AbstractControl | null {return this.form.get('nome')};
  get email(): AbstractControl | null {return this.form.get('email')};
  get senha(): AbstractControl | null {return this.form.get('senha')};

  onSubmit(): void{
    if(this.isSubmitting) return

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }

    const formValue = this.form.value;

    const novoUsuario: CreateUsuarioDTO = {
      id: 0,
      nome: (formValue.nome as string).trim(),
      email: (formValue.email as string).trim(),
      senha: (formValue.senha as string).trim()
    }

    this.client.post("https://localhost:7058/usuario/cadastrar", novoUsuario).subscribe({
      next: (response) =>{
        console.log("Sucesso", response)

        this.form.reset();
        this.isSubmitting = false;
        
        this.router.navigate(['usuario/login'])
      },
      error: (erro) =>{
        console.log(erro)
        this.isSubmitting = false;
      }
    })
  }
}
