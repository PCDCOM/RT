using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using RT.Models;
namespace RT.Server.Response
{

    public class ProcessInit : ProcessObject
    {
        private RestaurantEntities db = new RestaurantEntities();

        public override string Key
        {
            get { return "init"; }
        }

        public override void Process(string value)
        {
            
            //Todo: Need to filter based on the user, if admin we need to select all
            List<ReturnObjects.NotifyOrder> notifyorders = new List<ReturnObjects.NotifyOrder>();
            ArrayList seatsArray = new ArrayList();
            //Todo: need to solve the unrecognised StatusType issue
            //IEnumerable<RT.Order> newOrders = db.Orders.Where(i => i.GetStatusType() == StatusType.New);
            IEnumerable<Order> newOrders = db.Orders.Where(i => (i.Status == (byte)StatusType.New || i.Status == (byte)StatusType.Bill));

            //Todo: need to optimise this code and do it in lamda expression
            foreach (Order item in newOrders)
            {
                //Todo: Need to add total in DB and retrieve here
                notifyorders.Add(new ReturnObjects.NotifyOrder() { 
                    OrderId = item.Id, 
                    CreatedDate = item.CreatedDate.Value.ToString("HH : mm tt"), 
                    Status = item.GetStatusType(), User = "1",
                    Seats = item.Seats,
                    Total = item.TotalAmount
                });
                //seats.Add(item.SeatJson(SeatStatus.Locked));
                //Todo: need to optimise this code
                ArrayList seatGroup = item.SeatArray(SeatType.Locked);
                foreach (object itembyord in seatGroup)
	            {
                    seatsArray.Add(itembyord);
	            }
                
            }

            ArrayList objArray = new ArrayList() { notifyorders, seatsArray };

            //Todo: Need to pass key with user id
            KeyValuePair<string, ArrayList> ret = new KeyValuePair<string, ArrayList>(this.Key + "/" + this.UserID, objArray);
            this.Message =  JsonConvert.SerializeObject(ret);   
        }
         
    }
}