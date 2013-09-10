using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RT.Models;
namespace RT.Controllers
{
    public class ProductController : Controller
    {
        private RestaurantEntities db = new RestaurantEntities();

        public ActionResult ListsByGroup(long id)
        {
            List<Product> products = db.Products.Where(p => p.ProductGroupID == id).ToList();
            return View(products);
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ViewResult Index()
        {
            return View(db.Products.Where(x=>x.Status==true).ToList());
        }

        //
        // GET: /Product/Details/5

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ViewResult Details(int id)
        {
            Product product = db.Products.Single(p => p.Id == id);
            return View(product);
        }

        //
        // GET: /Product/Create

        public ActionResult Create()
        {
            ViewBag.ProductGroup = new SelectList(db.ProductGroups, "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");
            //ViewBag.MasterProduct = new SelectList(db.Products.Where(x => x.MasterProductID != null), "ProductID", "name");
            return View();
        }

        //
        // POST: /product/Create

        [HttpPost]
        public ActionResult Create(Product product)
        {
            ViewBag.ProductGroup = new SelectList(db.ProductGroups, "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");

            if (ModelState.IsValid)
            {
                product.CreatedDate = DateTime.Now;                
                product.CreatedBy = HttpContext.User.Identity.Name;
                product.MasterProductID = null;
                product.Status = true;
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

           return View(product);
        }

        //
        // GET: /product/Edit/5

        public ActionResult Edit(int id)
        {
            ViewBag.ProductGroup = new SelectList(db.ProductGroups, "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");

            Product product = db.Products.Single(p => p.Id == id);
            return View(product);
        }

        //
        // POST: /product/Edit/5

        [HttpPost]
        public ActionResult Edit(Product product)
        {
            ViewBag.ProductGroup = new SelectList(db.ProductGroups, "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");
           
            if (ModelState.IsValid)
            {
                product.ModifiedDate = DateTime.Now;
                product.MasterProductID = null;
                db.Products.Attach(product);
               
               
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        //
        // GET: /product/Delete/5

        public ActionResult Delete(int id)
        {
            Product product = db.Products.Single(p => p.Id == id);
            return View(product);
        }

        //
        // POST: /product/Delete/5

        [HttpPost, ActionName("Delete")]
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
        public ActionResult AutoList() {
            List<Product> products = db.Products.Where(p => p.Status == true).ToList();
            return View(products);
        }
    }
}
