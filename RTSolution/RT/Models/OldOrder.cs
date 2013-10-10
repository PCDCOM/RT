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
    
    public partial class OldOrder
    {
        public OldOrder()
        {
            this.OldBills = new HashSet<OldBill>();
            this.OldOrderedProducts = new HashSet<OldOrderedProduct>();
            this.OldRePrints = new HashSet<OldRePrint>();
        }
    
        public long Id { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<byte> Status { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public string Seats { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
    
        public virtual ICollection<OldBill> OldBills { get; set; }
        public virtual ICollection<OldOrderedProduct> OldOrderedProducts { get; set; }
        public virtual ICollection<OldRePrint> OldRePrints { get; set; }
    }
}
