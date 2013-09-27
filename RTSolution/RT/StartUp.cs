using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Owin;

namespace RT
{
    public class StartUp
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            app.MapSignalR<NotificationEngine>("/echo");
        }
    }
}