using Back.DTOs;

namespace Back.Interfaces;
public interface IUsuarioService
{
    void CadastrarUsuarioService(CreateUsuarioDTO DadosUsuario);
}