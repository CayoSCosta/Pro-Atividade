using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AtividadeController : ControllerBase
  {
    public IEnumerable<Atividade> Atividades = new List<Atividade>(){
        new Atividade(1),
        new Atividade(2),
        new Atividade(3)
    };
    public AtividadeController()
    {

    }

    [HttpGet]
    public Atividade GetAll()
    {
      return new Atividade();
    }

    [HttpGet("{id}")]
    public Atividade GetByID(int id)
    {
      return Atividades.FirstOrDefault(ativ => ativ.Id == id);
    }

    [HttpPost]
    public IEnumerable<Atividade> Post(Atividade atividade)
    {
      return Atividades.Append<Atividade>(atividade);
    }

    [HttpPut("{id}")]
    public string Put(int id)
    {
      return "Esse é o método Edit";
    }

    [HttpDelete("{id}")]
    public string Delete(int id)
    {
      return "Esse é o método Delete";
    }
  }
}