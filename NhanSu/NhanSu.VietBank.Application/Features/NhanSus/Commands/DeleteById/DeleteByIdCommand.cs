using MediatR;
using NhanSu.VietBank.Application.Exceptions;
using NhanSu.VietBank.Application.Interfaces.Repositories;
using NhanSu.VietBank.Application.Wrappers;
using System.Threading;
using System.Threading.Tasks;

namespace NhanSu.VietBank.Application.Features.NhanSus.Commands.DeleteNhanSuById
{
    public class DeleteNhanSuByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public class DeleteNhanSuByIdCommandHandler : IRequestHandler<DeleteNhanSuByIdCommand, Response<int>>
        {
            private readonly INhanSuRepositoryAsync _NhanSuRepository;
            public DeleteNhanSuByIdCommandHandler(INhanSuRepositoryAsync NhanSuRepository)
            {
                _NhanSuRepository = NhanSuRepository;
            }
            public async Task<Response<int>> Handle(DeleteNhanSuByIdCommand command, CancellationToken cancellationToken)
            {
                var NhanSu = await _NhanSuRepository.GetByIdAsync(command.Id);
                if (NhanSu == null) throw new ApiException($"Không tìm thấy");
                await _NhanSuRepository.DeleteAsync(NhanSu);
                return new Response<int>(NhanSu.Id);
            }
        }
    }
}
