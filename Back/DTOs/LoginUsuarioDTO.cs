using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.DTOs
{
    public class LoginUsuarioDTO
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string senha { get; set; }
    }
}