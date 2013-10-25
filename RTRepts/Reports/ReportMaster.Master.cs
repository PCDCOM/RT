using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

namespace ReportList
{
    public partial class ReportMaster_ : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string hostname = HttpContext.Current.Request.Url.Host;

            string homeurl = "http://" + hostname + "/Restaurant/";
            Menu1.Items[0].NavigateUrl = homeurl;
          
                LoginStatus1.Visible = false;
                login.Visible = false;
                lblWelcome.Visible = false;
                //if (Roles.IsUserInRole("Admin") || Roles.IsUserInRole("User"))
                //{ 
                //    login.Visible = false;
                //    LoginStatus1.Visible = true;
                //}
                if (this.Context.User.Identity.Name != "")
                {
                    login.Visible = false; LoginStatus1.Visible = true; lblWelcome.Visible = true;

                }
            
           
        }
    }
}