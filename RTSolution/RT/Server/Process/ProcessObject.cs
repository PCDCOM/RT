using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;
using Microsoft.AspNet.SignalR;

namespace RT.Server
{
    public abstract class ProcessObject{
        public abstract string Key { get;  }
        public string Message { get; set; }
        public abstract void Process(string jsonObject);
        public string UserID
        {
            get
            {
                MembershipUser user = Membership.GetUser(HttpContext.Current.User.Identity.Name);
                //return user.UserName;
                return "";
            }
        }
    }    
}
