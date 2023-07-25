using Microsoft.AspNetCore.Identity;
using NhanSu.VietBank.Application.DTOs.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace NhanSu.VietBank.Infrastructure.Identity.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; }
        public bool OwnsToken(string token)
        {
            return this.RefreshTokens?.Find(x => x.Token == token) != null;
        }
    }
}
