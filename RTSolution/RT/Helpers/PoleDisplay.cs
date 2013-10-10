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
    class PoleDisplay : SerialPort
    {
        private SerialPort srPort = null;

        public PoleDisplay()
        {
            try
            {
                srPort = new SerialPort("COM5", 9600, Parity.None, 8, StopBits.One);
                if (!srPort.IsOpen) srPort.Open();
            }
            catch { }
        }



        //To clear Display.....
        public void ClearDisplay()
        {
            srPort.Write("                    ");
            srPort.WriteLine("                    ");

        }

        //Display Function 
        //'line' 1 for First line and 0 For second line
        public void Display(string textToDisplay, int line)
        {
            if (line == 0)
                srPort.Write(textToDisplay);
            else
                srPort.WriteLine(textToDisplay);
        }

    }
}