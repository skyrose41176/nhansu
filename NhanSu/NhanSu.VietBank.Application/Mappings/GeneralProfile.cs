using AutoMapper;
using NhanSu.VietBank.Application.Features.NhanSus.Queries.GetAllNhanSus;
using NhanSu.VietBank.Application.Features.View.NhanSus.Queries.GetAllNhanSus;

namespace NhanSu.VietBank.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<GetAllNhanSusQuery, GetPagingNhanSusParameter>();
        }
    }
}
