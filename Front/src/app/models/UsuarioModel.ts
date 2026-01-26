import { TarefaModel } from "./TarefaModel";

export interface UsuarioModel{
    id: number;
    nome: string;
    senha: string;
    tarefas: TarefaModel[];
}