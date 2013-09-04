using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;
using RT.Models;

namespace RT.Controllers
{
    public class OrderController : Controller
    {
        private RestaurantEntities db = new RestaurantEntities();


        public ActionResult Index(long id = 0)
        {
            //Order order = new Order();
            return View();
        }



        private void UpdateOrderedProducts(OrderedProductModel[] newOrderedProducts, Order orderToUpdate)
        {
            
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            foreach (OrderedProductModel newOrderedProduct in newOrderedProducts)
            {
                OrderedProduct matchedOrder = orderToUpdate.OrderedProducts.SingleOrDefault(i => i.ProductId == newOrderedProduct.ProductId && i.Type == newOrderedProduct.Type);
                if (matchedOrder == null)
                {
                    OrderedProduct orderedProduct = new OrderedProduct()
                    {
                        Order = orderToUpdate,
                        Product = db.Products.Find(newOrderedProduct.ProductId),
                        OrderId = orderToUpdate.Id,
                        ProductId = newOrderedProduct.ProductId,
                        Quantity = newOrderedProduct.Quantity,
                        Type = newOrderedProduct.Type,
                        Price = newOrderedProduct.Price,
                        CreatedBy = (Guid)user.ProviderUserKey
                         
                    };
                    orderToUpdate.OrderedProducts.Add(orderedProduct);
                }
                else
                {
                    matchedOrder.Price += newOrderedProduct.Price;
                    matchedOrder.Quantity += newOrderedProduct.Quantity;
                }
            }


        }

        [HttpPost]
        public ActionResult Save(long Id, FormCollection formcollection, OrderedProductModel[] orderedproducts, string Seats, decimal TotalAmount)
        {

            Order orderToUpdate = null;
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            if (Id == 0)
            {
                
                orderToUpdate = new Order() { CreatedBy = (Guid)user.ProviderUserKey,CreatedDate= DateTime.Now};
            }
            else
            {
                orderToUpdate = db.Orders.Where(i => i.Id == Id).Single();
            }


            if (TryUpdateModel(orderToUpdate, "", new string[] { "Status","Seats","TotalAmount" }
               ))
            {
                try
                {
                    UpdateOrderedProducts(orderedproducts, orderToUpdate);
                    orderToUpdate.TotalAmount = TotalAmount;
                    orderToUpdate.Seats = Seats;
                    orderToUpdate.SetStatusType(StatusType.New);
                    if (Id == 0)
                    {

                        db.Entry(orderToUpdate).State = EntityState.Added;
                    }
                    else
                    {
                        db.Entry(orderToUpdate).State = EntityState.Modified;
                    }
                    
                    db.SaveChanges();

                    //Todo: Need to pass userid here
                    if (Id == 0)
                    {
                        long newId = db.Entry(orderToUpdate).Entity.Id;


                        NotificationEngine notificationengine = new NotificationEngine();
                        //notificationengine.PushFromServer(string.Format("{{'Key':'order','Value':'{0}'}}", newId.ToString()));
                        KeyValuePair<string, string> dictOrder = new KeyValuePair<string, string>("order", newId.ToString());
                        notificationengine.PushFromServer(dictOrder);

                        ArrayList SeatArray = orderToUpdate.SeatArray(SeatStatus.Locked);
                        string jsonSeats = JsonConvert.SerializeObject(SeatArray);
                        KeyValuePair<string, string> dictSeats = new KeyValuePair<string, string>("seats", jsonSeats);
                        notificationengine.PushFromServer(dictSeats);
                    }
                    
                }
                catch (DataException dex)
                {
                    //Log the error (uncomment dex variable name after DataException and add a line here to write a log.
                    ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists see your system administrator." + dex.Message);
                }
            }
            PopulateOrderedProduct(orderToUpdate);
            Order order = new Order();
            return View("Details", order);
            //return View("Details", db.Orders.Where(x => x.Id == Id).Single());
        }



        [HttpGet]
        public ActionResult Details(int id)
        {
            Order order = db.Orders.Where(x => x.Id == id).Single();
            return View(order);
        }

        private void PopulateOrderedProduct(Order order)
        {
            var viewModel = new List<OrderedProductModel>();
            foreach (var invoiceProduct in order.OrderedProducts)
            {
                viewModel.Add(new OrderedProductModel
                {
                    ProductId = invoiceProduct.ProductId,
                    Name = invoiceProduct.Product.Name,
                    Quantity = 78
                });
                ViewBag.Products = viewModel;
            }


        }



    }
}
