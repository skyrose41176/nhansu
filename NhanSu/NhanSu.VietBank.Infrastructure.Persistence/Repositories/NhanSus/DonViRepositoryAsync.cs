using Microsoft.EntityFrameworkCore;
using NhanSu.VietBank.Application.Features.NhanSus.Queries.GetAllNhanSus;
using NhanSu.VietBank.Application.Interfaces.Repositories;
using NhanSu.VietBank.Application.Wrappers;
using NhanSu.VietBank.Domain.Entities;
using NhanSu.VietBank.Infrastructure.Persistence.Contexts;
using NhanSu.VietBank.Infrastructure.Persistence.Repository;
using System.Linq;
using System.Threading.Tasks;

namespace NhanSu.Vietbank.Infrastructure.Persistence.Repositories.NhanSus
{
    public class NhanSuRepositoryAsync : GenericRepositoryAsync<ThongTinNhanSu>, INhanSuRepositoryAsync
    {
        private readonly DbSet<ThongTinNhanSu> _NhanSu;
        public NhanSuRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _NhanSu = dbContext.Set<ThongTinNhanSu>();
        }
        public async Task<PagedList<ThongTinNhanSu>> GetPagedSearchAsync(GetPagingNhanSusParameter parameter)
        {
            var NhanSu = _NhanSu.AsQueryable();
            Search(ref NhanSu, parameter.Search);
            return await PagedList<ThongTinNhanSu>.ToPagedList(NhanSu.OrderByDescending(x => x.Id).AsNoTracking(), parameter.PageNumber, parameter.PageSize);
        }
        private void Search(ref IQueryable<ThongTinNhanSu> data, string search)
        {
            if (string.IsNullOrWhiteSpace(search)) return;
            search = $"%{search.Trim()}%";
            data = data.Where(x =>
                EF.Functions.Like(x.Ten, search) ||
                EF.Functions.Like(x.Mail, search)
            );
        }
    }
}
