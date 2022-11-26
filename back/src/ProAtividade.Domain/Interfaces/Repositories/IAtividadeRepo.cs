using System.Threading.Tasks;
using ProAtividade.Domain.Entities;

namespace ProAtividade.Domain.Interfaces.Repositories
{
  public interface IAtividadeRepo : IGeralRepo
  {
    Task<Atividade[]> PegarTodasAsync();
    Task<Atividade> PegarPorIdAsync(int id);
    Task<Atividade> PegarPorTituloAsync(string titulo);
  }
}