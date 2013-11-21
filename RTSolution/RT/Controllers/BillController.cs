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
using Microsoft.PointOfService;
using Newtonsoft.Json;
using RT.Helpers;
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
                        
                        ProductName = newOrderedProduct.ProductName,
                        Status = newOrderedProduct.Status
                    };
                    orderToUpdate.OrderedProducts.Add(orderedProduct);
                }
                else
                {
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
            ICollection<OrderedProduct> orderedProducts = order.OrderedProducts.Where(i => i.Status == 1).ToList();
            if (orderedProducts != null && orderedProducts.Count > 0)
            {
                
                OrderedProduct firstOrderedProduct = order.OrderedProducts.FirstOrDefault();
                string createdBy;
                if (firstOrderedProduct != null)
                    createdBy = Membership.GetUser(order.OrderedProducts.First().CreatedBy).UserName;
                else
                    createdBy = Membership.GetUser().UserName;

                string forcePrinter = string.Empty;

                if (Request.Cookies["printerfullname"] != null)
                {

                    //var encryptedBytes = Convert.FromBase64String(Request.Cookies["printerfullname"].Value);
                    //var decryptedBytes = System.Security.Cryptography.ProtectedData.Unprotect(encryptedBytes, null, System.Security.Cryptography.DataProtectionScope.CurrentUser);
                    forcePrinter = HttpUtility.UrlDecode(Request.Cookies["printerfullname"].Value);


                }
                
                if (string.IsNullOrEmpty(forcePrinter) || forcePrinter.Equals("Dynamic"))
                {
                    forcePrinter = ConfigurationManager.AppSettings["CommonPrinter"].ToString();
                }

                PrintingSystem.ReceiptPrint rcpt = new PrintingSystem.ReceiptPrint();
                rcpt.PrinterName = forcePrinter;

                rcpt.TotalAmount = order.OrderedProducts.Where(op => op.Status == 1).Sum(op => (op.Quantity * op.Price));
                rcpt.OrderNo = Id;
                rcpt.CreatedBy = createdBy;
                rcpt.Seats = order.Seats;
                rcpt.CreateDate = order.CreatedDate.Value.ToString("dd-MM-yyyy HH:mm");
                rcpt.OrderedProducts = orderedProducts;
                
                Task.Run(() => rcpt.print());
                //.print();
            }

            
        }
        private long Save(long Id, ref Order orderToUpdate, StatusType statustype, OrderedProduct[] newItems, string Seats,
            OrderedProduct[] oldItems, int Status = 0)
        {
            bool needbill = false;
            return Save(Id, ref orderToUpdate, StatusType.New, newItems, Seats, oldItems, ref needbill, Status);
        }
        private long Save(long Id, ref Order orderToUpdate, StatusType statustype, OrderedProduct[] newItems, string Seats, 
            OrderedProduct[] oldItems,ref bool needBill, int Status = 0)
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
        public ActionResult Pay(long Id, decimal PaidAmount, string Seats, OrderedProduct[] newItems,  
             OrderedProduct[] oldItems, int Status = 0)
        {
            LogAdapter.Info("Id" + Id.ToString() + "PaidAmount : " + PaidAmount.ToString() + "Seats: " + Seats, "BillConntroller", "Pay");
            LogAdapter.Info("Cash drawer start initialise: orderId" + Id.ToString(), "BillConntroller", "Pay");
            RTCashDrawer cd = new RTCashDrawer();
            LogAdapter.Info("Cash drawer stop initialise: orderId" + Id.ToString(), "BillConntroller", "Pay");
            LogAdapter.Info("Cash drawer start open orderid : " + Id.ToString(), "BillConntroller", "Pay");
            cd.OpenDrawer();
            LogAdapter.Info("Cash drawer stop open orderid : " + Id.ToString(), "BillConntroller", "Pay");
            cd.Dispose();
            LogAdapter.Info("Cash drawer disposed" + Id.ToString(), "BillConntroller", "Pay");
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
            decimal TotalAmount = orderToUpdate.OrderedProducts.Where(op => op.Status == 1).Sum(op => (op.Quantity * op.Price)).Value;
            decimal BalanceAmount = PaidAmount - TotalAmount;

            PoleDisplay pole = new PoleDisplay();

            //pole.ClearDisplay();
            pole.DisplayPaid(string.Format("{0,20}", "Paid: " + string.Format(PaidAmount.ToString("0.00"))), string.Format("{0,20}", "Bal: " + string.Format(BalanceAmount.ToString("0.00"))));
            pole.Dispose();


            bool needPrint = false;

            if (orderToUpdate.Status != (byte)StatusType.Bill)
                needPrint = true;
            
            UpdateBillForOrder(newItems, TotalAmount, PaidAmount, BalanceAmount, ref orderToUpdate);
            long newId = Save(Id, ref orderToUpdate, StatusType.Paid, newItems, Seats, oldItems,ref needPrint, Status );


            
            if (needPrint) {
                PrintBill(newId);
            }
            PushToClient(newId);

            ModelState.Clear();
            return View("OrderedProducts", new Order());
        }
        [HttpPost]
        public ActionResult SaveOrder(long Id, FormCollection formcollection, OrderedProduct[] newItems, string Seats, 
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
            long newId = Save(Id, ref orderToUpdate, StatusType.New, newItems, Seats, oldItems, Status);
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
        public ActionResult OrderedProducts(Nullable<int> id)
        {
            Order order = null;
            if (id == null || id == 0)
                order = new Order();
            else
            {
                order = db.Orders.Where(x => x.Id == id && (x.Status == (byte)StatusType.New || x.Status == (byte)StatusType.Bill)).SingleOrDefault<Order>();
                if (order == null)
                {
                    order = db.Orders.Where(x => x.Id == id).SingleOrDefault<Order>();
                    if (order != null && order.Status == (byte)StatusType.Paid)
                    {
                        throw new Exception("Custom : Paid already - Could not order/bill again");
                    }
                    else
                    {
                        string strId = string.Empty;
                        strId = id.ToString();
                        throw new Exception("Custom : Invalid order Id" + strId);
                    }
                }else{
                    PoleDisplay pole = new PoleDisplay();
                    
                    //pole.ClearDisplay();
                    Nullable<decimal> Total = order.OrderedProducts.Where(op => op.Status == 1).Sum(op => (op.Quantity * op.Price));
                    pole.DisplayTotal(string.Format("{0,20}", "Total: " + string.Format(Total.Value.ToString("0.00"))));
                    pole.Dispose();
                }

            }


            ModelState.Clear();
            return View("OrderedProducts", order);
        }
    }
}
