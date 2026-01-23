using Back.Data;
using Back.DTOs;
using Back.Interfaces;
using Back.Models;

namespace Back.Services;
public class UsuarioService : IUsuarioService
{
    private readonly AppDbContext _ctx;
    public UsuarioService(AppDbContext ctx)
    {
        _ctx = ctx;
    }


    //
    //Cadastrar Usuario
    public void CadastrarUsuarioService(CreateUsuarioDTO DadosUsuario)
    {
        //Verifica se usuario já está cadastrado
        UsuarioModel? UsuarioExistente = _ctx.Usuarios.Find(DadosUsuario.id);

        //Se ja for cadastrado lança uma Exception
        if(UsuarioExistente != null)
        {
            throw new DomainException("Usuario já cadastrado");
        }

        //Caso não seja cadastrado, cria um NovoUsuario
        UsuarioModel NovoUsuario = new UsuarioModel
        {
            nome = DadosUsuario.nome,
            senha = DadosUsuario.senha
        };

        //Salva o NovoUsuario
        _ctx.Usuarios.Add(NovoUsuario);
        _ctx.SaveChanges();
    }
    //Fim Cadastrar Usuario
    //
}