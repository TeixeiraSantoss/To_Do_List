using Back.Data;
using Back.Models;
using Back.DTOs.TarefaDTOs;
using Back.Services;
using Back;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Back.Tests.Services
{
    public class TarefaServiceTests
    {
        [Fact]
        public void CadastrarTarefa_DeveCadastrarTarefa_QuandoDadosForemValidos()
        {
            // ARRANGE
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new AppDbContext(options);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "1")
            };

            var identity = new ClaimsIdentity(claims, "TestAuth");
            var user = new ClaimsPrincipal(identity);

            var httpContext = new DefaultHttpContext();
            httpContext.User = user;

            var httpContextAccessor = new HttpContextAccessor
            {
                HttpContext = httpContext
            };

            var service = new TarefaService(context, httpContextAccessor);

            var dto = new CreateTarefaDTO
            {
                titulo = "Estudar Testes",
                descricao = "Aprender xUnit",
                status = StatusEnum.Pendente
            };

            // ACT
            service.CadastrarTarefaService(dto);

            // ASSERT
            var tarefaSalva = context.Tarefas.FirstOrDefault();

            Assert.NotNull(tarefaSalva);
            Assert.Equal("Estudar Testes", tarefaSalva!.titulo);
            Assert.Equal(1, tarefaSalva!.UsuarioId);
        }

        [Fact]
        public void CadastrarTarefa_DeveCadastrarTarefa_RetornarDomainException()
        {
            // ARRANGE
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new AppDbContext(options);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "1")
            };

            var identity = new ClaimsIdentity(claims, "TestAuth");
            var user = new ClaimsPrincipal(identity);

            var httpContext = new DefaultHttpContext();
            httpContext.User = user;

            var httpContextAccessor = new HttpContextAccessor
            {
                HttpContext = httpContext
            };

            var service = new TarefaService(context, httpContextAccessor);

            var dto = new CreateTarefaDTO
            {
                id = 1,
                titulo = "Estudar Testes",
                descricao = "Aprender xUnit",
                status = StatusEnum.Pendente
            };

            var novaTarefa = new TarefaModel
            {
                id = 1,
                titulo = "Tarefa Cadastrada",
                descricao = "Aprender xUnit",
                status = StatusEnum.Pendente
            };

            context.Tarefas.Add(novaTarefa);
            context.SaveChanges();

            // ACT + ASSERT
            var exception = Assert.Throws<DomainException>(() =>
                service.CadastrarTarefaService(dto)
            );

            Assert.Equal("Tarefa já cadastrada", exception.Message);
        }

        [Fact]
        public void CadastrarTarefa_DeveFalhar_QuandoUsuarioNaoAutenticado()
        {
            // ARRANGE
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new AppDbContext(options);

            var httpContext = new DefaultHttpContext();
            httpContext.User = new ClaimsPrincipal(new ClaimsIdentity());

            var httpContextAccessor = new HttpContextAccessor
            {
                HttpContext = httpContext
            };

            var service = new TarefaService(context, httpContextAccessor);

            var dto = new CreateTarefaDTO
            {
                titulo = "Estudar Testes",
                descricao = "Aprender xUnit",
                status = StatusEnum.Pendente
            };

            // ACT + ASSERT
            var exception = Assert.Throws<DomainException>(() =>
                service.CadastrarTarefaService(dto)
            );

            Assert.Equal("Usuário não autenticado", exception.Message);
        }

    }
}