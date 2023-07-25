using AutoMapper;
using MediatR;
using NhanSu.VietBank.Application.Interfaces.Repositories;
using NhanSu.VietBank.Application.Wrappers;
using System.Threading;
using System.Threading.Tasks;

namespace NhanSu.VietBank.Application.Features.NhanSus.Commands.CreateNhanSu
{
    public partial class CreateNhanSuCommand : IRequest<Response<int>>
    {
        public string Ten { get; set; }
        public string Mail { get; set; }
    }
    public class CreateNhanSuCommandHandler : IRequestHandler<CreateNhanSuCommand, Response<int>>
    {
        private readonly INhanSuRepositoryAsync _NhanSuRepository;
        private readonly IMapper _mapper;
        public CreateNhanSuCommandHandler(INhanSuRepositoryAsync NhanSuRepository, IMapper mapper)
        {
            _NhanSuRepository = NhanSuRepository;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateNhanSuCommand request, CancellationToken cancellationToken)
        {
            var NhanSu = new NhanSu.VietBank.Domain.Entities.ThongTinNhanSu
            {
                Ten = request.Ten,
                Mail = request.Mail,
            };
            await _NhanSuRepository.AddAsync(NhanSu);
            return new Response<int>(NhanSu.Id);
        }
    }
}
