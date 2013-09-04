using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using System.IO;
using Newtonsoft.Json;

namespace RT
{

    public class NotificationEngine : PersistentConnection
    {
        private Server.ProcessObject GetResponseObject(KeyValuePair<string, string> dictData)
        {
            
            Server.Request objRequest = new Server.Request();
            Server.ProcessObject response = objRequest.Initiate(dictData);
            return response;
        }
        protected override Task OnReceived(IRequest request, string connectionId, string data)
        {
            KeyValuePair<string, string> dictData = JsonConvert.DeserializeObject<KeyValuePair<string, string>>(data);
            Server.ProcessObject response = GetResponseObject(dictData);
            return Connection.Broadcast(response.Message);
        }
        public void PushFromServer(KeyValuePair<string, string> dictData)
        {
            IConnection connection = GlobalHost.ConnectionManager.GetConnectionContext<NotificationEngine>().Connection;
            Server.ProcessObject response = GetResponseObject(dictData);
            connection.Broadcast(response.Message);
        }
    }
}