using System.Web;
using System.Web.Mvc;

namespace RT   
{
  public class CustomHandleErrorAttribute : HandleErrorAttribute
  {
    //private readonly ILog _logger;

    public CustomHandleErrorAttribute()
    {
      //_logger = LogManager.GetLogger("MyLogger");
    }

    public override void OnException(ExceptionContext filterContext)
    {

        var controllerName="";
        var actionName="";
    


      // if the request is AJAX return JSON else view.
      if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
      {
        filterContext.Result = new JsonResult
        {
          JsonRequestBehavior = JsonRequestBehavior.AllowGet,
          Data = new
          {
            error = true,
            message = filterContext.Exception.Message
          }
        };
      }
      else
      {
        controllerName = (string)filterContext.RouteData.Values["controller"];
        actionName = (string)filterContext.RouteData.Values["action"];
        var model = new HandleErrorInfo(filterContext.Exception, controllerName, actionName);

        filterContext.Result = new ViewResult
        {
          ViewName = "CustomError",
          MasterName = Master,
          ViewData = new ViewDataDictionary<HandleErrorInfo>(model),
          TempData = filterContext.Controller.TempData
        };
      }

      
      LogAdapter.Error(filterContext.Exception.Message, controllerName, actionName);

      filterContext.ExceptionHandled = true;
      filterContext.HttpContext.Response.Clear();
      filterContext.HttpContext.Response.StatusCode = 500;

      filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
    }
  }
}