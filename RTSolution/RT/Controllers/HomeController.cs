using System;
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
            string securityData = ConfigurationManager.AppSettings["SecurityKey"].ToString();
            string securityFile = Environment.GetFolderPath(Environment.SpecialFolder.System) + "\\RTSetp.dbf";
            FileInfo f = new FileInfo(securityFile);

            if (f.Exists)
            {
                if (securityData != FileReadWrite.ReadFile(securityFile))
                {
                    throw new Exception("The software is not genunie");
                }
            }
            ViewBag.Message = "Welcome";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
