import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsuarioComponent } from './pages/UsuarioComponents/login-usuario/login-usuario.component';
import { CadastrarUsuarioComponent } from './pages/UsuarioComponents/cadastrar-usuario/cadastrar-usuario.component';
import { ListarTarefaComponent } from './pages/TarefaComponents/listar-tarefa/listar-tarefa.component';

const routes: Routes = [
  {
    path: "",
    component: LoginUsuarioComponent
  },
  {
    path: "usuario/cadastrar",
    component: CadastrarUsuarioComponent
  },
  {
    path: "tarefa/listar",
    component: ListarTarefaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
