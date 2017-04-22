using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OpenPO.Controllers
{
    public class AddressBookController : Controller
    {
        // GET: AddressBook
        public ActionResult Profile()
        {
            return View();
        }

        // GET: AddressBook/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: AddressBook/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AddressBook/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: AddressBook/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: AddressBook/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: AddressBook/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: AddressBook/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
