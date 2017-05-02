using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpenPO.Models
{
    public class AccountReceivable
    {
            public long AddressId { get; set; }
            public string Name { get; set; }

            public string DocType { get; set; }
            public Nullable<decimal> OpenAmount { get; set; }
            public Nullable<System.DateTime> DiscountDueDate { get; set; }
            public Nullable<System.DateTime> GLDate { get; set; }
            public Nullable<System.DateTime> InvoiceDate { get; set; }
            public Nullable<System.DateTime> CreateDate { get; set; }
            public Nullable<long> DocNumber { get; set; }
            public string Remarks { get; set; }
            public string NetTerms { get; set; }
             public Nullable<long> ItemId { get; set; }
            public string SKU { get; set; }
            public string Description { get; set; }
            public string PONumber { get; set; }
 
  
}
}