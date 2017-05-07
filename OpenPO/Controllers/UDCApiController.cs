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

    [RoutePrefix("Api/UDC")]
    public class UDCController : ApiController
    {
        private IUDCRepository _udcRepository;

        public UDCController(IUDCRepository udcRepository)
        {
            _udcRepository = udcRepository;
        }
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet]
        //[ActionName("GetList")]
        //[Route("GetList")]
        public IEnumerable<ListBoxModels> GetListBox(string product_code)
        {
            return _udcRepository.GetUdcListBox(product_code);
         
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}