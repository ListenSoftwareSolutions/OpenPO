using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OpenPO.Services;
using OpenPO.Models;
using OpenPO.Database;

namespace OpenPO.Controllers
{

    [RoutePrefix("Api/OpenPO")]
    public class OpenPoController : ApiController
    {

        private IPOQuoteRepository _poQuoteRepository;

        public OpenPoController(IPOQuoteRepository poQuoteRepository)
        {
            _poQuoteRepository = poQuoteRepository;

        }
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public PurchaseOrderQuote Get(int id)
        {
            return _poQuoteRepository.GetPOQuote(id);
         
        }

        // POST api/<controller>
        public void Post([FromBody]POQuote poquote)
        {
            _poQuoteRepository.AddPOQuote(poquote);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]POQuote poquote)
        {
            _poQuoteRepository.UpdatePOQuote(poquote);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            _poQuoteRepository.DeletePOQuote(id);
        }
    }
}