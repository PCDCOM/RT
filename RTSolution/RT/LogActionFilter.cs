using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace RT
{
    public class LogActionFilter : ActionFilterAttribute
    {

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            LogAdapter.Info("OnActionExecuted", filterContext.RouteData.Values["Controller"].ToString(), filterContext.RouteData.Values["Action"].ToString());
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            LogAdapter.Info("OnActionExecuted", filterContext.RouteData.Values["Controller"].ToString(), filterContext.RouteData.Values["Action"].ToString());
        }

        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            LogAdapter.Info("OnActionExecuted", filterContext.RouteData.Values["Controller"].ToString(), filterContext.RouteData.Values["Action"].ToString());
        }

        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            LogAdapter.Info("OnActionExecuted", filterContext.RouteData.Values["Controller"].ToString(), filterContext.RouteData.Values["Action"].ToString());
        }
    }
}