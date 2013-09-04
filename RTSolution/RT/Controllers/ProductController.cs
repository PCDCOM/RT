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

    }
}
