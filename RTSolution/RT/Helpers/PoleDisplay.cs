using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace RT.Helpers
{
    public class PoleDisplay : SerialPort
    {
        private SerialPort srPort = null;

        public PoleDisplay()
        {
            try
            {
                srPort = new SerialPort("COM5", 9600, Parity.None, 8, StopBits.One);
                if (!srPort.IsOpen) srPort.Open();
            }
            catch (Exception Ex){
                LogAdapter.Error(Ex.Message, "PoleDisplay", "Constructor");
            }
        }



        //To clear Display.....
        public void ClearDisplay()
        {


        }

        //Display Function 
        //'line' 1 for First line and 0 For second line
        public void DisplayTotal(string textToDisplay)
        {
            //if (line == 0)
            //    srPort.Write(textToDisplay);
            //else
                //srPort.WriteLine(textToDisplay);
            if (srPort.IsOpen)
            {
                srPort.Write(Convert.ToString((char)12));
                srPort.Write(Convert.ToString((char)12));

                srPort.WriteLine(textToDisplay);
                srPort.Close();
            }
        }
        public void DisplayPaid(string paid, string balance)
        {
            //if (line == 0)
            //    srPort.Write(textToDisplay);
            //else
            //srPort.WriteLine(textToDisplay);
            if (srPort.IsOpen)
            {
                srPort.Write(Convert.ToString((char)20));
                srPort.Write(Convert.ToString((char)20));

                srPort.Write(paid);
                srPort.WriteLine(balance);
                srPort.Close();
            }
        }
    }
}