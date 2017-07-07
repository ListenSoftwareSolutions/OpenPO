using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpenPO.Models
{
    public class PurchaseOrderModels
    {
        public long Id { get; set; }
        public string POType { get; set; }
        public string PaymentTerms { get; set; }
        public Nullable<decimal> GrossAmount { get; set; }
        public string Remark { get; set; }
        public Nullable<System.DateTime> GLDate { get; set; }
        public string AccountNumber { get; set; }
        public Nullable<long> SupplierAddressId { get; set; }
        public string SupplierName { get; set; }
        public Nullable<long> CustomerAddressId { get; set; }
        public string CustomerName { get; set; }
        public Nullable<long> ContractId { get; set; }
        public Nullable<long> POQuoteId { get; set; }
        public string Description { get; set; }
        public Nullable<long> ItemNumber { get; set; }
        public string PONumber { get; set; }
    }
}