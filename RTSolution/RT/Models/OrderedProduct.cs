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
    
    public partial class OrderedProduct
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public long ProductId { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<decimal> Price { get; set; }
        public int Type { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public string ProductName { get; set; }
        public Nullable<int> Status { get; set; }
        public string Reason { get; set; }
    
        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
