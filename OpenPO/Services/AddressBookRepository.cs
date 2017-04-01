using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenPO.Database;

namespace OpenPO.Services
{
    public interface IAddressBookRepository
    {
        void DeleteAddressBook(long paramAddressId);
        void AddAddressBook(AddressBook addressBook);
        void UpdateAddressBook(AddressBook addressBookUpdate);
        AddressBook GetAddressBook(long? paramAddressId);
        List<AddressBook> GetPersonList(string keyCode);
        List<AddressBook> GetAllAddressBooks(string searchString, string keyCode);
    }
    public class AddressBookRepository:IAddressBookRepository
    {
        public void AddAddressBook(AddressBook addressBook)
        {
            using (var db = new listensoftwareDBEntities())
            {
                db.AddressBooks.Add(addressBook);
                db.SaveChanges();
            }
        }
       
        public void DeleteAddressBook(long paramAddressId)
        {
            using (var db = new listensoftwareDBEntities())
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
                using (var db = new listensoftwareDBEntities())
                {

                    AddressBook original = new AddressBook { AddressId = addressBookUpdate.AddressId };   /// stub model, only has Id

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
                using (var db = new listensoftwareDBEntities())
                {
                    //var query = from b in db.AddressBooks
                    //            orderby b.Name
                    //            select b;

                    item = db.AddressBooks.Single(e => e.AddressId == paramAddressId);

                    //resultList.Add(item);

                }
            }
            catch (Exception ex)
            {

            }
            return (item);
        }
        public List<AddressBook> GetPersonList(string keyCode)
        {
            List<AddressBook> resultList = new List<AddressBook>();
            UDCRepository udcRepository = new UDCRepository();
            long xRefId = udcRepository.GetUdcByKeyCode(keyCode);
            using (var db = new listensoftwareDBEntities())
            {
                var query = from b in db.AddressBooks
                            .Where(b => b.PeopleXrefId == xRefId)
                            select b;

                query = query.OrderBy(s => s.Name);


                foreach (var item in query)
                {
                    resultList.Add(item);
                }


            }
            return (resultList);
        }
        public List<AddressBook> GetAllAddressBooks(string searchString, string keyCode)
        {
            List<AddressBook> resultList = new List<AddressBook>();
            UDCRepository udcRepository = new UDCRepository();
            long xRefId = udcRepository.GetUdcByKeyCode(keyCode);

            using (var db = new listensoftwareDBEntities())
            {
                var query = from b in db.AddressBooks
                            .Where(b => b.PeopleXrefId == xRefId)
                            select b;

                if (!String.IsNullOrEmpty(searchString))
                {
                    query = query.Where(s => s.Name.Contains(searchString) || s.FirstName.Contains(searchString) || s.LastName.Contains(searchString));

                }

                query = query.OrderBy(s => s.Name);


                foreach (var item in query)
                {
                    resultList.Add(item);
                }


            }
            return (resultList);
        }
    } //end class
   
}