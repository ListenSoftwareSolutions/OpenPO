using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenPO.Database;
using OpenPO.Models;

namespace OpenPO.Services
{
    public interface IPurchaseOrderRepository
    {
        void DeletePurchaseOrder(long paramId);
        void AddPurchaseOrder(PurchaseOrder po);
        void UpdatePurchaseOrder(PurchaseOrder po_update);
        PurchaseOrderModels GetPurchaseOrder(long? paramId);
        List<PurchaseOrderModels> GetPurchaseOrders(string search);

    }
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        public void DeletePurchaseOrder(long paramId)
        {

            using (var db = new Entities())
            {
                var purchaseOrderDelete = db.PurchaseOrders.Single(e => e.Id == paramId);

                db.PurchaseOrders.Remove(purchaseOrderDelete);
                db.SaveChanges();
            }
        }
        public void AddPurchaseOrder(PurchaseOrder po)
        {
            using (var db = new Entities())
            {
                db.PurchaseOrders.Add(po);
                db.SaveChanges();
            }

        }
        public void UpdatePurchaseOrder(PurchaseOrder po_update)
        {
            try
            {
                using (var db = new Entities())
                {

                    PurchaseOrder original = new PurchaseOrder { Id = po_update.Id };   /// stub model, only has Id

                    var entry = db.Entry(original);
                    entry.State = System.Data.Entity.EntityState.Modified;
                    entry.CurrentValues.SetValues(po_update);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {

            }

        }
        public PurchaseOrderModels GetPurchaseOrder(long? paramId)
        {
            PurchaseOrderModels po = new PurchaseOrderModels();
            try
            {
                using (var db = new Entities())
                {
                    po = (from b in db.PurchaseOrders
                          join c in db.AddressBooks
                          on b.SupplierAddressId equals c.AddressId
                          join d in db.AddressBooks
                          on b.CustomerAddressId equals d.AddressId
                          where b.Id == paramId
                          select new PurchaseOrderModels
                          {
                              Id = b.Id,
                              POType = b.POType,
                              PaymentTerms = b.PaymentTerms,
                              GrossAmount = b.GrossAmount,
                              Remark = b.Remark,
                              GLDate = b.GLDate,
                              AccountNumber = b.AccountNumber,
                              SupplierAddressId = b.SupplierAddressId,
                              SupplierName = c.Name,
                              CustomerAddressId = b.CustomerAddressId,
                              CustomerName = d.Name,
                              ContractId = b.ContractId,
                              POQuoteId = b.POQuoteId,
                              Description = b.Description,
                              ItemNumber = b.ItemNumber,
                              PONumber = b.PONumber,
                              Unit = b.Unit,
                              Quantity = b.Quantity
                          }).Single<PurchaseOrderModels>();



                }
            }
            catch (Exception ex)
            {

            }

            return (po);
        }
        public List<PurchaseOrderModels> GetPurchaseOrders(string search)
        {
            List<PurchaseOrderModels> poList = new List<PurchaseOrderModels>();

            try
            {
                using (var db = new Entities())
                {
                    var query = (from b in db.PurchaseOrders
                                 join c in db.AddressBooks
                                 on b.SupplierAddressId equals c.AddressId
                                 into cs
                                 from c in cs.DefaultIfEmpty()

                                 join d in db.AddressBooks
                                 on b.CustomerAddressId equals d.AddressId

                                 where 
                            
                                 b.Description.Contains(search)
                                
                  
                    select new PurchaseOrderModels
                                 {
                                     Id = b.Id,
                                     POType = b.POType,
                                     PaymentTerms = b.PaymentTerms,
                                     GrossAmount = b.GrossAmount,
                                     Remark = b.Remark,
                                     GLDate = b.GLDate,
                                     AccountNumber = b.AccountNumber,
                                     SupplierAddressId = b.SupplierAddressId,
                                     SupplierName = c.Name,
                                     CustomerAddressId = b.CustomerAddressId,
                                     ContractId = b.ContractId,
                                     POQuoteId = b.POQuoteId,
                                     Description = b.Description,
                                     ItemNumber = b.ItemNumber,
                                     PONumber = b.PONumber,
                                     Unit = b.Unit,
                                     Quantity=b.Quantity
                                 });

                    poList = query.ToList<PurchaseOrderModels>();


                }
            }
            catch (Exception ex)
            {

            }


            return poList;
        }
    }
}