using Back.DTOs;
using Back.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
[Route("usuario")]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _iusuarioService;

    public UsuarioController(IUsuarioService iusuarioService)
    {
        _iusuarioService = iusuarioService;
    }

    //
    //Cadastro usuario
    [HttpPost("cadastrar")]
    public IActionResult CadastrarUsuario([FromBody] CreateUsuarioDTO DadosUsuario)
    {
        _iusuarioService.CadastrarUsuarioService(DadosUsuario);
        return Ok("Usuario cadastrado com sucesso");
    }
    //Fim cadastro usuario
    //

    //
    //Login usuario
    [HttpPost("login")]
    public IActionResult LoginUsuario([FromBody] LoginUsuarioDTO LoginInfo)
    {
        var token = _iusuarioService.LoginUsuarioService(LoginInfo);
        return Ok(new {token = token});
    }
    //Fim Login
    //

    //
    //Listar Usuarios
    [HttpGet("listar")]
    public IActionResult ListarUsuario()
    {
        return Ok(_iusuarioService.ListarUsuarioService());
    }
    //Fim listar usuarios
    //
}
