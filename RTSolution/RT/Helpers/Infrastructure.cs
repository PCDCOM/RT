using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using RT.Models;

namespace RT.ReturnObjects
{

    class NotifyOrder
    {
        public long OrderId { get; set; }
        public string CreatedDate { get; set; }
        public StatusType Status { get; set; }
        public string User { get; set; }
        public string Seats { get; set; }
        public Nullable<decimal> Total { get; set; }
    }
    class Seat
    {
        public string Name { get; set; }
        public long UserId { get; set; }
        public SeatType Status { get; set; }
        public long OrderId { get; set; }
        public StatusType OrderStatus  { get; set; }
    }
}

namespace RT
{
    public enum SeatType
    {
        Vacant = 0, 
        Selecting = 1,
        Locked = 2
    }

    public enum StatusType { 
        New = 0,
        Bill = 1,
        Paid = 2
    }
    public static class EntityHelpers
    {
        public static ArrayList SeatArray(this RT.Models.Order order,SeatType seatstatus) {
            //Todo: Need to implement userid here
            //IEnumerable<string> SeatList = order.Seats.Split(',').Select(st => string.Format("{{userid:\"{0}\",\"status\":\"{1}\",\"seat\":\"{2}\"}}", 1.ToString(), seatstatus.ToString(), st)).ToList();
            List<ReturnObjects.Seat> SeatList = new List<ReturnObjects.Seat>();
            if (order.Seats != null)
            {
                SeatList = order.Seats.Split(',').Select(st => new ReturnObjects.Seat
                {
                    UserId = 0,
                    Status = seatstatus,
                    Name = st,
                    OrderId = order.Id,
                    OrderStatus = order.GetStatusType()
                }).ToList();

            }
            return new ArrayList(SeatList);
        }

        //Todo: change this two methods to propery
        public static StatusType  GetStatusType(this Order order)
        {
            if (order == null)
                return StatusType.New;
            return (StatusType)order.Status;
        }
        public static void SetStatusType(this Order order, StatusType statustype)
        {
            order.Status = (byte)statustype;
            
        }

    }
}