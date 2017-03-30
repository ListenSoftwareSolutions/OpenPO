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
    
    public partial class AcctRec
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AcctRec()
        {
            this.POQuotes = new HashSet<POQuote>();
        }
    
        public long Id { get; set; }
        public string DocType { get; set; }
        public decimal OpenAmount { get; set; }
        public System.DateTime DiscountDueDate { get; set; }
        public System.DateTime GLDate { get; set; }
        public System.DateTime InvoiceDate { get; set; }
        public System.DateTime CreateDate { get; set; }
        public long DocNumber { get; set; }
        public string Remarks { get; set; }
        public string NetTerms { get; set; }
        public long AddressId { get; set; }
        public Nullable<long> ItemId { get; set; }
        public string SKU { get; set; }
        public string Description { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<POQuote> POQuotes { get; set; }
    }
}