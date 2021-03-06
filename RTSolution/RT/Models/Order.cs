//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RT.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Order
    {
        public Order()
        {
            this.Bills = new HashSet<Bill>();
            this.OrderedProducts = new HashSet<OrderedProduct>();
            this.RePrints = new HashSet<RePrint>();
        }
    
        public long Id { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<byte> Status { get; set; }
        public string Seats { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
    
        public virtual ICollection<Bill> Bills { get; set; }
        public virtual ICollection<OrderedProduct> OrderedProducts { get; set; }
        public virtual ICollection<RePrint> RePrints { get; set; }
    }
}
