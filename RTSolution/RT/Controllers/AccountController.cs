﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using Microsoft.Win32;
using Restaurant.Models;
using RT;
using RT.Models;

namespace Restaurant.Controllers
{
    public class AccountController : Controller
    {

        //
        // GET: /Account/LogOn

        public ActionResult LogOn()
        {

            return View();
        }

        //
        // POST: /Account/LogOn



        [HttpPost]
        public ActionResult LogOn(LogOnModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                // "74DE2BDDAF73BFEBFBFF000206A7AcerBase BoardLXRSE02074146020742000"
                //"08606E822BE5BFEBFBFF000306A9ASUSTeK COMPUTER INC.Base Board121003409109189"
                //Alan Marketing system
                //RestaurantEntities db = new RestaurantEntities();
                //if (Check.getValue() != "74DE2BDDAF73BFEBFBFF000206A7AcerBase BoardLXRSE02074146020742000" || db.Orders.Count() > 40)
                //{
                //    throw new Exception("Custom Error: The software is not genunie");
                //}
                //**************************
                //MusthuRestaurant System
                //if (Check.getValue() != "08606E822BE5BFEBFBFF000306A9ASUSTeK COMPUTER INC.Base Board121003409109189")
                //{
                //    throw new Exception("Custom Error: The software is not genunie");
                //}

                if (returnUrl != null && returnUrl.IndexOf("/user/login", StringComparison.OrdinalIgnoreCase) >= 0)
                    returnUrl = null;

                if (Membership.ValidateUser(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);

                    if (!String.IsNullOrEmpty(returnUrl))
                        return this.Redirect(returnUrl);
                    else
                    {
                        string[] roles = Roles.GetRolesForUser(model.UserName);
                        if(roles.Contains("Waiter")){
                            return this.RedirectToAction("Index","Order");
                        }
                        else if (roles.Contains("Cashier"))
                        {
                            return this.RedirectToAction("Index", "Bill");
                        }
                        else
                            return this.RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "The user name or password provided is incorrect.");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/Relogin
        [HttpGet]
        public ActionResult Relogin(string id)
        {
            //ViewData["waiters"] = Roles.GetUsersInRole("Waiter");
            if (id != "")
            {
                LogOnModel logonmodel = new LogOnModel();
                logonmodel.UserName = id;
                return View(logonmodel);
            }
            else
                return View();

        }


        //
        // POST: /Account/Relogin
        [HttpPost]
        public ActionResult Relogin(LogOnModel model, string returnUrl)
        {
            //ViewData["waiters"] = Roles.GetUsersInRole("Waiter");
            if (ModelState.IsValid)
            {

                //string securityData = ConfigurationManager.AppSettings["SecurityKey"].ToString();
                //string securityFile = Environment.GetFolderPath(Environment.SpecialFolder.System) + "\\RTSetp.dbf";
                //FileInfo f = new FileInfo(securityFile);
                //if (f.Exists)
                //    LogAdapter.Info("file exisits", "Account", "LogOn");
                //else
                //    LogAdapter.Info("File does no exists in " + securityFile, "Account", "LogOn");

                //LogAdapter.Info("Key name" + FileReadWrite.ReadFile(securityFile), "Account", "LogOn");

                //if (!f.Exists || securityData != FileReadWrite.ReadFile(securityFile))
                //{
                //    throw new Exception("The software is not genunie");
                //}

                if (returnUrl != null && returnUrl.IndexOf("/user/login", StringComparison.OrdinalIgnoreCase) >= 0)
                    returnUrl = null;

                if (Membership.ValidateUser(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);

                    if (!String.IsNullOrEmpty(returnUrl))
                    {
                        //return this.Redirect(returnUrl);
                        Response.Redirect(Server.MapPath("/Bill"));
                    }
                    else
                    {
                        string[] roles = Roles.GetRolesForUser(model.UserName);
                        return this.DialogResult("");
                        //if (roles.Contains("Waiter"))
                        //{
                        //    return this.RedirectToAction("Index", "Order");
                        //}
                        //else if (roles.Contains("Cashier"))
                        //{
                        //    return this.RedirectToAction("Index", "Bill");
                        //}
                        //else
                        //    return this.RedirectToAction("Index", "Home");

                    }
                }
                else
                {
                    ModelState.AddModelError("", "UserName/Password is incorrect");
                }
            }

            // If we got this far, something failed, redisplay form
            return PartialView(model);
        }

        //
        // GET: /Account/LogOff

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            Session.Clear();
            Session.Abandon();
            // clear authentication cookie
            HttpCookie cookieX = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            cookieX.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookieX);

            // clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
            HttpCookie cookieY = new HttpCookie("ASP.NET_SessionId", "");
            cookieY.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookieY);

            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.Now.AddSeconds(-1));
            Response.Cache.SetNoStore();

            return RedirectToAction("Index", "Home");
        }

        //
        // GET: /Account/Register

        public ActionResult Register()
        {
            ViewData["Role"] = new SelectList(Roles.GetAllRoles(), "roleName");
            return View();
        }

        //
        // POST: /Account/Register

        [HttpPost]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to register the user
                MembershipCreateStatus createStatus;
                string strExistingUserName = "";
                Membership.GetUser(strExistingUserName);
                if (strExistingUserName == model.UserName)
                    ModelState.AddModelError("707", "User Name already exists");
                else
                {
                    Membership.CreateUser(model.UserName, model.Password, model.Email, null, null, true, null, out createStatus);


                    if (createStatus == MembershipCreateStatus.Success)
                    {
                        Roles.AddUserToRole(model.UserName, model.Role);
                        FormsAuthentication.SetAuthCookie(model.UserName, false /* createPersistentCookie */);
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        ModelState.AddModelError("", ErrorCodeToString(createStatus));
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            ViewData["Role"] = new SelectList(Roles.GetAllRoles(), "roleName");
            return View(model);
        }

        //
        // GET: /Account/ChangePassword

        [Authorize]
        public ActionResult ChangePassword()
        {
            return View();
        }

        //
        // POST: /Account/ChangePassword

        [Authorize]
        [HttpPost]
        public ActionResult ChangePassword(ChangePasswordModel model)
        {
            if (ModelState.IsValid)
            {

                // ChangePassword will throw an exception rather
                // than return false in certain failure scenarios.
                bool changePasswordSucceeded;
                try
                {
                    MembershipUser currentUser = Membership.GetUser(User.Identity.Name, true /* userIsOnline */);
                    changePasswordSucceeded = currentUser.ChangePassword(model.OldPassword, model.NewPassword);
                }
                catch (Exception)
                {
                    changePasswordSucceeded = false;
                }

                if (changePasswordSucceeded)
                {
                    return RedirectToAction("ChangePasswordSuccess");
                }
                else
                {
                    ModelState.AddModelError("", "The current password is incorrect or the new password is invalid.");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ChangePasswordSuccess

        public ActionResult ChangePasswordSuccess()
        {
            return View();
        }

        #region Status Codes
        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // See http://go.microsoft.com/fwlink/?LinkID=177550 for
            // a full list of status codes.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "User name already exists. Please enter a different user name.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "A user name for that e-mail address already exists. Please enter a different e-mail address.";

                case MembershipCreateStatus.InvalidPassword:
                    return "The password provided is invalid. Please enter a valid password value.";

                case MembershipCreateStatus.InvalidEmail:
                    return "The e-mail address provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }
        #endregion
    }
}
