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
        private void UpdateOrderedProducts(OrderedProduct[] newItems, Order orderToUpdate)
        {

            MembershipUser user = Membership.GetUser(HttpContext.User.Identity.Name);
            foreach (OrderedProduct newOrderedProduct in newItems)
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
                        ProductName = newOrderedProduct.ProductName,
                        Status = newOrderedProduct.Status
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
        private void UpdateBillForOrder(OrderedProduct[] orderedproducts,decimal TotalAmount, decimal PaidAmount, decimal BalanceAmount,ref Order orderToUpdate)
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

        private void UpdateDeletedItem(OrderedProduct[] oldItems, Order orderToUpdate)
        {
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
        private void PrintBill(long Id) {
            Order order = db.Orders.Find(Id);
            string createdBy = Membership.GetUser(order.OrderedProducts.First().CreatedBy).UserName;
            PrintingSystem.ReceiptPrint rcpt = new PrintingSystem.ReceiptPrint();

            rcpt.TotalAmount = order.TotalAmount;
            rcpt.OrderNo = Id;
            rcpt.CreatedBy = createdBy;
            rcpt.CreateDate = order.CreatedDate.Value.ToString("dd-MM-yyyy HH:mm");
            if (rcpt.OrderedProducts != null && rcpt.OrderedProducts.Count > 0)
            {
                LogAdapter.Info("Before Prinint", "BillController", "Pay");
                rcpt.OrderedProducts = order.OrderedProducts.Where(i => i.Status == 1).ToList();
                LogAdapter.Info("After Prinint", "BillController", "Pay");
            }

            Task.Run(() => rcpt.print());
        }

        private long Save(long Id, ref Order orderToUpdate, StatusType statustype, OrderedProduct[] newItems, string Seats, decimal TotalAmount,OrderedProduct[] oldItems, int Status = 0)
        {
            long newId = 0;
            
            



            if (TryUpdateModel(orderToUpdate, "", new string[] { "Status", "Seats", "TotalAmount" }
               ))
            {
                if (oldItems != null)
                {
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
        [HttpPost]
        public ActionResult Pay(long Id, OrderedProduct[] newItems, decimal TotalAmount, decimal PaidAmount,
            decimal BalanceAmount, string Seats,OrderedProduct[] oldItems, int Status = 0)
        {

            string securityData = ConfigurationManager.AppSettings["SecurityKey"].ToString();
            string securityFile = Environment.GetFolderPath(Environment.SpecialFolder.System) + "\\RTSetp.dbf";
            FileInfo f = new FileInfo(securityFile);


            //if (!f.Exists || securityData != FileReadWrite.ReadFile(securityFile))
            //{
            //    throw new Exception("The software is not genunie");
            //}
            
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

            UpdateBillForOrder(newItems, TotalAmount, PaidAmount, BalanceAmount, ref orderToUpdate);
            long newId = Save(Id,ref orderToUpdate, StatusType.Paid, newItems, Seats, TotalAmount,oldItems, Status);


            
            if (newItems != null) {
                PrintBill(newId);
            }
            PushToClient(newId);


            

            ModelState.Clear();
            return View("OrderedProducts", new Order());
        }
        [HttpPost]
        public ActionResult SaveOrder(long Id, FormCollection formcollection, OrderedProduct[] newItems, string Seats, decimal TotalAmount, OrderedProduct[] oldItems, int Status = 0)
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
