﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenPO.Database;

namespace OpenPO.Services
{
    public class UDCRepository
    {
        public long GetUdcByKeyCode(string keyCode)
        {
            UDC udc;
            long retVal = 0;
            try
            {
                using (var db = new listensoftwareDBEntities())
                {
                    udc = (from p in db.UDCs
                           where p.KeyCode == keyCode
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
                using (var db = new listensoftwareDBEntities())
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
        public IEnumerable<UDC> GetUdcList(string product_code)
        {
            try
            {
                using (var db = new listensoftwareDBEntities())
                {

                    var udc_list = from p in db.UDCs
                                   where p.ProductCode == product_code
                                   orderby p.KeyCode
                                   select p;

                    var x = udc_list.ToList<UDC>();

                    return (x);
                }
            }
            catch (Exception ex)
            {
            }
            return (null);
        }
    }
}