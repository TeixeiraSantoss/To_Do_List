using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;

namespace Back.DTOs.TarefaDTOs
{
    public class ReadTarefaDTO
    {
        public string titulo { get; set; }
        public string descricao { get; set; }
        public StatusEnum status { get; set; }
    }
}