using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RT
{

    public partial class OrderedProductModel
    {

        public long ProductId { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string ParcelPrice { get; set; }
        public decimal Amount { get; set; }
        public string ProductName { get; set; }
        public int Type { get; set; }

    }
}