using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using RT.Models;
namespace RT.Controllers
{
    [AjaxAuthorizationFilter]
    public class ProductController : Controller
    {
        private RestaurantEntities db = new RestaurantEntities();
        [Authorize]
        public ActionResult ListsByGroup(long ProductGoupId)
        {
            List<Product> products = db.Products.Where(p => p.ProductGroupID == ProductGoupId).ToList();
            return View(products);
        }
        [Authorize]
        public ActionResult AutoList()
        {
            List<Product> products = db.Products.Where(p => p.Status == true).ToList();
            return View(products);
        }
        
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        [Authorize(Roles = "Admin,Cashier")]
        public ViewResult Index()
        {
            return View(db.Products.Where(x=>x.Status==true).ToList());
        }

        //
        // GET: /Product/Details/5

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        [Authorize(Roles = "Admin,Cashier")]
        public ViewResult Details(int id)
        {
            Product product = db.Products.Single(p => p.Id == id);
            return View(product);
        }

        //
        // GET: /Product/Create
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Create()
        {
            ViewBag.ProductGroup = new SelectList(db.ProductGroups, "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");
            ViewBag.MasterProduct = new SelectList(db.Products.Where(x => x.MasterProductID == null && x.Status==true), "id", "Name");
            return View();
        }

        //
        // POST: /product/Create

        [HttpPost]
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Create(Product product)
        {
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            ViewBag.ProductGroup = new SelectList(db.ProductGroups, "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");
            ViewBag.MasterProduct = new SelectList(db.Products.Where(x => x.MasterProductID == null && x.Status==true), "id", "Name");
            if (ModelState.IsValid)
            {
                product.CreatedDate = DateTime.Now;
                product.CreatedBy = (Guid)user.ProviderUserKey;     
                product.Status = true;
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

           return View(product);
        }

        //
        // GET: /product/Edit/5
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Edit(int id)
        {
            ViewBag.ProductGroup = new SelectList(db.ProductGroups, "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");
            ViewBag.MasterProduct = new SelectList(db.Products.Where(x => x.MasterProductID == null && x.Status == true), "id", "Name");
            Product product = db.Products.Single(p => p.Id == id);
            return View(product);
        }

        //
        // POST: /product/Edit/5

        [HttpPost]
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Edit(Product product)
        {
            ViewBag.ProductGroup = new SelectList(db.ProductGroups, "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");
            ViewBag.MasterProduct = new SelectList(db.Products.Where(x => x.MasterProductID == null && x.Status == true), "id", "Name");          
            if (ModelState.IsValid)
            {
                product.ModifiedDate = DateTime.Now;
                
                db.Products.Attach(product);
               
               
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        //
        // GET: /product/Delete/5
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Delete(int id)
        {
            Product product = db.Products.Single(p => p.Id == id);
            return View(product);
        }

        //
        // POST: /product/Delete/5

        [HttpPost, ActionName("Delete")]
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult DeleteConfirmed(int id)
        {
            Product product = db.Products.Single(p => p.Id == id);          
            product.ModifiedDate = DateTime.Now;
            product.Status = false;
            //db.products.Attach(product);
            db.Entry(product).State = EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}
