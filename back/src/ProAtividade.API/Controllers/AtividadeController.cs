using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AtividadeController : ControllerBase
  {
    private readonly IAtividadeService _atividadeService;
    public AtividadeController(IAtividadeService atividadeService)
    {
      _atividadeService = atividadeService;

    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      try
      {
        var atividades = await _atividadeService.PegarTodasAtividadesAsync();
        if (atividades == null)
          return NoContent();

        return Ok(atividades);
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, ($"Erro ao tentar recuperar atividades. Erro: {ex.Message}"));
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
      try
      {
        var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
        if (atividade == null)
          return NoContent();

        return Ok(atividade);
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, ($"Erro ao tentar recuperar atividade ID: {id}. Erro: {ex.Message}"));
      }
    }

    [HttpPost]
    public async Task<IActionResult> Post(Atividade model)
    {
      try
      {
        var ativ = await _atividadeService.AdicionarAtividade(model);
        if (ativ == null)
          return NoContent();

        return Ok(ativ);
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, ($"Erro ao tentar adicionar atividade ID: {model.Id}. Erro: {ex.Message}"));
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Atividade model)
    {
      try
      {
        if (model.Id != id)
          return this.StatusCode(StatusCodes.Status409Conflict, ($"Você está tentando editar a atividade errada."));

        var atividade = await _atividadeService.EditarAtividade(model);
        if (atividade == null)
          return NoContent();

        return Ok(atividade);
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, ($"Erro ao tentar editar atividade ID: {model.Id}. Erro: {ex.Message}"));
      }

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {
        var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
        if (atividade == null)
          return this.StatusCode(StatusCodes.Status409Conflict, ($"Você está tentando deletar uma atividade que não existe."));

        if (await _atividadeService.DeletarAtividade(id))
        {
          return Ok(new { message = "Deletado" });
        }
        else
        {
          return BadRequest("Ocorreu um problema não específico ao tentar deletar a atividade");
        }

        var resposta = await _atividadeService.DeletarAtividade(atividade.Id);
        if (resposta == false)
          return NoContent();

        return Ok();
      }
      catch (System.Exception ex)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, ($"Erro ao tentar deletar atividade com ID: {id}. Erro: {ex.Message}"));
      }
    }
  }
}