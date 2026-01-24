using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Microsoft.EntityFrameworkCore;

namespace Back.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {            
        }

        public DbSet<UsuarioModel> Usuarios { get; set; }
        public DbSet<TarefaModel> Tarefas { get; set; }
    }
}