﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RT.Models
{
    [MetadataType(typeof(ProductMetaData))]
    public partial class Product
    {
        public class ProductMetaData
        {
            [Display(Name = "Product Name")]
            [Required(ErrorMessage="Product Name is required")]
            public string Name { get; set; }

            [Required(ErrorMessage = "Details are required")]
            public string Details { get; set; }

            [Required(ErrorMessage = "Product group name is required")]
            public long ProductGroupID { get; set; }
            
            
            [DisplayFormat(DataFormatString = "{dd/MM/yy}")]
            public Nullable<System.DateTime> ExpiryDate { get; set; }

            [Required(ErrorMessage = "Stock is required")]
            public Nullable<int> Stock { get; set; }

            [Required(ErrorMessage = "Low Stock Range is required")]
            public Nullable<int> LowStockRange { get; set; }

            [Required(ErrorMessage = "Actual Price is required")]
            public Nullable<decimal> ActualPrice { get; set; }

            [Required(ErrorMessage = "First Selling Price is required")]
            public Nullable<decimal> FirstSellingPrice { get; set; }

            [Required(ErrorMessage = "Kitchen name is required")]
            public Nullable<int> KitchenID { get; set; }
        }
    }

    [MetadataType(typeof(ProducGroupMetaData))]
    public partial class ProductGroup
    {
        public class ProducGroupMetaData
        {
            [Display(Name = "Product Name")]
            [Required(ErrorMessage = "Product Group Name is required")]
            public string Name { get; set; }

            [Required(ErrorMessage = "Details are required")]
            public string Details { get; set; }
        }
    }

    [MetadataType(typeof(KitchenMetaData))]
    public partial class Kitchen
    {
        public class KitchenMetaData
        {
            [Display(Name = "Kitchen Name")]
            [Required(ErrorMessage = "Kitchen Name is required")]
            public string KitchenName { get; set; }

        }
    }

}