import { StatusEnum } from "src/app/models/StatusEnum";

export interface ReadTarefaDTO{
    id: number;
    titulo: string;
    descricao: string;
    status: StatusEnum;
}