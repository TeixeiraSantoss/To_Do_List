import { StatusEnum } from "src/app/models/StatusEnum";

export interface ReadTarefaDTO{
    titulo: string;
    descricao: string;
    status: StatusEnum;
}