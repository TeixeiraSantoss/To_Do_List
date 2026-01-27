import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarUsuarioComponent } from './pages/UsuarioComponents/cadastrar-usuario/cadastrar-usuario.component';
import { LoginUsuarioComponent } from './pages/UsuarioComponents/login-usuario/login-usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarTarefaComponent } from './pages/TarefaComponents/listar-tarefa/listar-tarefa.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarUsuarioComponent,
    LoginUsuarioComponent,
    ListarTarefaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
