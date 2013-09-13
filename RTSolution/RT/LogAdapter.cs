using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NLog;

namespace RT
{
    public static class LogAdapter
    {

        public static void Info(string Message, string ControllerName, string ActionName)
        {
            LogManager.GetCurrentClassLogger().Info("Info:" + Message + " ," + "Controller: " + ControllerName + ", " + "Action: " + ActionName);
         
        }

        public static void Error(string Message, string ControllerName, string ActionName)
        {
            LogManager.GetCurrentClassLogger().Error("Err:" + Message + " ," + "Controller: " + ControllerName + ", " + "Action: " + ActionName);

        }
    }
}