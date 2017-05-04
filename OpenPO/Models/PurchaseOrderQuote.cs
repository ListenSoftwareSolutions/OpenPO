using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpenPO.Models
{
    public class PurchaseOrderQuote
    {
        public long Id { get; set; }
        public Nullable<decimal> QuoteAmount { get; set; }
        public Nullable<System.DateTime> SubmittedDate { get; set; }
        public long PoId { get; set; }
        public long DocNumber { get; set; }
        public string Remarks { get; set; }
        public long CustomerAddressId { get; set; }
        public long VendorAddressId { get; set; }
        public string SKU { get; set; }
        public string Description { get; set; }

        public string CustomerName { get; set; }
        public string VendorName { get; set; }
    }
}