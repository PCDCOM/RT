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
    
    public partial class ProductGroup
    {
        public ProductGroup()
        {
            this.Products = new HashSet<Product>();
        }
    
        public long Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public bool Status { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime ModifiedDate { get; set; }
    
        public virtual ICollection<Product> Products { get; set; }
    }
}
