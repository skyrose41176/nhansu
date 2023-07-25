using Microsoft.AspNetCore.Http;
using NhanSu.VietBank.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NhanSu.VietBank.WebApp.Services
{
    public class AuthenticatedUserService : IAuthenticatedUserService
    {
        public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
        {
            UserId = httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
            Email = httpContextAccessor.HttpContext?.User?.FindFirstValue("email");
            MaNhanVien = httpContextAccessor.HttpContext?.User?.FindFirstValue("manhanvien");
        }

        public string UserId { get; }
        public string Email { get; }
        public string MaNhanVien { get; }
    }
}
