using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenPO.Database;
using OpenPO.Models;

namespace OpenPO.Services
{
    public interface IUDCRepository
    {
        long GetUdcByKeyCode(string productCode, string keyCode);
        UDC GetUdcById(long? id);
        IEnumerable<ListBoxModels> GetUdcListBox(string product_code);
        string GetUdcById(string product_code, long ? id);
    }
    public class UDCRepository : IUDCRepository
    {
        public string GetUdcById(string product_code, long ? id)
        {
            UDC udc;
            string retVal="";
            try
            {
                using (var db = new Entities())
                {
                    udc = (from p in db.UDCs
                           where p.ProductCode == product_code
                           && p.XRefId==id
                           select p).FirstOrDefault();

                    if (udc != null)
                    {
                        retVal = udc.Value;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return retVal;
        }
        public long GetUdcByKeyCode(string productCode,string keyCode)
        {
            UDC udc;
            long retVal = 0;
            try
            {
                using (var db = new Entities())
                {
                    udc = (from p in db.UDCs
                           where p.KeyCode == keyCode
                           && p.ProductCode==productCode
                           select p).FirstOrDefault();

                    if (udc != null)
                    {
                        retVal = udc.XRefId;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return retVal;
        }
        public UDC GetUdcById(long? id)
        {
            UDC udc = null;
            try
            {
                using (var db = new Entities())
                {
                    udc = (from p in db.UDCs
                           where p.XRefId == id
                           select p).FirstOrDefault();


                }
            }
            catch (Exception ex)
            {

            }
            return udc;
        }
        public IEnumerable<ListBoxModels> GetUdcListBox(string product_code)
        {
            List<ListBoxModels> udc_list = new List<ListBoxModels>();
            try
            {
                using (var db = new Entities())
                {

                    udc_list = (from p in db.UDCs
                                   where p.ProductCode == product_code
                                   orderby p.KeyCode
                                   select new ListBoxModels {
                                    label=p.Value,
                                    id=p.XRefId
                                   }).ToList<ListBoxModels>();
                   
                }
            }
            catch (Exception ex)
            {
            }
            return (udc_list);
        }
    }
}