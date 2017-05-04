using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenPO.Database;
using OpenPO.Models;

namespace OpenPO.Services
{
    public interface IPOQuoteRepository
    {
        void DeletePOQuote(long paramId);
        void AddPOQuote(POQuote poquote);
        void UpdatePOQuote(POQuote poquote_update);
        PurchaseOrderQuote GetPOQuote(long? paramId);
        List<PurchaseOrderQuote> GetPOQuoteList();

    }
    public class POQuoteRepository : IPOQuoteRepository
    {
        public void DeletePOQuote(long paramId) {
            using (var db = new listensoftwareDBEntities())
            {
                var poquoteDelete = db.POQuotes.Single(e => e.Id == paramId);

                db.POQuotes.Remove(poquoteDelete);
                db.SaveChanges();
            }
        }
        public void AddPOQuote(POQuote poquote) {
            using (var db = new listensoftwareDBEntities())
            {
                db.POQuotes.Add(poquote);
                db.SaveChanges();
            }
        }
        public void UpdatePOQuote(POQuote poquote_update) {
            try
            {
                using (var db = new listensoftwareDBEntities())
                {

                    POQuote original = new POQuote { Id = poquote_update.Id };   /// stub model, only has Id

                    var entry = db.Entry(original);
                    entry.State = System.Data.Entity.EntityState.Modified;
                    entry.CurrentValues.SetValues(poquote_update);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
            }
        }
        public PurchaseOrderQuote GetPOQuote(long? paramId) {

            PurchaseOrderQuote poquote = new PurchaseOrderQuote();


            try
            {
                using (var db = new listensoftwareDBEntities())
                {

                    //acctrec = db.AcctRecs.Single(e => e.Id == paramId);
                    //ab = db.AddressBooks.Single(e => e.AddressId == paramId);


                    var item = (from e in db.POQuotes
                                join e1 in db.AddressBooks on
                                e.CustomerAddressId equals e1.AddressId
                                join e2 in db.AddressBooks on
                                e.VendorAddressId equals e2.AddressId
                                where e.Id == paramId
                                select new
                                {
                                    CustomerName=e1.Name ,
                                    e.SKU,
                                    e.DocNumber,
                                    e.Remarks,
                                    e.SubmittedDate,
                                    e.Description,
                                    e.Id,
                                    e.QuoteAmount,
                                    VendorName=e2.Name
                                  
                                }).SingleOrDefault();


                    if (item != null)
                    {
                        poquote.Id = item.Id;
                        poquote.DocNumber = item.DocNumber;
                        poquote.CustomerName = item.CustomerName;
                        poquote.VendorName = item.VendorName;
                        poquote.SKU = item.SKU;
                        poquote.SubmittedDate = item.SubmittedDate;
                        poquote.Description = item.Description;
                        poquote.QuoteAmount = item.QuoteAmount;
                        poquote.Remarks = item.Remarks;
                    }


                }
            }
            catch (Exception ex)
            {

            }

            return (poquote);
        }
        public List<PurchaseOrderQuote> GetPOQuoteList() {

            List<PurchaseOrderQuote> poquoteList = new List<PurchaseOrderQuote>();


            try
            {
                using (var db = new listensoftwareDBEntities())
                {

                    poquoteList = (from e in db.POQuotes
                                 join e1 in db.AddressBooks on
                                 e.CustomerAddressId equals e1.AddressId
                                 join e2 in db.AddressBooks on
                                 e.VendorAddressId equals e2.AddressId

                                 select new PurchaseOrderQuote
                                 {
                                     CustomerName = e1.Name,
                                     SKU=e.SKU,
                                     DocNumber=e.DocNumber,
                                     Remarks=e.Remarks,
                                     SubmittedDate=e.SubmittedDate,
                                     Description=e.Description,
                                     Id=e.Id,
                                     QuoteAmount=e.QuoteAmount,
                                     VendorName = e2.Name

                                 }
                            ).ToList<PurchaseOrderQuote>();


                    

                }
            }
            catch (Exception ex)
            {

            }

            return (poquoteList);
        }
    }
}