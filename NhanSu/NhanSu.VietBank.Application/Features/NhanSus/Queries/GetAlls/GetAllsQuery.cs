using AutoMapper;
using NhanSu.VietBank.Application.Exceptions;
using NhanSu.VietBank.Application.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using NhanSu.VietBank.Application.Interfaces.Repositories;
using NhanSu.VietBank.Application.Features.NhanSus.Queries.GetAllNhanSus;

namespace NhanSu.VietBank.Application.Features.View.NhanSus.Queries.GetAllNhanSus
{
    public class GetAllNhanSusQuery : IRequest<Response<object>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string Search { get; set; } = "";

    }
    public class GetAllNhanSusQueryHandler : IRequestHandler<GetAllNhanSusQuery, Response<object>>
    {
        private readonly INhanSuRepositoryAsync _NhanSuRepository;
        private readonly IMapper _mapper;
        public GetAllNhanSusQueryHandler(INhanSuRepositoryAsync NhanSuRepository, IMapper mapper)
        {
            _NhanSuRepository = NhanSuRepository;
            _mapper = mapper;
        }

        public async Task<Response<object>> Handle(GetAllNhanSusQuery request, CancellationToken cancellationToken)
        {
            var validFilter = _mapper.Map<GetPagingNhanSusParameter>(request);
            var NhanSus = await _NhanSuRepository.GetPagedSearchAsync(validFilter);
            if (NhanSus is null) throw new ApiException("Không có dữ liệu");
            return new Response<object>(new
            {
                NhanSus.CurrentPage,
                NhanSus.TotalPages,
                NhanSus.PageSize,
                NhanSus.TotalCount,
                NhanSus.HasPrevious,
                NhanSus.HasNext,
                Data = NhanSus
            }, "Thành công");
        }
    }
}
