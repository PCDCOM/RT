using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace RT.Server.Response
{
    public class ProcessSeats: ProcessObject
    {

        public override string Key
        {
            get { return "seats"; }
        }
        public override void Process(string jsonObject)
        {
            //Todo: need to pass userid here
            KeyValuePair<string, string> ret = new KeyValuePair<string, string>(this.Key, jsonObject);
            this.Message = JsonConvert.SerializeObject(ret); 
        }


    }
}