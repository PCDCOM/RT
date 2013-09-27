using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;
using RT.Models;

namespace RT.Controllers
{
    [Authorize(Roles = "Admin,Cashier")]
    [AjaxAuthorizationFilter]
    public class BillController : AsyncController
    {
        private RestaurantEntities db = new RestaurantEntities();
        //
        // GET: /Bill/

        public ActionResult Index()
        {
            return View();
        }
        private void UpdateOrderedProducts(OrderedProduct[] newItems, Order orderToUpdate, ref bool needBill)
        {

            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            foreach (OrderedProduct newOrderedProduct in newItems)
            {
                OrderedProduct matchedOrder = orderToUpdate.OrderedProducts.SingleOrDefault(i => i.ProductId == newOrderedProduct.ProductId && i.Type == newOrderedProduct.Type);
                if (matchedOrder == null)
                {
                    needBill = true;
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
                        ProductName = newOrderedProduct.ProductName,
                        Status = newOrderedProduct.Status
                    };
                    orderToUpdate.OrderedProducts.Add(orderedProduct);
                }
                else
                {
                    if (matchedOrder.Price != newOrderedProduct.Price)
                    {
                        needBill = true;
                        matchedOrder.Price += newOrderedProduct.Price;
                    }
                    if (matchedOrder.Quantity != newOrderedProduct.Quantity)
                    {
                        needBill = true;
                        matchedOrder.Quantity += newOrderedProduct.Quantity;
                    }
                }
            }


        }
        private void UpdateBillForOrder(OrderedProduct[] orderedproducts,decimal TotalAmount, decimal PaidAmount, decimal BalanceAmount,
            ref Order orderToUpdate)
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

        private void UpdateDeletedItem(OrderedProduct[] oldItems, Order orderToUpdate,ref bool needBill)
        {
            foreach (OrderedProduct oldItem in oldItems)
            {
                OrderedProduct matchedOrder = orderToUpdate.OrderedProducts.Where(i => i.Id == oldItem.Id).Single();
                if (matchedOrder != null && matchedOrder.Status != oldItem.Status)
                {
                    needBill = true;
                    matchedOrder.Status = oldItem.Status;
                    matchedOrder.Reason = oldItem.Reason;
                }

            }

        }
        private void PrintBill(long Id) {
            Order order = db.Orders.Find(Id);
            OrderedProduct firstOrderedProduct = order.OrderedProducts.FirstOrDefault();
            string createdBy;
            if(firstOrderedProduct !=null)
                createdBy = Membership.GetUser(order.OrderedProducts.First().CreatedBy).UserName;
            else
                createdBy = Membership.GetUser().UserName;
            PrintingSystem.ReceiptPrint rcpt = new PrintingSystem.ReceiptPrint();

            rcpt.PrinterName = ConfigurationManager.AppSettings["CommonPrinter"].ToString();

            rcpt.TotalAmount = order.TotalAmount;
            rcpt.OrderNo = Id;
            rcpt.CreatedBy = createdBy;
            rcpt.Seats = order.Seats;
            rcpt.CreateDate = order.CreatedDate.Value.ToString("dd-MM-yyyy HH:mm");
            rcpt.OrderedProducts = order.OrderedProducts.Where(i => i.Status == 1).ToList();
            if (rcpt.OrderedProducts != null && rcpt.OrderedProducts.Count > 0)
            {
                LogAdapter.Info("Before Prinint", "BillController", "Pay");
                Task.Run(() => rcpt.print());
                LogAdapter.Info("After Prinint", "BillController", "Pay");
            }

            
        }
        private long Save(long Id, ref Order orderToUpdate, StatusType statustype, OrderedProduct[] newItems, string Seats,
            decimal TotalAmount, OrderedProduct[] oldItems, int Status = 0)
        {
            bool needbill = false;
            return Save(Id, ref orderToUpdate, StatusType.New, newItems, Seats, TotalAmount, oldItems, ref needbill, Status);
        }
        private long Save(long Id, ref Order orderToUpdate, StatusType statustype, OrderedProduct[] newItems, string Seats, 
            decimal TotalAmount,OrderedProduct[] oldItems,ref bool needBill, int Status = 0)
        {
            long newId = 0;
            

            //if (TryUpdateModel(orderToUpdate, "", new string[] { "Status", "Seats", "TotalAmount" }
            //   ))
            //{
                if (oldItems != null)
                {
                    UpdateDeletedItem(oldItems, orderToUpdate,ref needBill);
                }
                if (newItems != null)
                {
                    UpdateOrderedProducts(newItems, orderToUpdate, ref needBill);
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

            //}


            return newId;
        }
        [HttpPost]
        public ActionResult Pay(long Id, OrderedProduct[] newItems, decimal TotalAmount, decimal PaidAmount,
            decimal BalanceAmount, string Seats,OrderedProduct[] oldItems, int Status = 0)
        {
            bool needPrint = false;
            Order orderToUpdate = null;
            if (Id == 0)
            {
                MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
                orderToUpdate = new Order() { CreatedBy = (Guid)user.ProviderUserKey, CreatedDate = DateTime.Now };
            }
            else
            {
                orderToUpdate = db.Orders.Where(i => i.Id == Id).Single();
            }
            if (orderToUpdate.Status != (byte)StatusType.Bill)
                needPrint = true;
            UpdateBillForOrder(newItems, TotalAmount, PaidAmount, BalanceAmount, ref orderToUpdate);
            long newId = Save(Id, ref orderToUpdate, StatusType.Paid, newItems, Seats, TotalAmount, oldItems,ref needPrint, Status );


            
            if (needPrint) {
                PrintBill(newId);
            }
            PushToClient(newId);


            

            ModelState.Clear();
            return View("OrderedProducts", new Order());
        }
        [HttpPost]
        public ActionResult SaveOrder(long Id, FormCollection formcollection, OrderedProduct[] newItems, string Seats, decimal TotalAmount, 
            OrderedProduct[] oldItems, int Status = 0)
        {
            
            Order orderToUpdate = null;
            if (Id == 0)
            {
                MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
                orderToUpdate = new Order() { CreatedBy = (Guid)user.ProviderUserKey, CreatedDate = DateTime.Now };
            }
            else
            {
                orderToUpdate = db.Orders.Where(i => i.Id == Id).Single();
            }
            long newId = Save(Id, ref orderToUpdate, StatusType.New, newItems, Seats, TotalAmount, oldItems, Status);
            //Todo: Need to pass userid here
            if (Id == 0)
            {
                PushToClient(newId);
            }
            ModelState.Clear();
            return View("OrderedProducts", new Order());

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

                ArrayList SeatArray = orderToUpdate.SeatArray(SeatType.Vacant);
                string jsonSeats = JsonConvert.SerializeObject(SeatArray);
                KeyValuePair<string, string> dictSeats = new KeyValuePair<string, string>("seats", jsonSeats);
                notificationengine.PushFromServer(dictSeats);
            }
        }
        [HttpGet]
        public ActionResult OrderedProducts(int id)
        {
            Order order = null;
            if (id == 0)
                order = new Order();
            else
            {
                order = db.Orders.Where(x => x.Id == id && (x.Status == (byte)StatusType.New || x.Status == (byte)StatusType.Bill)).SingleOrDefault<Order>();
                if (order == null)
                {
                    order = new Order();
                    throw new Exception("Could not load order");
                }
            }
            ModelState.Clear();
            return View("OrderedProducts", order);
        }
    }
}
