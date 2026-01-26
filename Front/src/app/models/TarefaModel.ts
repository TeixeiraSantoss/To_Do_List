import { StatusEnum } from "./StatusEnum";

export interface TarefaModel{
    id: number;
    titulo: string;
    descricao: string;
    status: StatusEnum;
    usuarioId: number
}