using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenPO.Database;

namespace OpenPO.Services
{
    public interface IPurchaseOrderRepository
    {
        void DeletePurchaseOrder(long paramId);
        void AddPurchaseOrder(PurchaseOrder po);
        void UpdatePurchaseOrder(PurchaseOrder po_update);
        PurchaseOrder GetPO(long? paramId);
        List<PurchaseOrder> GetPOList();

    }
    public class PurchaseOrderRepository
    {
        public void DeletePurchaseOrder(long paramId) {

            using (var db = new Entities())
            {
                var purchaseOrderDelete = db.PurchaseOrders.Single(e => e.Id == paramId);

                db.PurchaseOrders.Remove(purchaseOrderDelete);
                db.SaveChanges();
            }
        }
        public void AddPurchaseOrder(PurchaseOrder po) {
            using (var db = new Entities())
            {
                db.PurchaseOrders.Add(po);
                db.SaveChanges();
            }

        }
        public void UpdatePurchaseOrder(PurchaseOrder po_update) {
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
        public PurchaseOrder GetPO(long? paramId) {
            PurchaseOrder po=new PurchaseOrder();
            return (po);
        }
        public List<PurchaseOrder> GetPOList() {
            List<PurchaseOrder> poList = new List<PurchaseOrder>();
            return poList;
        }
    }
}