using Back.DTOs;

namespace Back.Interfaces;
public interface IUsuarioService
{
    void CadastrarUsuarioService(CreateUsuarioDTO DadosUsuario);
    string LoginUsuarioService(LoginUsuarioDTO LoginInfo);
}