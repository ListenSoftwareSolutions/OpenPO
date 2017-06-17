using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenPO.Database;
using OpenPO.Models;

namespace OpenPO.Services
{
    public interface IAddressBookRepository
    {
        void DeleteAddressBook(long paramAddressId);
        void AddAddressBook(AddressBook addressBook);
        void UpdateAddressBook(AddressBook addressBookUpdate);
        AddressBook GetAddressBook(long? paramAddressId);
        AddressBook GetByUserName(string userName);
        List<AddressBookModels> GetPersonList(string keyCode);
        List<AddressBookModels> GetAllAddressBooks(string searchString, string keyCode);
    }
    public class AddressBookRepository : IAddressBookRepository
    {
        public void AddAddressBook(AddressBook addressBook)
        {
            using (var db = new Entities())
            {
                db.AddressBooks.Add(addressBook);
                db.SaveChanges();
            }
        }

        public void DeleteAddressBook(long paramAddressId)
        {
            using (var db = new Entities())
            {
                var addressBookDelete = db.AddressBooks.Single(e => e.AddressId == paramAddressId);

                db.AddressBooks.Remove(addressBookDelete);
                db.SaveChanges();
            }
        }

        public void UpdateAddressBook(AddressBook addressBookUpdate)
        {
            try
            {
                using (var db = new Entities())
                {

                    AddressBook original = new AddressBook { AddressId = addressBookUpdate.AddressId };   /// stub model, only has Id
                    UDCRepository udcRepository = new UDCRepository();
                    string type = udcRepository.GetUdcById("AB_Type",addressBookUpdate.PeopleXrefId);
                    addressBookUpdate.Type = type;
                    var entry = db.Entry(original);
                    entry.State = System.Data.Entity.EntityState.Modified;
                    entry.CurrentValues.SetValues(addressBookUpdate);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
            }
        }
        public AddressBook GetAddressBook(long? paramAddressId)
        {
            // List<AddressBook> resultList = null;
            AddressBook item = null;
            try
            {
                //resultList = new List<AddressBook>();
                using (var db = new Entities())
                {
                
                    item = db.AddressBooks.Single(e => e.AddressId == paramAddressId);
                    var item2 = db.UDCs.Single(e => e.XRefId == item.PeopleXrefId);
                    item.Type = item2.KeyCode;

                 }
            }
            catch (Exception ex)
            {

            }
            return (item);
        }
        public AddressBook GetByUserName(string userName)
        {
           
            AddressBook item = null;
            try
            {
           
                using (var db = new Entities())
                {

                    item = db.AddressBooks.Single(e => e.Email == userName);
                    var item2 = db.UDCs.Single(e => e.XRefId == item.PeopleXrefId);
                    item.Type = item2.KeyCode;

                }
            }
            catch (Exception ex)
            {

            }
            return (item);
        }
        public List<AddressBookModels> GetPersonList(string keyCode)
        {
            List<AddressBookModels> resultList = new List<AddressBookModels>();
            UDCRepository udcRepository = new UDCRepository();
            long xRefId = udcRepository.GetUdcByKeyCode("AB_Type", keyCode);
            try
            {
                using (var db = new Entities())
                {
                    var query = (from b in db.AddressBooks
                                 join c in db.UDCs
                                on b.PeopleXrefId equals c.XRefId
                                 where (b.PeopleXrefId == c.XRefId && c.XRefId == xRefId)
                           
                                 select new AddressBookModels
                                 {
                                     AddressId = b.AddressId,
                                     Name = b.Name,
                                     FirstName = b.FirstName,
                                     LastName = b.LastName,
                                     Company = b.Company,
                                     CellPhone = b.CellPhone,
                                     MailingCity = b.MailingCity,
                                     MailingState = b.MailingState,
                                     MailingAddress = b.MailingAddress,
                                     MailingZipcode = b.MailingZipcode,
                                     BillingCity = b.BillingCity,
                                     BillingState = b.BillingState,
                                     BillingZipcode = b.BillingZipcode,
                                     BillingAddress = b.BillingAddress,
                                     Type = c.KeyCode,
                                     KeyCode = c.KeyCode,
                                     Value = c.Value,
                                     PeopleXrefId = b.PeopleXrefId,
                                     ProductKey = b.ProductKey,
                                     Email = b.Email,
                                     Fax = b.Fax,
                                     ShippingAddress = b.ShippingAddress,
                                     ShippingCity = b.ShippingCity,
                                     ShippingZipcode = b.ShippingZipcode,
                                     ShippingState = b.ShippingState

                                 }

                                  );

                    query = query.OrderBy(s=>s.Name);
                    resultList = query.ToList<AddressBookModels>();
            

                    /*
                    var query = from b in db.AddressBooks
                                .Where(b => b.PeopleXrefId == xRefId)
                                select b;

                    query = query.OrderBy(s => s.Name);


                    foreach (var item in query)
                    {
                        resultList.Add(item);
                    }
                    */

                }
            }
            catch (Exception ex)
            { }
            return (resultList);
        }
        public List<AddressBookModels> GetAllAddressBooks(string searchString, string keyCode)
        {

            List<AddressBookModels> resultList = new List<AddressBookModels>();
            UDCRepository udcRepository = new UDCRepository();
            long xRefId = udcRepository.GetUdcByKeyCode("AB_Type", keyCode);
            try
            {
                using (var db = new Entities())
                {
                    var query = (from b in db.AddressBooks
                                 join c in db.UDCs
                                 on b.PeopleXrefId equals c.XRefId
                                 where (b.PeopleXrefId == c.XRefId && c.XRefId == xRefId)
                                 select new AddressBookModels
                                 {
                                     AddressId = b.AddressId,
                                     Name = b.Name,
                                     FirstName = b.FirstName,
                                     LastName = b.LastName,
                                     Company = b.Company,
                                     CellPhone = b.CellPhone,
                                     MailingCity = b.MailingCity,
                                     MailingState = b.MailingState,
                                     MailingAddress = b.MailingAddress,
                                     MailingZipcode = b.MailingZipcode,
                                     BillingCity = b.BillingCity,
                                     BillingState = b.BillingState,
                                     BillingZipcode = b.BillingZipcode,
                                     BillingAddress = b.BillingAddress,
                                     Type = c.KeyCode,
                                     KeyCode=c.KeyCode,
                                     Value=c.Value,
                                     PeopleXrefId = b.PeopleXrefId,
                                     ProductKey = b.ProductKey,
                                     Email = b.Email,
                                     Fax = b.Fax,
                                     ShippingAddress = b.ShippingAddress,
                                     ShippingCity = b.ShippingCity,
                                     ShippingZipcode = b.ShippingZipcode,
                                     ShippingState = b.ShippingState

    });

                    if (!String.IsNullOrEmpty(searchString))
                    {
                        query = query.Where(s => s.Name.Contains(searchString) || s.FirstName.Contains(searchString) || s.LastName.Contains(searchString));

                    }

                    query = query.OrderBy(s => s.Name);

                    resultList = query.ToList<AddressBookModels>();

                    //foreach (var item in query)
                    //{
                    //    resultList.Add(item);
                    //}
                }
            }
            catch (Exception ex)
            {

            }             
            return (resultList);
        }
           
} //end class
   
}