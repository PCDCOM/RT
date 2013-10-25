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
            List<Product> products = db.Products.Where(p => p.ProductGroupID == ProductGoupId && p.Status == true).OrderBy(p => p.Sno).ToList();
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
        public ViewResult Index(int? SearchProductGroup)
        {
            ViewBag.ProductGroup = new SelectList(db.ProductGroups.Where(pg => pg.Status == true), "id", "Name");
            if (SearchProductGroup.HasValue)
            {

                return View(db.Products.Where(x => x.Status == true && x.ProductGroupID == SearchProductGroup).ToList());
            }
            else
            {
                return View(db.Products.Where(x => x.Status == true));
            }

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
            ViewBag.ProductGroup = new SelectList(db.ProductGroups.Where(pg => pg.Status == true), "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");
            ViewBag.MasterProduct = new SelectList(db.Products.Where(x => x.MasterProductID == null && x.Status == true), "id", "Name");
            return View();
        }

        //
        // POST: /product/Create

        [HttpPost]
        [Authorize(Roles = "Admin,Cashier")]
        public ActionResult Create(Product product)
        {
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            ViewBag.ProductGroup = new SelectList(db.ProductGroups.Where(pg => pg.Status == true), "id", "Name");
            ViewBag.Kitchen = new SelectList(db.Kitchens, "KitchenID", "KitchenName");
            ViewBag.MasterProduct = new SelectList(db.Products.Where(x => x.MasterProductID == null && x.Status == true), "id", "Name");
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
            ViewBag.ProductGroup = new SelectList(db.ProductGroups.Where(pg => pg.Status == true), "id", "Name");
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
            ViewBag.ProductGroup = new SelectList(db.ProductGroups.Where(pg => pg.Status == true), "id", "Name");
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
        [Authorize(Roles = "Admin,Cashier")]
        public JsonResult GetMasterProductsForProductGroup(int? pgid)
        {
            var masterproducts = db.Products.Where(x => x.MasterProductID == null && x.Status == true && (x.ProductGroupID == pgid || !pgid.HasValue));


            return Json(
                 masterproducts.Select(x => new
                 {
                     id = x.Id,
                     name = x.Name
                 }), JsonRequestBehavior.AllowGet
                );
        }
        
        public ActionResult ArrangeProducts()
        {
            return View();
        }
        public ActionResult GetCategoriesMaster()
        {
            dynamic masterProds;
            

            masterProds = (from a in db.ProductGroups where a.Status == true
                           select new { Id = a.Id, Name = a.Name }
                           ).ToList();

            //ViewBag.prodList = masterProd;
            // ViewBag.jsonString = Json(masterProd, JsonRequestBehavior.AllowGet);
            return Json(masterProds, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetMasterDishDetails(string categoryId)
        {
            dynamic masterProds;
            
            Int32 intCategoryId = Convert.ToInt32(categoryId);
            masterProds = (from a in db.Products
                           where a.ProductGroupID == intCategoryId && a.Status == true
                           orderby a.Sno ascending
                           select new { Id = a.Id, MasterId = a.MasterProductID, Name = a.Name, ProductGroupId = a.ProductGroupID, SNo = a.Sno }
                           ).ToList();

            //ViewBag.prodList = masterProd;
            // ViewBag.jsonString = Json(masterProd, JsonRequestBehavior.AllowGet);
            return Json(masterProds, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]

        public ActionResult SaveMAsterDishes(string data)
        {
            // string j = @"{""data"":[{""masterProdId"":""14"",""sNo"":""1"",""childProdIds"":[""15"",""16""]},{""masterProdId"":""17"",""sNo"":""2"",""childProdIds"":[""18"",""19""]},{""masterProdId"":""14"",""sNo"":""1"",""childProdIds"":[""15"",""16""]}]}";
            ProductContainer pro = new ProductContainer(data);


            foreach (var iter in pro.lstProdMapRow)
            {
                int tempID = Convert.ToInt32(iter.masterProdId);
                var prod = db.Products.First(i => i.Id == tempID);
                prod.Sno = Convert.ToInt32(iter.sNo);
                prod.MasterProductID = null;
                for (int incre = 0; incre < iter.childProdIds.Length; incre++)
                {
                    int childId = Convert.ToInt32(iter.childProdIds.GetValue(incre).ToString());
                    var childProd = db.Products.First(j => j.Id == childId);
                    childProd.Sno = Convert.ToInt32(incre + 1);
                    childProd.MasterProductID = Convert.ToInt32(iter.masterProdId);
                    db.Entry(childProd).State = EntityState.Modified;
                }
                db.Entry(prod).State = EntityState.Modified;
                try
                {
                    db.SaveChanges();
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException ex) {
                    System.Text.StringBuilder sb = new System.Text.StringBuilder();

                    foreach (var failure in ex.EntityValidationErrors)
                    {
                        sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                        foreach (var error in failure.ValidationErrors)
                        {
                            sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                            sb.AppendLine();
                        }
                    }

                    //throw new System.Data.Entity.Validation.DbEntityValidationException(
                    //    "Entity Validation Failed - errors follow:\n" +
                    //    sb.ToString(), ex
                    //); // Add the original exception as the innerException
                    LogAdapter.Info(sb.ToString(), "aa", "bb");
                }
            }
            
        return Json(new { message = "Successfully Saved the Dishes Order" }, JsonRequestBehavior.AllowGet); ;
        }
    }
}
