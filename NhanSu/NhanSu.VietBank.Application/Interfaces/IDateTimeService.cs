using System;
using System.Collections.Generic;
using System.Text;

namespace NhanSu.VietBank.Application.Interfaces
{
    public interface IDateTimeService
    {
        DateTime NowUtc { get; }
    }
}
