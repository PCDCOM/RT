﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RT;

namespace Restaurant.Controllers
{
    [LogActionFilter]
    
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {

            ViewBag.Message = "Welcome";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
