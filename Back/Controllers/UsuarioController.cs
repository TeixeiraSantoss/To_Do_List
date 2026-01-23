using Back.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
[Route("usuario")]
public class UsuarioController : ControllerBase
{
    //
    //Cadastro usuario
    [HttpPost("cadastrar")]
    public IActionResult CadastrarUsuario([FromBody] CreateUsuarioDTO DadosUsuario)
    {
        return Ok();
    }
    //Fim cadastro usuario
    //
}
