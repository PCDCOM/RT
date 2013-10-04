using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.PointOfService;
namespace RT.Helpers
{
    public class CashDrawerClass
    {
        CashDrawer myCashDrawer;
        PosExplorer explorer;

        public CashDrawerClass()
        {
            explorer = new PosExplorer();
            DeviceInfo ObjDevicesInfo = explorer.GetDevice("CashDrawer");
            myCashDrawer = (CashDrawer)explorer.CreateInstance(ObjDevicesInfo);
        }

        public void OpenCashDrawer()
        {
            try
            {
                myCashDrawer.Open();
                myCashDrawer.Claim(1000);
                myCashDrawer.DeviceEnabled = true;
                myCashDrawer.OpenDrawer();
                myCashDrawer.DeviceEnabled = false;
                myCashDrawer.Release();
                myCashDrawer.Close();
            }
            catch (Exception ex) { 
            }
        }
    }
}