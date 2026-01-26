using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Back.Data;
using Back.DTOs;
using Back.Interfaces;
using Back.Models;
using Microsoft.IdentityModel.Tokens;

namespace Back.Services;
public class UsuarioService : IUsuarioService
{
    private readonly AppDbContext _ctx;
    private readonly IConfiguration _configuration;
    public UsuarioService(AppDbContext ctx, IConfiguration configuration)
    {
        _configuration = configuration;
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
            email = DadosUsuario.email,
            senha = BCrypt.Net.BCrypt.HashPassword(DadosUsuario.senha)
        };

        //Salva o NovoUsuario
        _ctx.Usuarios.Add(NovoUsuario);
        _ctx.SaveChanges();
    }
    //Fim Cadastrar Usuario
    //

    //
    //Login Usuario
    public string LoginUsuarioService(LoginUsuarioDTO LoginInfo)
    {  
        UsuarioModel? UsuarioExistente = _ctx.Usuarios.FirstOrDefault(u => u.email == LoginInfo.email);

        if(UsuarioExistente == null)
        {
            throw new DomainException("Usuario não cadastrado");
        }

        //Verifica se as senhas são iguais
        if(!BCrypt.Net.BCrypt.Verify(LoginInfo.senha, UsuarioExistente.senha))
        {
            throw new DomainException("Senha incorreta");
        }        

        //Criando o JWT
            //Cria claims do token
            var claim = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, UsuarioExistente.id.ToString()),
                new Claim(ClaimTypes.Name, UsuarioExistente.nome)
            };

            //chave de segurança
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:key"])
            );

            //credenciais de assinatura
            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            //expiração
            var expiration = DateTime.UtcNow.AddHours(2);

            //criação do token
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claim,
                expires: expiration,
                signingCredentials: creds
            );
        //fim criação do token

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    //Fim Login
    //

    //
    //Listar usuario
    public ICollection<UsuarioModel> ListarUsuarioService()
    {
        ICollection<UsuarioModel> usuarios = _ctx.Usuarios.ToList();

        return usuarios;
    }
    //Fim listar usuario    
    //
}