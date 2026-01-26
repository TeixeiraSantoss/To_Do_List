using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.DTOs.TarefaDTOs
{
    public class EditTarefaDTO
    {
        public int id { get; set; }
        public string titulo { get; set; }
        public string descricao { get; set; }
    }
}