using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NhanSu.Vietbank.Infrastructure.Persistence.Repositories.NhanSus;
using NhanSu.VietBank.Application.Interfaces;
using NhanSu.VietBank.Application.Interfaces.Repositories;
using NhanSu.VietBank.Infrastructure.Persistence.Contexts;
using NhanSu.VietBank.Infrastructure.Persistence.Repository;
using System;

namespace NhanSu.VietBank.Infrastructure.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration, bool isProduction)
        {
            string appConStr = configuration.GetConnectionString("DefaultConnection");
            if (isProduction)
            {
                appConStr = Environment.GetEnvironmentVariable("DB_URI_APPLICATION");
            }
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 27));
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseMySql(
                appConStr, serverVersion,
                b => b.MigrationsAssembly(isProduction ? typeof(ApplicationDbContext).Assembly.FullName : "NhanSu.VietBank.WebApp"));
            });


            #region Repositories
            services.AddTransient(typeof(IGenericRepositoryAsync<>), typeof(GenericRepositoryAsync<>));
            services.AddTransient<INhanSuRepositoryAsync, NhanSuRepositoryAsync>();
            #endregion
        }
    }
}
