import { StatusEnum } from "src/app/models/StatusEnum";

export interface CreateTarefaDTO{
    titulo: string;
    descricao: string;
    status: StatusEnum;
}