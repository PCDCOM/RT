using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;

using RT.Models;

namespace RT.Controllers
{
    
    [Authorize]  
    [AjaxAuthorizationFilter]
    public class OrderController : Controller
    {
        private RestaurantEntities db = new RestaurantEntities();

        
        public ActionResult Index(long id = 0)
        {
            //Order order = new Order();
            return View();
        }



        private void UpdateOrderedProducts(OrderedProduct[] newOrderedProducts, Order orderToUpdate)
        {
            
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            foreach (OrderedProduct newOrderedProduct in newOrderedProducts)
            {
                OrderedProduct matchedOrder = orderToUpdate.OrderedProducts.SingleOrDefault(i => i.ProductId == newOrderedProduct.ProductId && i.Status == newOrderedProduct.Status && i.Type == newOrderedProduct.Type);
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
                        Status = newOrderedProduct.Status,
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
        private void UpdateDeletedItem(OrderedProduct[] oldItems, Order orderToUpdate) {
            foreach (OrderedProduct oldItem in oldItems)
            {
                OrderedProduct matchedOrder = orderToUpdate.OrderedProducts.Where(i => i.Id == oldItem.Id).Single();
                if (matchedOrder != null && matchedOrder.Status != oldItem.Status)
                {
                    matchedOrder.Status = oldItem.Status;
                    matchedOrder.Reason = oldItem.Reason;
                }
                
            }
 
        }
        private void UpdateBillForOrder(OrderedProduct[] orderedproducts, decimal TotalAmount, decimal PaidAmount, decimal BalanceAmount, Order orderToUpdate)
        {
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            Bill bill = new Bill()
            {
                TotalAmount = TotalAmount,
                PaidAmount = PaidAmount,
                BalanceAmount = BalanceAmount,
                CreatedBy = (Guid)user.ProviderUserKey,
                OrderId = orderToUpdate.Id,
                CreatedDate = DateTime.Now
            };
            orderToUpdate.Bills.Add(bill);
        }
        private long Save(long Id, ref Order orderToUpdate, StatusType statustype, FormCollection formcollection, OrderedProduct[] newItems, string Seats, decimal TotalAmount,OrderedProduct[] oldItems, int Status = 0)
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
                if(oldItems != null){
                    UpdateDeletedItem(oldItems, orderToUpdate);
                }
                if (newItems != null)
                {
                    UpdateOrderedProducts(newItems, orderToUpdate);
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
        private void PushToClient(long Id,SeatType seattype )
        {
            if (Id != 0)
            {
                Order orderToUpdate = db.Orders.Where(i => i.Id == Id).Single();

                NotificationEngine notificationengine = new NotificationEngine();
                //notificationengine.PushFromServer(string.Format("{{'Key':'order','Value':'{0}'}}", newId.ToString()));
                KeyValuePair<string, string> dictOrder = new KeyValuePair<string, string>("order", Id.ToString());
                notificationengine.PushFromServer(dictOrder);

                ArrayList SeatArray = orderToUpdate.SeatArray(seattype);
                string jsonSeats = JsonConvert.SerializeObject(SeatArray);
                KeyValuePair<string, string> dictSeats = new KeyValuePair<string, string>("seats", jsonSeats);
                notificationengine.PushFromServer(dictSeats);
            }
        }
        private void PrintBill(long Id) {

                Order order = db.Orders.Find(Id);
                string createdBy = Membership.GetUser(order.OrderedProducts.First().CreatedBy).UserName;
                PrintingSystem.ReceiptPrint rcpt = new PrintingSystem.ReceiptPrint();
                char firstSeatNo = order.Seats.FirstOrDefault();
                //TOD: Need to change this hardcode to dynamic
                if ("ABCDEFGHI".Contains(firstSeatNo))
                    rcpt.PrinterName = ConfigurationManager.AppSettings["DiamondFloorPrinter"].ToString();
                else if ("JKLMNOPQ".Contains(firstSeatNo))
                    rcpt.PrinterName = ConfigurationManager.AppSettings["GoldFloorPrinter"].ToString();
                else if ("RSTUVWXYZ".Contains(firstSeatNo))
                    rcpt.PrinterName = ConfigurationManager.AppSettings["SilverFloorPrinter"].ToString();
                else
                    rcpt.PrinterName = ConfigurationManager.AppSettings["CommonPrinter"].ToString();
                rcpt.TotalAmount = order.TotalAmount;
                rcpt.OrderNo = Id;
                rcpt.CreatedBy = createdBy;
                rcpt.CreateDate = order.CreatedDate.Value.ToString("dd-MM-yyyy HH:mm");
                rcpt.OrderedProducts =  order.OrderedProducts.Where(i => i.Status == 1).ToList();
                
                if (rcpt.OrderedProducts != null && rcpt.OrderedProducts.Count > 0)
                {
                    LogAdapter.Info("Before Prinint", "OrderController", "Bill");
                    System.Threading.Tasks.Task.Run(() => rcpt.print());
                    LogAdapter.Info("After Prinint", "OrderController", "Bill");
                }
            
        }
        [HttpPost]
        public ActionResult SaveBill(long Id, FormCollection formcollection, OrderedProduct[] newItems, string Seats, decimal TotalAmount,OrderedProduct[] oldItems, int Status = 0)
        {

            Order orderToUpdate = null;
            long newId = Save(Id, ref orderToUpdate, StatusType.Bill, formcollection, newItems, Seats, TotalAmount,oldItems, Status);
            //Todo: Need to pass userid here


            PrintBill(newId);

            PushToClient(newId, SeatType.Vacant);
            ModelState.Clear();
            return View("OrderedProducts", new Order());
        }

        [HttpPost]
        [AjaxAuthorizationFilter]
        public ActionResult SaveOrder(long Id, FormCollection formcollection, OrderedProduct[] newItems, string Seats, decimal TotalAmount,  OrderedProduct[] oldItems, int Status = 0)
        {
    

            Order orderToUpdate = null;
            long newId = Save(Id, ref orderToUpdate, StatusType.New, formcollection, newItems, Seats, TotalAmount,oldItems, Status);
            //Todo: Need to pass userid here
            if (Id == 0)
            {
                PushToClient(newId, SeatType.Locked);
            }
            ModelState.Clear();
            return View("OrderedProducts", new Order());
            
        }



        [HttpGet]
        public ActionResult OrderedProducts(int id)
        {
            Order order = null;
            if (id == 0)
                order = new Order();
            else
            {
                order = db.Orders.Where(x => x.Id == id && x.Status == (byte)StatusType.New).SingleOrDefault<Order>();
                if (order == null)
                {
                    order = new Order();
                    throw new Exception("Could not load order");
                }
            }
            ModelState.Clear();
            return View("OrderedProducts", order);
        }
        public ViewResult ListOrdersForReprint(string FromDate = null)
        {


            // var orders = db.Orders.Where(x => x.Status == 2 && (DateTime.Compare(Convert.ToDateTime(FromDate),x.CreatedDate.Value) == 0 || String.IsNullOrEmpty(FromDate)));
            //IQueryable<Order> orders;
            //if (string.IsNullOrEmpty(FromDate))
            //{
            //    orders = db.Orders.Where(x => x.Status == 2);
            //}
            //else
            //{

            //    DateTime dtFromDate = Convert.ToDateTime(FromDate);
            //    orders = db.Orders.Where(x => x.Status == 2 && DateTime.Compare(dtFromDate,Convert.ToDateTime(x.CreatedDate.Value.ToShortDateString())) > 0);
            //}

            var orders = db.Orders.Where(x => x.Status == 2);
            var reprintorders = from MembershipUser u in Membership.GetAllUsers()
                                join o in orders on u.ProviderUserKey equals o.OrderedProducts.First().Product.CreatedBy
                                select new Order
                                {
                                    Id = o.Id,
                                    CreatedDate = o.CreatedDate,
                                    Seats = o.Seats,
                                    TotalAmount = o.TotalAmount,
                                    BillCreatedBy = u.UserName.ToString()
                                };

            return View(reprintorders);
        }
        public void SaveReOrderAndPrint(int orderid)
        {
            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            var reprint = new RePrint
            {
                ReprintedBy = (Guid)user.ProviderUserKey,
                OrderId = orderid,
                ReprintedDate = DateTime.Now
            };
            if (ModelState.IsValid)
            {
                db.RePrints.Add(reprint);
                db.SaveChanges();
                //Do printing
                PrintBill(orderid);
            }

        }

        

    }
}
