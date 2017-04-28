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
        private IAddressBookRepository _addressBookRepository;

        
        public PeopleController( IAddressBookRepository addressBookRepository)
        {
            //this.addressBookRepository = new AddressBookRepository();
            _addressBookRepository = addressBookRepository;
        }
        // GET: api/People
        [Authorize]
        public List<AddressBook> Get()
        {
            List<AddressBook> listPeople = _addressBookRepository.GetAllAddressBooks("", "customer");

            return listPeople;
    
        }
        [Authorize]
        // GET: api/People/5
        public AddressBook Get(int id)
        {
            AddressBook person = _addressBookRepository.GetAddressBook(id);

            return person;
        }
        [Authorize]
        // POST: api/People
        public void Post([FromBody]AddressBook addressBook)
        {
            _addressBookRepository.AddAddressBook(addressBook);
        }
        [Authorize]
        // PUT: api/People/5
        public void Put(int id, [FromBody]AddressBook addressBook)
        {
            _addressBookRepository.UpdateAddressBook(addressBook);
        }
        [Authorize]
        // DELETE: api/People/5
        public void Delete(int id)
        {
            _addressBookRepository.DeleteAddressBook(id);
        }
    }
}
