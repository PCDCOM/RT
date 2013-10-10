using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Web;

namespace RT.Helpers
{
    public class RTCashDrawer:SerialPort
    {
        private SerialPort srPort = null;
        public RTCashDrawer() {
            try
            {
                srPort = new SerialPort("COM7", 9600, Parity.None, 8, StopBits.One);
                if (!srPort.IsOpen) srPort.Open();
            }catch(Exception ex){
                LogAdapter.Error(ex.Message, "CashDrawer", "Constructor");
            }

        }
        public void OpenDrawer() {
            if (srPort.IsOpen)
            {
                srPort.Write("open");
                srPort.Close();
            }
        }
    }
}