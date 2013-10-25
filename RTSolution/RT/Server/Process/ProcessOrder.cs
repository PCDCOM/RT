using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;
using RT.Models;
namespace RT.Server.Response
{
    public class ProcessOrder:ProcessObject
    {

        private RestaurantEntities db = new RestaurantEntities();
        public override string Key
        {
            get { return "order"; }
        }
        public override void Process(string value)
        {
            long Id = 0;
            long.TryParse(value, out Id);
            Order order = db.Orders.Find(Id);
            string createdBy = Membership.GetUser(order.CreatedBy).UserName;
            //we need to send as collection only. becase, in client we treat each oject as client.
            List<ReturnObjects.NotifyOrder> notifyorders = new List<ReturnObjects.NotifyOrder>();
            //Todo: Need to send total
            

            notifyorders.Add(new ReturnObjects.NotifyOrder() { 
                OrderId = order.Id, 
                CreatedDate = order.CreatedDate.Value.ToString("HH: mm tt"), 
                Seats = order.Seats,
                Status = order.GetStatusType(), User = createdBy ,
                Total = order.OrderedProducts.Where(op => op.Status == 1).Sum(op => (op.Quantity * op.Price))
            });
            KeyValuePair<string, List<ReturnObjects.NotifyOrder>> ret = new KeyValuePair<string, List<ReturnObjects.NotifyOrder>>(this.Key +  @"/1", notifyorders);
            this.Message = JsonConvert.SerializeObject(ret);
            
            
        }
    }
}