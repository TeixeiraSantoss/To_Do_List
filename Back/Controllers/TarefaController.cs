using Back.DTOs.TarefaDTOs;
using Back.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
[Route("tarefa")]
public class TarefaController : ControllerBase
{
    private readonly ITarefaService _iTarefaService;
    public TarefaController(ITarefaService iTarefaService){
        _iTarefaService = iTarefaService;
    }

    //
    //Cadastrar tarefa
    [HttpPost("cadastrar")]
    public IActionResult CadastraTarefa([FromBody] CreateTarefaDTO DadosTarefa)
    {
        _iTarefaService.CadastrarTarefaService(DadosTarefa);
        return Ok("Tarefa cadastrada com sucesso");
    }
    //Fim cadastrar tarefa
    //

    //
    //Listar tarefas
    [HttpGet("listar")]
    public IActionResult ListarTarefas()
    {
        return Ok(_iTarefaService.ListarTarefasService());
    }
    //Fim listar tarefas
    //

    //
    //Editar tarefa
    [HttpPatch("editar/{id}")]
    public IActionResult EditarTarefa([FromBody] EditTarefaDTO NovosDadosTarefa, [FromRoute] int id)
    {
        NovosDadosTarefa.id = id;
        _iTarefaService.EditarTarefaService(NovosDadosTarefa);

        return Ok("Tarefa editada com sucesso");
    }
    //Fim editar tarefa
    //

    //
    //Excluir tarefa
    [HttpDelete("excluir/{id}")]
    public IActionResult ExcluirTarefa([FromRoute] int id)
    {
        _iTarefaService.ExcluirTarefaService(id);
        return Ok("Tarefa excluida com sucesso");
    }
    //Fim excluir tarefa
    //
}
