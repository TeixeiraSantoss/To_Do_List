using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models
{
    public class TarefaModel
    {
        public int id { get; set; }
        public string titulo { get; set; }
        public string descricao { get; set; }
        public StatusEnum status { get; set; }
    }
}