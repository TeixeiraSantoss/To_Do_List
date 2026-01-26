using Back.DTOs.TarefaDTOs;

namespace Back.Interfaces;
public interface ITarefaService
{
    void CadastrarTarefaService(CreateTarefaDTO DadosTarefa);
    ICollection<ReadTarefaDTO> ListarTarefasService();
    void EditarTarefaService(EditTarefaDTO NovosDadosTarefa);
    void ExcluirTarefaService(int id);
    void ConcluirTarefaService(int id);
}