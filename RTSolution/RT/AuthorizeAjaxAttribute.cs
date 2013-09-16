using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace RT
{
    public class AjaxAuthorizationFilter : ActionFilterAttribute
    {

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                if (filterContext.HttpContext.User.Identity.IsAuthenticated)
                    filterContext.HttpContext.Response.Headers.Add("X_User_Logged_In", "true");
            }
            base.OnActionExecuted(filterContext);
        }


    }
}