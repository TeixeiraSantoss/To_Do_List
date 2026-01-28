using Back.DTOs.TarefaDTOs;
using Back.Interfaces;
using Back.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;


[Authorize]
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
        return Ok(new {message = "Tarefa cadastrada com sucesso"});
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
    //Buscar por id
    [HttpGet("buscar/{id}")]
    public IActionResult BuscarById(int id)
    {
        EditTarefaDTO tarefaEncontrada = _iTarefaService.BuscarByIdService(id);

        return Ok(tarefaEncontrada);
    }
    //Fim buscar por id
    //

    //
    //Editar tarefa
    [HttpPatch("editar/{id}")]
    public IActionResult EditarTarefa([FromBody] EditTarefaDTO NovosDadosTarefa, [FromRoute] int id)
    {
        NovosDadosTarefa.id = id;
        _iTarefaService.EditarTarefaService(NovosDadosTarefa);

        return Ok(new {message = "Tarefa editada com sucesso"});
    }
    //Fim editar tarefa
    //

    //
    //Excluir tarefa
    [HttpDelete("excluir/{id}")]
    public IActionResult ExcluirTarefa([FromRoute] int id)
    {
        _iTarefaService.ExcluirTarefaService(id);
        return Ok(new {message = "Tarefa excluida com sucesso"});
    }
    //Fim excluir tarefa
    //

    //
    //Concluir tarefa
    [HttpPatch("concluir/{id}")]
    public IActionResult ConcluirTarefa([FromRoute]int id, [FromBody]AlterarStatusDTO novoStatus)
    {
        _iTarefaService.ConcluirTarefaService(id, novoStatus);
        return Ok(new {message = "Tarefa concluida"});
    }
    //Fim concluir tarefa
    //
}
