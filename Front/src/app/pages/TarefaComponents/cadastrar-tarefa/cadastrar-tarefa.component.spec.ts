import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTarefaComponent } from './cadastrar-tarefa.component';
//"of" é um observable falso
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('CadastrarTarefaComponent', () => {
  let component: CadastrarTarefaComponent;
  let fixture: ComponentFixture<CadastrarTarefaComponent>;

  //Mocks para simular cenário real
  let httpClientMock: any;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    //Criando os mocks
    httpClientMock = {
      post: jasmine.createSpy('post').and.returnValue(of({}))
    };

    authServiceMock = {
      getToken: jasmine.createSpy('getToken').and.returnValue('fakeToken')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    }

    await TestBed.configureTestingModule({
      declarations: [ CadastrarTarefaComponent ],
      providers: [
        {provide: HttpClient, useValue: httpClientMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: routerMock}
      ],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve chamar API e navegar ao cadastrar tarefa', () => {
    //Simula a criação da tarefa
    component.titulo = 'Estudo Angular';
    component.descricao = 'Aprendendo a escrever testes unitarios'

    //Executa a ação
    component.onSubmit();

    //define os resultados esperados
    expect(authServiceMock.getToken).toHaveBeenCalled();
    expect(httpClientMock.post).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
