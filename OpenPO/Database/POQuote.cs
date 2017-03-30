//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OpenPO.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class POQuote
    {
        public long Id { get; set; }
        public decimal QuoteAmount { get; set; }
        public System.DateTime SubmittedDate { get; set; }
        public long PoId { get; set; }
        public long DocNumber { get; set; }
        public string Remarks { get; set; }
        public long CustomerAddressId { get; set; }
        public long VendorAddressId { get; set; }
        public Nullable<long> ItemId { get; set; }
        public string SKU { get; set; }
        public string Description { get; set; }
    
        public virtual AcctRec AcctRec { get; set; }
        public virtual AddressBook AddressBook { get; set; }
        public virtual AddressBook AddressBook1 { get; set; }
    }
}
