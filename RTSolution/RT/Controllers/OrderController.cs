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
                        CreatedBy = (Guid)user.ProviderUserKey,
                        Amount = newOrderedProduct.Amount,
                        ProductName = newOrderedProduct.ProductName
                         
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
        private long Save(long Id, Order orderToUpdate, StatusType statustype, FormCollection formcollection, OrderedProductModel[] orderedproducts, string Seats, decimal TotalAmount, int Status = 0)
        {
            long newId = 0;
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            if (Id == 0)
            {
                orderToUpdate = new Order() { CreatedBy = (Guid)user.ProviderUserKey, CreatedDate = DateTime.Now };
            }
            else
            {
                orderToUpdate = db.Orders.Where(i => i.Id == Id).Single();
            }


            if (TryUpdateModel(orderToUpdate, "", new string[] { "Status", "Seats", "TotalAmount" }
               ))
            {
                if (orderedproducts != null)
                {
                    UpdateOrderedProducts(orderedproducts, orderToUpdate);
                }
                orderToUpdate.TotalAmount = TotalAmount;
                orderToUpdate.Seats = Seats;
                orderToUpdate.SetStatusType(statustype);
                if (Id == 0)
                {

                    db.Entry(orderToUpdate).State = EntityState.Added;
                }
                else
                {
                    db.Entry(orderToUpdate).State = EntityState.Modified;
                }

                db.SaveChanges();
                newId = db.Entry(orderToUpdate).Entity.Id;

            }


            return newId;
        }
        private void PushToClient(long Id)
        {
            if (Id != 0)
            {
                Order orderToUpdate = db.Orders.Where(i => i.Id == Id).Single();

                NotificationEngine notificationengine = new NotificationEngine();
                //notificationengine.PushFromServer(string.Format("{{'Key':'order','Value':'{0}'}}", newId.ToString()));
                KeyValuePair<string, string> dictOrder = new KeyValuePair<string, string>("order", Id.ToString());
                notificationengine.PushFromServer(dictOrder);

                ArrayList SeatArray = orderToUpdate.SeatArray(SeatType.Locked);
                string jsonSeats = JsonConvert.SerializeObject(SeatArray);
                KeyValuePair<string, string> dictSeats = new KeyValuePair<string, string>("seats", jsonSeats);
                notificationengine.PushFromServer(dictSeats);
            }
        }
        private void PrintBill(long Id) {
            Order order = db.Orders.Find(Id);
            string createdBy = Membership.GetUser(order.OrderedProducts.First().CreatedBy).UserName;
            PrintingSystem.ReceiptPrint rcpt = new PrintingSystem.ReceiptPrint();

            rcpt.TotalAmount = order.TotalAmount;
            rcpt.OrderNo = Id;
            rcpt.CreatedBy = createdBy;
            rcpt.CreateDate = order.CreatedDate.Value.ToString("dd-MM-yyyy HH:mm");
            rcpt.OrderedProducts = order.OrderedProducts;

            //System.Threading.Tasks.Task.Run(() => rcpt.print());
            //rcpt.print();

            //WebPrinting wp = new WebPrinting();
            //wp.PageCreate("EPSON TM-T81 Receipt", "TEST FORM");

        }
        [HttpPost]
        public ActionResult SaveBill(long Id, FormCollection formcollection, OrderedProductModel[] orderedproducts, string Seats, decimal TotalAmount, int Status = 0)
        {
            Order orderToUpdate = null;
            long newId = Save(Id, orderToUpdate, StatusType.Bill, formcollection, orderedproducts, Seats, TotalAmount, Status);
            //Todo: Need to pass userid here


            PrintBill(newId);

            PushToClient(newId);
            ModelState.Clear();
            return View("OrderedProducts", new Order());
        }

        [HttpPost]
        public ActionResult SaveOrder(long Id, FormCollection formcollection, OrderedProductModel[] orderedproducts, string Seats, decimal TotalAmount, int Status = 0)
        {
            Order orderToUpdate = null;
            long newId = Save(Id, orderToUpdate, StatusType.New, formcollection, orderedproducts, Seats, TotalAmount, Status);
            //Todo: Need to pass userid here
            if (Id == 0)
            {
                PushToClient(newId);
            }
            ModelState.Clear();
            return View("OrderedProducts", new Order());
            
        }



        //[HttpGet]
        //public ActionResult Details(int id)
        //{
        //    Order order = db.Orders.Where(x => x.Id == id).Single();
        //    return View("OrderedProducts",order);
        //}

        [HttpGet]
        public ActionResult OrderedProducts(int id)
        {
            Order order = null;
            if(id == 0)
                order = new Order();
            else
                order = db.Orders.Where(x => x.Id == id).Single();
            ModelState.Clear();
            return View("OrderedProducts", order);
        }


    }
}
