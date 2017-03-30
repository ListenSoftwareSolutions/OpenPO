using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OpenPO.Services;
using OpenPO.Database;
using System.Data.Entity;

namespace OpenPO.Controllers
{
    [RoutePrefix("Api/People")]
    public class PeopleController : ApiController
    {
        private AddressBookRepository addressBookRepository;

        public PeopleController()
        {
            this.addressBookRepository = new AddressBookRepository();
        }
        // GET: api/People
        public List<AddressBook> Get()
        {
            List<AddressBook> listPeople = addressBookRepository.GetAllAddressBooks("", "customer");

            return listPeople;
    
        }

        // GET: api/People/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/People
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/People/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/People/5
        public void Delete(int id)
        {
        }
    }
}
