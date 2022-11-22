using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;

namespace ProAtividade.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AtividadeController : ControllerBase
  {
    private readonly DataContext _context;
    public AtividadeController(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public List<Atividade> GetAll()
    {
      return _context.Atividades.ToList();
    }

    [HttpGet("{id}")]
    public Atividade GetByID(int id)
    {
      return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
    }

    [HttpPost]
    public Atividade Post(Atividade atividade)
    {
      _context.Atividades.Add(atividade);
      if (_context.SaveChanges() > 0)
        return _context.Atividades.FirstOrDefault(ativ => ativ.Id == atividade.Id);
      else
        throw new Exception("Erro ao retornar as atividades...");
    }

    [HttpPut("{id}")]
    public Atividade Put(int id, Atividade atividade)
    {
      var ativ = new Atividade();
      if (atividade.Id != id)
        throw new Exception("Você está tentando atualizar a atividade errada");

      _context.Update(atividade);
      if (_context.SaveChanges() > 0)
      {
        ativ = _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
        Console.WriteLine(ativ);
        return ativ;
      }
      else
      {
        return ativ;
      }

    }

    [HttpDelete("{id}")]
    public bool Delete(int id)
    {
      var atividade = _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
      if (atividade == null)
        throw new Exception("Você está tentando deletar uma atividade que não existe.");

      _context.Remove(atividade);

      return _context.SaveChanges() > 0;
    }
  }
}