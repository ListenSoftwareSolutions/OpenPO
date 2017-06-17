using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OpenPO.Controllers
{
    public class PurchaseOrderController : ApiController
    {
        // GET: api/PurchaseOrder
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/PurchaseOrder/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/PurchaseOrder
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/PurchaseOrder/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PurchaseOrder/5
        public void Delete(int id)
        {
        }
    }
}
