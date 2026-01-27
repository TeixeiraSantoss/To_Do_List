import { TarefaModel } from "./TarefaModel";

export interface UsuarioModel{
    id: number;
    nome: string;
    email: string;
    senha: string;
    tarefas: TarefaModel[];
}