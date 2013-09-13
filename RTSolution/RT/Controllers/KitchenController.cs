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
    public class KitchenController : Controller
    {
        private RestaurantEntities db = new RestaurantEntities();

        //
        // GET: /Kitchen/

        public ActionResult Index()
        {
            return View(db.Kitchens.ToList());
        }

        //
        // GET: /Kitchen/Details/5

        public ActionResult Details(int id = 0)
        {
            Kitchen kitchen = db.Kitchens.Find(id);
            if (kitchen == null)
            {
                return HttpNotFound();
            }
            return View(kitchen);
        }

        //
        // GET: /Kitchen/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Kitchen/Create

        [HttpPost]
        public ActionResult Create(Kitchen kitchen)
        {
            if (ModelState.IsValid)
            {
                db.Kitchens.Add(kitchen);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(kitchen);
        }

        //
        // GET: /Kitchen/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Kitchen kitchen = db.Kitchens.Find(id);
            if (kitchen == null)
            {
                return HttpNotFound();
            }
            return View(kitchen);
        }

        //
        // POST: /Kitchen/Edit/5

        [HttpPost]
        public ActionResult Edit(Kitchen kitchen)
        {
            if (ModelState.IsValid)
            {
                db.Entry(kitchen).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(kitchen);
        }

        //
        // GET: /Kitchen/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Kitchen kitchen = db.Kitchens.Find(id);
            if (kitchen == null)
            {
                return HttpNotFound();
            }
            return View(kitchen);
        }

        //
        // POST: /Kitchen/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Kitchen kitchen = db.Kitchens.Find(id);
            db.Kitchens.Remove(kitchen);
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