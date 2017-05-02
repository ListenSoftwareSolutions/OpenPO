using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenPO.Database;
using OpenPO.Models;

namespace OpenPO.Services
{
    public interface IAcctRecRepository
    {
        void DeleteAcctRec(long paramId);
        void AddAcctRec(AcctRec acctrec);
        void UpdateAcctRec(AcctRec acctrec_update);
        AccountReceivable GetAcctRec(long? paramId);
        List<AcctRec> GetAcctRecList();

    }
    public class AccountReceivableRepository : IAcctRecRepository
    {
        public void DeleteAcctRec(long paramId)
        {

            using (var db = new listensoftwareDBEntities())
            {
                var acctRecDelete = db.AcctRecs.Single(e => e.AddressId == paramId);

                db.AcctRecs.Remove(acctRecDelete);
                db.SaveChanges();
            }
        }
        public void AddAcctRec(AcctRec acctrec)
        {
            using (var db = new listensoftwareDBEntities())
            {
                db.AcctRecs.Add(acctrec);
                db.SaveChanges();
            }
        }
        public void UpdateAcctRec(AcctRec acctrecUpdate)
        {
            try
            {
                using (var db = new listensoftwareDBEntities())
                {

                    AcctRec original = new AcctRec { Id = acctrecUpdate.Id };   /// stub model, only has Id

                    var entry = db.Entry(original);
                    entry.State = System.Data.Entity.EntityState.Modified;
                    entry.CurrentValues.SetValues(acctrecUpdate);

                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
            }
        }
        public AccountReceivable GetAcctRec(long? paramId)
        {

            // AcctRec acctrec = new AcctRec();
            // AddressBook ab = new AddressBook()

            AccountReceivable acctrec = new AccountReceivable();


            try
            {
                using (var db = new listensoftwareDBEntities())
                {

                    //acctrec = db.AcctRecs.Single(e => e.Id == paramId);
                    //ab = db.AddressBooks.Single(e => e.AddressId == paramId);


                    var item = (from e in db.AcctRecs
                                join e1 in db.AddressBooks on
                                e.AddressId equals e1.AddressId
                                where e.Id == paramId
                                select new
                                {
                                    e1.Name,
                                    e.SKU,
                                    e.DocNumber,
                                    e.DocType,
                                    e.GLDate,
                                    e.Remarks,
                                    e.CreateDate,
                                    e.NetTerms,
                                    e.Description,
                                    e.AddressId
                                }).SingleOrDefault();
            

                    if (item != null)
                    {
                        acctrec.AddressId = item.AddressId;
                        acctrec.DocNumber = item.DocNumber;
                        acctrec.DocType = item.DocType;
                        acctrec.Name = item.Name;
                        acctrec.GLDate = item.GLDate;
                        acctrec.SKU = item.SKU;
                        acctrec.GLDate = item.GLDate;
                        acctrec.CreateDate = item.CreateDate;
                        acctrec.NetTerms = item.NetTerms;
                        acctrec.Description = item.Description;
                    }


                }
            }
            catch (Exception ex)
            {

            }

            return (acctrec);
        }
        public List<AcctRec> GetAcctRecList()
        {
            List<AcctRec> acctRecList = new List<AcctRec>();


            try
            {
                using (var db = new listensoftwareDBEntities())
                {
                    var query = from b in db.AcctRecs

                                select b;

                    query = query.OrderBy(s => s.DocNumber);



                    foreach (var item in query)
                    {
                        acctRecList.Add(item);
                    }


                }
            }
            catch (Exception ex)
            { }

            return acctRecList;
        }

    }
}