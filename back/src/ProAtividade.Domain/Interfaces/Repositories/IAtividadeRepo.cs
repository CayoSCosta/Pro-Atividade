using System.Threading.Tasks;
using ProAtividade.Domain.Entities;

namespace ProAtividade.Domain.Interfaces.Repositories
{
  public interface IAtividadeRepo
  {
    Task<Atividade[]> PegaTodasAsync();
    Task<Atividade> PegaPorIdAsync();
    Task<Atividade> PegarPorTituloAsync();
  }
}