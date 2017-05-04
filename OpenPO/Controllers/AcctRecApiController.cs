using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OpenPO.Services;
using OpenPO.Database;
using OpenPO.Models;

namespace OpenPO.Controllers
{
    [RoutePrefix("Api/AcctRec")]
    public class AcctRecController : ApiController
    {
        private IAcctRecRepository _acctRecRepository;

        public AcctRecController(IAcctRecRepository acctRecRepository)
        {
            _acctRecRepository = acctRecRepository;

        }
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public AccountReceivable Get(int id)
        {
            return _acctRecRepository.GetAcctRec(id);
        }

        // POST api/<controller>
        public void Post([FromBody]AcctRec acctrec)
        {
            _acctRecRepository.AddAcctRec(acctrec);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]AcctRec acctrec)
        {
            _acctRecRepository.UpdateAcctRec(acctrec);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            _acctRecRepository.DeleteAcctRec(id);
        }
    }
}