using System.Security.Claims;
using Back.Data;
using Back.DTOs.TarefaDTOs;
using Back.Interfaces;
using Back.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Services;
public class TarefaService : ITarefaService
{
    private readonly AppDbContext _ctx;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public TarefaService(AppDbContext ctx, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _ctx = ctx;
    }

    //
    //Recuperar UserId
    public int GetUserId()
    {
        //Acessa o HttpContext, encontra o User e recupera a Claim
        var userIdClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

        if(userIdClaim == null)
        {
            throw new DomainException("Usuário não autenticado");
        }

        var userId = int.Parse(userIdClaim.Value);

        return userId;
    }
    //Fim recuperar UserId
    //

    //
    //Cadastrar tarefa
    public void CadastrarTarefaService([FromBody] CreateTarefaDTO DadosTarefa)
    {        
        var userId = GetUserId();

        TarefaModel? TarefaExistente = _ctx.Tarefas.Find(DadosTarefa.id);

        if(TarefaExistente != null)
        {
            throw new DomainException("Tarefa já cadastrada");
        }

        TarefaModel novaTarefa = new TarefaModel{
            titulo = DadosTarefa.titulo,
            descricao = DadosTarefa.descricao,
            status = DadosTarefa.status,
            UsuarioId = userId
        };

        _ctx.Tarefas.Add(novaTarefa);
        _ctx.SaveChanges();
    }
    //Fim cadastrar tarefa
    //

    //
    //Listar tarefas
    public ICollection<ReadTarefaDTO> ListarTarefasService()
    {
        var userId = GetUserId();

        ICollection<ReadTarefaDTO> tarefas = _ctx.Tarefas.Where(t => t.UsuarioId == userId)
            .Select(t => new ReadTarefaDTO
            {
                titulo = t.titulo,
                descricao = t.descricao,
                status = t.status
            }).ToList();

        if(!tarefas.Any())
        {
            throw new DomainException("O usuário não possui tarefas cadastradas");
        }
        
        return tarefas;
    }
    //Fim listar tarefas
    //

    //
    //Editar tarefa
    public void EditarTarefaService(EditTarefaDTO NovosDadosTarefa)
    {
        TarefaModel? tarefaExistente = _ctx.Tarefas.Find(NovosDadosTarefa.id);

        if(tarefaExistente == null)
        {
            throw new DomainException("Tarefa não cadastrada");
        }

        
        tarefaExistente.titulo = NovosDadosTarefa.titulo;
        tarefaExistente.descricao = NovosDadosTarefa.descricao;

        _ctx.Tarefas.Update(tarefaExistente);
        _ctx.SaveChanges();

    }
    //Fim editar tarefa
    //

    //
    //Excluir tarefa
    public void ExcluirTarefaService(int id)
    {
        TarefaModel? tarefaExistente = _ctx.Tarefas.Find(id);

        if(tarefaExistente == null)
        {
            throw new DomainException("Nenhuma tarefa encontrada");
        }

        _ctx.Tarefas.Remove(tarefaExistente);
        _ctx.SaveChanges();
    }
    //Fim excluir tarefa
    //

    //
    //Concluir tarefa
    public void ConcluirTarefaService(int id)
    {
        TarefaModel? tarefaExistente = _ctx.Tarefas.Find(id);

        if(tarefaExistente == null)
        {
            throw new DomainException("Tarefa não existente");
        }

        tarefaExistente.status = StatusEnum.Concluida;

        _ctx.Tarefas.Update(tarefaExistente);
        _ctx.SaveChanges();
    }
    //Fim concluir tarefa
    //
}