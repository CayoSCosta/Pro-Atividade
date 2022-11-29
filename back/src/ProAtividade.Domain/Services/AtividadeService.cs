using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.Domain.Services
{
  public class AtividadeService : IAtividadeService
  {
    private readonly IAtividadeRepo _atividadeRepo;
    private readonly IGeralRepo _geralRepo;

    public AtividadeService(IAtividadeRepo atividadeRepo, IGeralRepo geralRepo)
    {
      _geralRepo = geralRepo;
      _atividadeRepo = atividadeRepo;

    }
    public async Task<Atividade> AdicionarAtividade(Atividade model)
    {
      if (await _atividadeRepo.PegarPorTituloAsync(model.Titulo) != null)
        throw new Exception("Já existe uma atividade com esse título");

      if (await _atividadeRepo.PegarPorIdAsync(model.Id) == null)
      {
        _atividadeRepo.Adicionar(model);
        if (await _atividadeRepo.SalvarMudancasAsync())
          return model;
      }

      return null;
    }

    public async Task<bool> ConcluirAtividade(Atividade model)
    {
      if (model != null)
      {
        model.Concluir();
        _atividadeRepo.Editar<Atividade>(model);
        return await _atividadeRepo.SalvarMudancasAsync();
      }
      return false;
    }

    public async Task<bool> DeletarAtividade(int atividadeId)
    {
      var atividade = await _atividadeRepo.PegarPorIdAsync(atividadeId);
      if (atividade == null)
        throw new Exception("A atividade que tentou deletar não existe");

      _atividadeRepo.Deletar(atividade);
      return await _atividadeRepo.SalvarMudancasAsync();
    }

    public async Task<Atividade> EditarAtividade(Atividade model)
    {
      if (model.DataConclusao != null)
        throw new Exception("Não se pode alterar atividade ja concluída.");

      if (await _atividadeRepo.PegarPorIdAsync(model.Id) != null)
      {
        _atividadeRepo.Editar(model);
        if (await _atividadeRepo.SalvarMudancasAsync())
          return model;
      }

      return null;
    }

    public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
    {
      try
      {
        var atividade = await _atividadeRepo.PegarPorIdAsync(atividadeId);
        if (atividade == null)
          return null;

        return atividade;
      }
      catch (System.Exception)
      {
        throw;
      }
    }

    public async Task<Atividade[]> PegarTodasAtividadesAsync()
    {
      try
      {
        var atividades = await _atividadeRepo.PegarTodasAsync();
        if (atividades == null) return null;

        return atividades;
      }
      catch (System.Exception ex)
      {

        throw new Exception(ex.Message);
      }
    }
  }
}