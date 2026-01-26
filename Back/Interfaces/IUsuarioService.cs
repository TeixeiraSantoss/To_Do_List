using Back.DTOs;
using Back.Models;

namespace Back.Interfaces;
public interface IUsuarioService
{
    void CadastrarUsuarioService(CreateUsuarioDTO DadosUsuario);
    string LoginUsuarioService(LoginUsuarioDTO LoginInfo);
    ICollection<UsuarioModel> ListarUsuarioService();
}