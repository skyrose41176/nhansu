using System.Collections.Generic;
using System.Threading.Tasks;
using NhanSu.VietBank.Application.Features.NhanSus.Queries.GetAllNhanSus;
using NhanSu.VietBank.Application.Wrappers;
using NhanSu.VietBank.Domain.Entities;

namespace NhanSu.VietBank.Application.Interfaces.Repositories
{
    public interface INhanSuRepositoryAsync : IGenericRepositoryAsync<ThongTinNhanSu>
    {
        Task<PagedList<ThongTinNhanSu>> GetPagedSearchAsync(GetPagingNhanSusParameter parameter);
    }
}
