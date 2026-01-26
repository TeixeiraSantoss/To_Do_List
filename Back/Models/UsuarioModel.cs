using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models
{
    public class UsuarioModel
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string email { get; set; }
        public string senha { get; set; }
        public ICollection<TarefaModel> Tarefas { get; set; } = new List<TarefaModel>();
    }
}