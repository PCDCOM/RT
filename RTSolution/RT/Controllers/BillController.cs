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
    public class BillController : Controller
    {
        private RestaurantEntities db = new RestaurantEntities();
        //
        // GET: /Bill/

        public ActionResult Index()
        {
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
                        CreatedBy = (Guid)user.ProviderUserKey,
                        
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
        private void UpdateBillForOrder(OrderedProductModel[] orderedproducts,decimal TotalAmount, decimal PaidAmount, decimal BalanceAmount,Order orderToUpdate)
        {
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            Bill bill = new Bill() { 
                TotalAmount = TotalAmount ,
                PaidAmount = PaidAmount, 
                BalanceAmount = BalanceAmount,
                CreatedBy = (Guid)user.ProviderUserKey,
                OrderId = orderToUpdate.Id,
                CreatedDate= DateTime.Now
            };
            orderToUpdate.Bills.Add(bill);
        }
        [HttpPost]
        public ActionResult Pay(long Id, OrderedProductModel[] orderedproducts, decimal TotalAmount, decimal PaidAmount, decimal BalanceAmount)
        {
            Order orderToUpdate = null;
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            orderToUpdate = db.Orders.Where(i => i.Id == Id).Single();
            if (TryUpdateModel(orderToUpdate, "", new string[] { "Status", "TotalAmount" }
               ))
            {
                if (orderedproducts != null)
                {
                    UpdateOrderedProducts(orderedproducts, orderToUpdate);
                }
                UpdateBillForOrder(orderedproducts, TotalAmount, PaidAmount, BalanceAmount, orderToUpdate);
                orderToUpdate.TotalAmount = TotalAmount;
                orderToUpdate.SetStatusType(StatusType.Paid);
            }
            db.Entry(orderToUpdate).State = EntityState.Modified;
            db.SaveChanges();
            long newId = db.Entry(orderToUpdate).Entity.Id;
            NotificationEngine notificationengine = new NotificationEngine();
            KeyValuePair<string, string> dictOrder = new KeyValuePair<string, string>("order", newId.ToString());
            notificationengine.PushFromServer(dictOrder);


            ArrayList SeatArray = orderToUpdate.SeatArray(SeatType.Vacant);
            string jsonSeats = JsonConvert.SerializeObject(SeatArray);
            KeyValuePair<string, string> dictSeats = new KeyValuePair<string, string>("seats", jsonSeats);
            notificationengine.PushFromServer(dictSeats);

            ModelState.Clear();
            return View("OrderedProducts",new Order());
        }
        [HttpGet]
        public ActionResult OrderedProducts(int id)
        {
            Order order = null;
            if (id == 0)
                order = new Order();
            else
                order = db.Orders.Where(x => x.Id == id).Single();
            ModelState.Clear();
            return View("OrderedProducts", order);
        }
    }
}
