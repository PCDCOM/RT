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
        string outerexception = string.Empty;
        string innerexception =string.Empty;


      // if the request is AJAX return JSON else view.
      if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
      {
          string expMessage = filterContext.Exception.Message;
          if (filterContext.Exception.InnerException != null)
              expMessage += filterContext.Exception.InnerException.Message;
        filterContext.Result = new JsonResult
        {
          JsonRequestBehavior = JsonRequestBehavior.AllowGet,
          Data = new
          {
            error = true,
            message = expMessage
          }
        };
      }
      else
      {
        controllerName = (string)filterContext.RouteData.Values["controller"];
        actionName = (string)filterContext.RouteData.Values["action"];
        var model = new HandleErrorInfo(filterContext.Exception , controllerName, actionName);

        filterContext.Result = new ViewResult
        {
          ViewName = "CustomError",
          MasterName = Master,
          ViewData = new ViewDataDictionary<HandleErrorInfo>(model),
          TempData = filterContext.Controller.TempData
        };
      }



        outerexception = filterContext.Exception.Message;

        System.Exception objexception= filterContext.Exception.InnerException;
        while (objexception != null) {
            innerexception += "<inner>" + objexception + "</inner>";
            objexception = objexception.InnerException;
        }

      string exceptionXML = "<exception><outer>" + outerexception +"</outer><inners>" + innerexception + "</inners></exception>";

      LogAdapter.Error(exceptionXML, controllerName, actionName);

      filterContext.ExceptionHandled = true;
      filterContext.HttpContext.Response.Clear();
      filterContext.HttpContext.Response.StatusCode = 500;

      filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
    }
  }
}