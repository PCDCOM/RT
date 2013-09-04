using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace RT.Server
{
    public class Request
    {

        public ProcessObject Initiate(KeyValuePair<string, string> data)
        {
            return CreateObject(data.Key, data.Value);            
        }
        public ProcessObject CreateObject(string key, string value)
        {
            ProcessObject responseObject = null;
            switch (key)
            {
                case "init":
                    responseObject = new Response.ProcessInit();
                    responseObject.Process(value);
                    break;
                case "order":
                    responseObject = new Response.ProcessOrder();
                    responseObject.Process(value);
                    break;
                case "seats":
                    responseObject = new Response.ProcessSeats();
                    responseObject.Process(value);
                    break;
            }

            return responseObject;
        }

    }
}
