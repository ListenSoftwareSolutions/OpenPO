using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OpenPO.Controllers
{
    public class OpenPOController : Controller
    {
        // GET: OpenPO
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AccRec()
        {
            return View("AccRec");
        }
        // GET: OpenPO/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: OpenPO/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: OpenPO/Create
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

        // GET: OpenPO/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: OpenPO/Edit/5
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

        // GET: OpenPO/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: OpenPO/Delete/5
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
