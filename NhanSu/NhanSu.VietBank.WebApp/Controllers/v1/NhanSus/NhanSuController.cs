using Avm.Vietbank.Application.Features.NhanSus.Commands.UpdateNhanSu;
using Microsoft.AspNetCore.Mvc;
using NhanSu.VietBank.Application.Features.NhanSus.Commands.CreateNhanSu;
using NhanSu.VietBank.Application.Features.NhanSus.Commands.DeleteNhanSuById;
using NhanSu.VietBank.Application.Features.View.NhanSus.Queries.GetAllNhanSus;
using NhanSu.VietBank.WebApp.Controllers;
using System.Threading.Tasks;



namespace NhanSu.Vietbank.VenusApi.Controllers.v1.TaiSans.NhanSus
{
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/NhanSu")]


    public class NhanSuController : BaseApiController
    {

        [HttpGet("du-lieu")]

        public async Task<IActionResult> Get([FromQuery] GetAllNhanSusParameter filter)
        {

            return Ok(await Mediator.Send(new GetAllNhanSusQuery()
            {
                PageSize = filter.PageSize,
                PageNumber = filter.PageNumber,
                Search = filter.Search,
            }));
        }

        [HttpPut("cap-nhat/{id}")]

        public async Task<IActionResult> Put(int id, UpdateNhanSuCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        [HttpPost("tao")]

        public async Task<IActionResult> Post(CreateNhanSuCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("xoa")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteNhanSuByIdCommand { Id = id }));
        }

    }
}
