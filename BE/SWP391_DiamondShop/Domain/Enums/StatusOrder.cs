using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public static class StatusOrder
    {
        public const string WaitToApprove = "Wait To Approve";
        public const string Approved = "Approved";
        public const string Paid = "Paid";
        public const string InTransit = "In Transit";
        public const string Finished = "Finished";
        public const string Cancelled = "Cancelled";

        public static readonly string[] AllStatuses = { WaitToApprove, Approved, Paid, InTransit, Finished, Cancelled };
    }

}
