using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RT.Models;

namespace RT.Controllers
{
    public class PrinterController : Controller
    {
        private RestaurantEntities db = new RestaurantEntities();

        //
        // GET: /Printer/

        public ActionResult Index()
        {
            ViewBag.Printers = new SelectList(db.Printers, "FullName", "Name");
            return View(db.Printers.ToList());
        }

        //
        // GET: /Printer/Details/5

        public ActionResult Details(int id = 0)
        {
            Printer printer = db.Printers.Find(id);
            if (printer == null)
            {
                return HttpNotFound();
            }
            return View(printer);
        }

        //
        // GET: /Printer/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Printer/Create

        [HttpPost]
        public ActionResult Create(Printer printer)
        {
            if (ModelState.IsValid)
            {
                db.Printers.Add(printer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(printer);
        }

        //
        // GET: /Printer/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Printer printer = db.Printers.Find(id);
            if (printer == null)
            {
                return HttpNotFound();
            }
            return View(printer);
        }

        //
        // POST: /Printer/Edit/5

        [HttpPost]
        public ActionResult Edit(Printer printer)
        {
            if (ModelState.IsValid)
            {
                db.Entry(printer).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(printer);
        }

        //
        // GET: /Printer/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Printer printer = db.Printers.Find(id);
            if (printer == null)
            {
                return HttpNotFound();
            }
            return View(printer);
        }

        //
        // POST: /Printer/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Printer printer = db.Printers.Find(id);
            db.Printers.Remove(printer);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}