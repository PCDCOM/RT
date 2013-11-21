using System;
using System.Collections.Generic;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.Web.Mvc.Html;
using System.Web.Routing;

namespace RT
{
    public static class ModalDialogExtensions
    {
        sealed class DialogActionResult : ActionResult
        {
            public DialogActionResult(string message)
            {
                Message = message ?? string.Empty;
            }

            string Message { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                context.HttpContext.Response.Write(string.Format("<div data-dialog-close='true' data-dialog-result='{0}' />", Message));
            }
        }

        public static MvcHtmlString ModalDialogActionLink(this AjaxHelper ajaxHelper, string linkText, string actionName, string dialogTitle)
        {
            var dialogDivId = Guid.NewGuid().ToString();
            return ajaxHelper.ActionLink(linkText, actionName, routeValues: null,
                    ajaxOptions: new AjaxOptions
                    {
                        UpdateTargetId = dialogDivId,
                        InsertionMode = InsertionMode.Replace,
                        HttpMethod = "GET",
                        OnBegin = string.Format(CultureInfo.InvariantCulture, "prepareModalDialog('{0}')", dialogDivId),
                        OnFailure = string.Format(CultureInfo.InvariantCulture, "clearModalDialog('{0}');alert('Ajax call failed')", dialogDivId),
                        OnSuccess = string.Format(CultureInfo.InvariantCulture, "openModalDialog('{0}', '{1}')", dialogDivId, dialogTitle)
                    });
        }

        public static MvcHtmlString ModalDialogActionLink(this AjaxHelper ajaxHelper, string linkText, string actionName, string controllerName, string dialogTitle)
        {
            var dialogDivId = Guid.NewGuid().ToString();
            return ajaxHelper.ActionLink(linkText, actionName, controllerName, routeValues: null,
                    ajaxOptions: new AjaxOptions
                    {
                        UpdateTargetId = dialogDivId,
                        InsertionMode = InsertionMode.Replace,
                        HttpMethod = "GET",
                        //OnBegin = "prepareModalDialog()",
                        //OnSuccess = "openModalDialog('" + dialogTitle + "')"
                        OnBegin = string.Format(CultureInfo.InvariantCulture, "prepareModalDialog('{0}')", dialogDivId),
                        OnFailure = string.Format(CultureInfo.InvariantCulture, "clearModalDialog('{0}');alert('Ajax call failed')", dialogDivId),
                        OnSuccess = string.Format(CultureInfo.InvariantCulture, "openModalDialog('{0}', '{1}')", dialogDivId, dialogTitle)
                    });
        }


        public static MvcHtmlString ModalDialogActionLink(this AjaxHelper ajaxHelper, string linkText, string actionName, string controllerName, string dialogTitle, object htmlAttributes)
        {
            var dialogDivId = Guid.NewGuid().ToString();
            return ajaxHelper.ActionLink(linkText, actionName, controllerName, routeValues: htmlAttributes,
                    ajaxOptions: new AjaxOptions
                    {
                        UpdateTargetId = dialogDivId,
                        InsertionMode = InsertionMode.Replace,
                        HttpMethod = "GET",
                        //OnBegin = "prepareModalDialog()",
                        //OnSuccess = "openModalDialog('" + dialogTitle + "')"
                        OnBegin = string.Format(CultureInfo.InvariantCulture, "prepareModalDialog('{0}')", dialogDivId),
                        OnFailure = string.Format(CultureInfo.InvariantCulture, "clearModalDialog('{0}');alert('Ajax call failed')", dialogDivId),
                        OnSuccess = string.Format(CultureInfo.InvariantCulture, "openModalDialog('{0}', '{1}')", dialogDivId, dialogTitle)
                    }, htmlAttributes:htmlAttributes);
        }

        public static MvcForm BeginModalDialogForm(this AjaxHelper ajaxHelper)
        {
            return ajaxHelper.BeginForm(new AjaxOptions
            {
                HttpMethod = "POST"
            });
        }

        public static ActionResult DialogResult(this Controller controller)
        {
            return DialogResult(controller, string.Empty);
        }

        public static ActionResult DialogResult(this Controller controller, string message)
        {
            return new DialogActionResult(message);
        }
    }
}