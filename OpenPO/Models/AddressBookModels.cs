using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpenPO.Models
{
    public class AddressBookModels
    {
        public long AddressId { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public string CellPhone { get; set; }
        public string MailingCity { get; set; }
        public string MailingState { get; set; }
        public string MailingAddress { get; set; }
        public string MailingZipcode { get; set; }
        public string BillingCity { get; set; }
        public string BillingState { get; set; }
        public string BillingZipcode { get; set; }
        public string BillingAddress { get; set; }
        public string Type { get; set; }
        public string KeyCode { get; set; }
        public string Value { get; set; }
        public Nullable<long> PeopleXrefId { get; set; }
        public string ProductKey { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingCity { get; set; }
        public string ShippingZipcode { get; set; }
        public string ShippingState { get; set; }
    }
}