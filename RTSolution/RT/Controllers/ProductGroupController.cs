using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RT.Models;
using System.Web.Security;
namespace RT.Controllers
{
    [AjaxAuthorizationFilter]
    public class ProductGroupController : Controller
    {
        //
        // GET: /ProductGroup/
        private RestaurantEntities db = new RestaurantEntities();



        //
        // GET: /ProductGroup/
        [Authorize(Roles = "Admin,Cashier")]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ViewResult Index()
        {
            return View(db.ProductGroups.Where(p => p.Status == true).ToList());
        }



        //
        // GET: /ProductGroup/Details/5
        [Authorize(Roles = "Admin,Cashier")]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ViewResult Details(int id)
        {
            ProductGroup productgroup = db.ProductGroups.Single(p => p.Id == id && p.Status == true);
            return View(productgroup);
        }

        //
        // GET: /ProductGroup/Create
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /ProductGroup/Create
        [Authorize(Roles = "Admin,Cashier")]
        [HttpPost]
        public ActionResult Create(ProductGroup productgroup)
        {
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            if (ModelState.IsValid)
            {
                productgroup.CreatedDate = DateTime.Now;
                productgroup.ModifiedDate = DateTime.Now;
                productgroup.CreatedBy = (Guid)user.ProviderUserKey;
                productgroup.Status = true;
                db.ProductGroups.Add(productgroup);
                db.SaveChanges();
                return RedirectToAction("Index");
            }


            return View(productgroup);
        }

        //
        // GET: /ProductGroup/Edit/5
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Edit(int id)
        {
            ProductGroup productgroup = db.ProductGroups.Single(p => p.Id == id);
            return View(productgroup);
        }

        //
        // POST: /ProductGroup/Edit/5

        [HttpPost]
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Edit(ProductGroup productgroup)
        {
            if (ModelState.IsValid)
            {
                productgroup.ModifiedDate = DateTime.Now;
                db.ProductGroups.Attach(productgroup);
                //db.ObjectStateManager.ChangeObjectState(productgroup, EntityState.Modified);
                db.Entry(productgroup).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(productgroup);
        }

        //
        // GET: /ProductGroup/Delete/5
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Delete(int id)
        {
            ProductGroup productgroup = db.ProductGroups.Single(p => p.Id == id);
            return View(productgroup);
        }

        //
        // POST: /ProductGroup/Delete/5

        [HttpPost, ActionName("Delete")]
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult DeleteConfirmed(int id)
        {
            ProductGroup productgroup = db.ProductGroups.Single(p => p.Id == id);
            productgroup.Status = false;
            productgroup.ModifiedDate = DateTime.Now;
            //db.ProductGroups.Attach(productgroup);
            db.Entry(productgroup).State = EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        [ChildActionOnly]
        [Authorize]
        public ActionResult ButtonMenu()
        {
            List<ProductGroup> productGroups = db.ProductGroups.Where(p => p.Status == true).ToList();
            return PartialView(productGroups);
        }
    }
}
