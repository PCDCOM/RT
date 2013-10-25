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
            try
            {
                if (srPort.IsOpen)
                {
                    LogAdapter.Info("Cash drawer port now opening", "CashDrawer", "OpenDrawer");
                    srPort.Write("open");
                    srPort.Close();
                    LogAdapter.Info("Cash drawer now closed", "CashDrawer", "OpenDrawer");
                }
                else
                {
                    LogAdapter.Info("Cash drawer port still closed", "CashDrawer", "OpenDrawer");
                }
            }
            catch(Exception ex){
                LogAdapter.Error(ex.Message, "CashDrawer", "OpenDrawer");
                if (srPort.IsOpen) {
                    LogAdapter.Info("Cash drawer port open", "CashDrawer", "OpenDrawer Inside Catch");
                    srPort.Close();
                    LogAdapter.Info("Cash drawer port closed", "CashDrawer", "OpenDrawer Inside Catch");
                }
            }
        }
    }
}