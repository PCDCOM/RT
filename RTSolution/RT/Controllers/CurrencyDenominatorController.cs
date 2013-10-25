using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RT.Models;
using System.Data.SqlClient;
using RT;
using System.Configuration;
using System.Threading.Tasks;
namespace Controllers
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
            //IEnumerable<Order> newOrders = db.Orders.Where(i => (i.Status == (byte)StatusType.New) || (i.Status == (byte)StatusType.Bill));
            //if (newOrders.Count() > 0)
            //{
            //    throw new Exception("Still there are some un Paid Orders");
            //}
            return View(db.CurrencyDenominations.ToList());
        }

        //[HttpPost]
        //public ActionResult StoreDenominations(CurrencyDenominationTran[] currencydenominationtrans)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        foreach (CurrencyDenominationTran ct in currencydenominationtrans)
        //        {
        //            db.CurrencyDenominationTrans.Add(ct);
        //            db.SaveChanges();
        //        }
        //        return RedirectToAction("Index");
        //    }

        //    return View("index");
        //}


        [HttpPost]
        public ActionResult StoreDenominations(CurrencyDenominationTran[] currencydenominationtrans)
        {


            foreach (CurrencyDenominationTran newcurrencydenomination in currencydenominationtrans)
            {
                db.CurrencyDenominationTrans.Add(newcurrencydenomination);
                db.SaveChanges();
            }

            SqlParameter sqlparameter = null;
            //var ietsParameterEmpName = new SqlParameter("@EmpName", txtEmployeeName.Text);
            DateTime dt = DateTime.Parse(DateTime.Now.ToShortDateString());
            ViewData["OrderTotal"] = db.Orders.Where(y => y.Status == 2).AsEnumerable().Sum(x => x.OrderedProducts.Where(op => op.Status == 1).Sum(op => (op.Quantity * op.Price)));
            ViewData["DenominatorTotal"] = db.CurrencyDenominationTrans.Where(y => y.date == dt).AsEnumerable().Sum(x => x.denomitotal);
            db.Database.ExecuteSqlCommand("[usp_MoveToOld]", sqlparameter);
            return View("TodaysCashSummary");
        }

        public void TotalSummaryPrint(decimal ordertotal, decimal denominatortotal)
        {
            PrintingSystem.TotalSummaryPrint tspt = new PrintingSystem.TotalSummaryPrint();

            tspt.PrinterName = ConfigurationManager.AppSettings["CommonPrinter"].ToString();

            tspt.OrderTotal = ordertotal;
            tspt.DenominatorTotl = denominatortotal;
            tspt.TodaysDate = DateTime.Now;
            tspt.Difference = ordertotal - denominatortotal;
            LogAdapter.Info("Before Print", "CurrencyDenominator", "TotalSummaryPrint");
            Task.Run(() => tspt.print());
            LogAdapter.Info("After print", "CurrencyDenominator", "TotalSummaryPrint");
         
        }

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

        // GET: /CurrencyDenominator/TodaysCashSummary

        public ActionResult TodaysCashSummary()
        {
            DateTime dt = DateTime.Parse(DateTime.Now.ToShortDateString());
            //ViewData["DenominatorTotal"] = db.CurrencyDenominationTrans.Where(y => DateTime.Compare(y.date.Value.Date, DateTime.Now.Date) == 0).AsEnumerable().Sum(x => x.denomitotal);

            // ViewData["DenominatorTotal"] = db.CurrencyDenominationTrans.Where(y => y.date == dt).AsEnumerable().Sum(x => x.denomitotal);
            // DateTime todaysdate = Convert.ToDateTime(DateTime.Now.ToShortDateString());

            // ViewData["DenominatorTotal"] = db.CurrencyDenominationTrans.Where(y => DateTime.Compare(Convert.ToDateTime(y.date.Value.Date.ToShortDateString()), todaysdate) == 0).Count();
            // ViewData["FristDate"] = db.CurrencyDenominationTrans.First().date.Value.Date.ToShortDateString();

            //ViewData["OrderTotal"] = db.

            return View();
        }
        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}