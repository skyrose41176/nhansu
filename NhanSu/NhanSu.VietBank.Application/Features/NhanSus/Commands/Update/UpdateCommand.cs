using AutoMapper;
using MediatR;
using NhanSu.VietBank.Application.Exceptions;
using NhanSu.VietBank.Application.Interfaces.Repositories;
using NhanSu.VietBank.Application.Wrappers;
using System.Threading;
using System.Threading.Tasks;

namespace Avm.Vietbank.Application.Features.NhanSus.Commands.UpdateNhanSu
{
    public class UpdateNhanSuCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string Ten { get; set; }
        public string Mail { get; set; }
        public class UpdateNhanSuCommandHandler : IRequestHandler<UpdateNhanSuCommand, Response<int>>
        {
            private readonly INhanSuRepositoryAsync _NhanSuRepository;
            private readonly IMapper _mapper;

            public UpdateNhanSuCommandHandler(INhanSuRepositoryAsync NhanSuRepository, IMapper mapper)
            {
                _NhanSuRepository = NhanSuRepository;
                _mapper = mapper;

            }
            public async Task<Response<int>> Handle(UpdateNhanSuCommand command, CancellationToken cancellationToken)
            {
                var NhanSu = await _NhanSuRepository.GetByIdAsync(command.Id);

                if (NhanSu == null)
                {
                    throw new ApiException($"Không tìm thấy");
                }
                else
                {
                    NhanSu.Ten = command.Ten;
                    NhanSu.Mail = command.Mail;
                    await _NhanSuRepository.UpdateAsync(NhanSu);
                    return new Response<int>(NhanSu.Id);
                }
            }
        }
    }
}
