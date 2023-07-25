using NhanSu.VietBank.Domain.Common;

namespace NhanSu.VietBank.Domain.Entities
{
    public class ThongTinNhanSu : AuditableBaseEntity
    {
        public string Ten { get; set; }
        public string Mail { get; set; }
    }

}
