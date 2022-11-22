using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Repositories
{
  public interface IGeralRepo
  {
    void Adicionar<T>(T entity) where T : class;
    void Editar<T>(T entity) where T : class;
    void Deletar<T>(T entity) where T : class;
    void DeletarVarias<T>(T[] entity) where T : class;
    Task<bool> SalvarMudancasAsync();
  }
}