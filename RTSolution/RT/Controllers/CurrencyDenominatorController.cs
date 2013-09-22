using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RT.Models;
namespace CurrencyDenoDomo.Controllers
{
    public class CurrencyDenominatorController : Controller
    {
        private RestaurantEntities db = new RestaurantEntities();

        //
        // GET: /CurrencyDenominator/

        public ActionResult Index()
        {
            return View(db.CurrencyDenominations.ToList());
        }

        //
        // GET: /CurrencyDenominator/

        public ActionResult DenominationCalculation()
        {
            return View(db.CurrencyDenominations.ToList());
        }

        //
        // GET: /CurrencyDenominator/Details/5

        public ActionResult Details(int id = 0)
        {
            CurrencyDenomination currencydenomination = db.CurrencyDenominations.Find(id);
            if (currencydenomination == null)
            {
                return HttpNotFound();
            }
            return View(currencydenomination);
        }

        //
        // GET: /CurrencyDenominator/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /CurrencyDenominator/Create

        [HttpPost]
        public ActionResult Create(CurrencyDenomination currencydenomination)
        {
            if (ModelState.IsValid)
            {
                db.CurrencyDenominations.Add(currencydenomination);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(currencydenomination);
        }

        //
        // GET: /CurrencyDenominator/Edit/5

        public ActionResult Edit(int id = 0)
        {
            CurrencyDenomination currencydenomination = db.CurrencyDenominations.Find(id);
            if (currencydenomination == null)
            {
                return HttpNotFound();
            }
            return View(currencydenomination);
        }

        //
        // POST: /CurrencyDenominator/Edit/5

        [HttpPost]
        public ActionResult Edit(CurrencyDenomination currencydenomination)
        {
            if (ModelState.IsValid)
            {
                db.Entry(currencydenomination).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(currencydenomination);
        }

        //
        // GET: /CurrencyDenominator/Delete/5

        public ActionResult Delete(int id = 0)
        {
            CurrencyDenomination currencydenomination = db.CurrencyDenominations.Find(id);
            if (currencydenomination == null)
            {
                return HttpNotFound();
            }
            return View(currencydenomination);
        }

        //
        // POST: /CurrencyDenominator/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            CurrencyDenomination currencydenomination = db.CurrencyDenominations.Find(id);
            db.CurrencyDenominations.Remove(currencydenomination);
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