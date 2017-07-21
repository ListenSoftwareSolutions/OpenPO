using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OpenPO.Models;
using OpenPO.Services;
using OpenPO.Database;

namespace OpenPO.Controllers
{

    [RoutePrefix("Api/PurchaseOrder")]
    public class PurchaseOrderController : ApiController
    {
        private IPurchaseOrderRepository _PurchaseOrderRepository;


        public PurchaseOrderController(IPurchaseOrderRepository PurchaseOrderRepository)
        {
            //this.PurchaseOrderRepository = new PurchaseOrderRepository();
            _PurchaseOrderRepository = PurchaseOrderRepository;
        }
        // GET: api/PurchaseOrder
        //[Authorize]
        public List<PurchaseOrderModels> GetList(string search)
        {
            List<PurchaseOrderModels> listPurchaseOrders = _PurchaseOrderRepository.GetPurchaseOrders(search);

            return listPurchaseOrders;

        }
        public List<PurchaseOrderModels> GetAllList()
        {
            List<PurchaseOrderModels> listPurchaseOrders = _PurchaseOrderRepository.GetPurchaseOrders("");

            return listPurchaseOrders;

        }
        //[Authorize]
        // GET: api/PurchaseOrder/5
        public PurchaseOrderModels Get(int id)
        {
            PurchaseOrderModels purchaseOrder = _PurchaseOrderRepository.GetPurchaseOrder(id);

            return purchaseOrder;
        }

        //[Authorize]
        // POST: api/PurchaseOrder
        public void Post([FromBody]PurchaseOrder purchaseOrder)
        {
            _PurchaseOrderRepository.AddPurchaseOrder(purchaseOrder);
        }
        //[Authorize]
        // PUT: api/PurchaseOrder/5
        public void Put(int id, [FromBody]PurchaseOrder purchaseOrder)
        {
            _PurchaseOrderRepository.UpdatePurchaseOrder(purchaseOrder);
        }
        //[Authorize]
        // DELETE: api/PurchaseOrder/5
        public void Delete(int id)
        {
            _PurchaseOrderRepository.DeletePurchaseOrder(id);
        }
}
}
