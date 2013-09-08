using System;
using System.Collections.Generic;
using System.Linq;
using System.Drawing.Printing;
using System.Drawing;
using System.Threading;



namespace PrintingSystem
{
    public class ReceiptPrint
    {
        PrintDocument pdoc = null;
        int ticketNo;
        DateTime TicketDate;
        String Source, Destination, DrawnBy;
        float Amount;

        public int TicketNo
        {
            //set the person name
            set { this.ticketNo = value; }
            //get the person name 
            get { return this.ticketNo; }
        }
        public DateTime ticketDate
        {
            //set the person name
            set { this.TicketDate = value; }
            //get the person name 
            get { return this.TicketDate; }
        }

        public String source
        {
            //set the person name
            set { this.Source = value; }
            //get the person name 
            get { return this.Source; }
        }
        public String destination
        {
            //set the person name
            set { this.Destination = value; }
            //get the person name 
            get { return this.Destination; }
        }
        public float amount
        {
            //set the person name
            set { this.Amount = value; }
            //get the person name 
            get { return this.Amount; }
        }
        public String drawnBy
        {
            //set the person name
            set { this.DrawnBy = value; }
            //get the person name 
            get { return this.DrawnBy; }
        }

        public ReceiptPrint()
        {

        }
        public ReceiptPrint(int ticketNo, DateTime TicketDate, String Source,
               String Destination, float Amount, String DrawnBy)
        {
            this.ticketNo = ticketNo;
            this.TicketDate = TicketDate;
            this.Source = Source;
            this.Destination = Destination;
            this.Amount = Amount;
            this.DrawnBy = DrawnBy;
        }
        public void print()
        {

            //Thread.Sleep(10000);
            pdoc = new PrintDocument();
            PrinterSettings ps = new PrinterSettings();
            Font font = new Font("Courier New", 15);


            PaperSize psize = new PaperSize("Custom", 100, 200);
            //ps.DefaultPageSettings.PaperSize = psize;


            pdoc.DefaultPageSettings.PaperSize = psize;
            //pdoc.DefaultPageSettings.PaperSize.Height =320;
            pdoc.DefaultPageSettings.PaperSize.Height = 820;

            pdoc.DefaultPageSettings.PaperSize.Width = 520;

            pdoc.PrintPage += new PrintPageEventHandler(pdoc_PrintPage);
            pdoc.Print();

            

        }

        //public async Task<string>  printAsync()
        //{
        //    await Task.Delay(3000);

        //    pdoc = new PrintDocument();
        //    PrinterSettings ps = new PrinterSettings();
        //    Font font = new Font("Courier New", 15);


        //    PaperSize psize = new PaperSize("Custom", 100, 200);
        //    //ps.DefaultPageSettings.PaperSize = psize;


        //    pdoc.DefaultPageSettings.PaperSize = psize;
        //    //pdoc.DefaultPageSettings.PaperSize.Height =320;
        //    pdoc.DefaultPageSettings.PaperSize.Height = 820;

        //    pdoc.DefaultPageSettings.PaperSize.Width = 520;

        //    pdoc.PrintPage += new PrintPageEventHandler(pdoc_PrintPage);
        //    pdoc.Print();

        //    return await Task.Run(() =>
        //    {
        //        return ("success");
        //    });

        //}

        void pdoc_PrintPage(object sender, PrintPageEventArgs e)
        {
            Graphics graphics = e.Graphics;
            Font font = new Font("Courier New", 10);
            float fontHeight = font.GetHeight();
            int startX = 50;
            int startY = 55;
            int Offset = 40;
            graphics.DrawString("RESTORAN MUTHU", new Font("Courier New", 14),
                                new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;
            graphics.DrawString("No:118, Jalan Trus, 80000 Johor Bahru.",
                 new Font("Courier New", 14),
                                new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;
            graphics.DrawString("Tel: 07-2214113 8/9/2013 21:49",
                new Font("Courier New", 14),
                    new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;
            graphics.DrawString("Bill No : 19 Service: A1",
                new Font("Courier New", 14),
                    new SolidBrush(Color.Black), startX, startY + Offset);


            //graphics.DrawImage(
            //    Image.FromFile(@"C:\PCCOM\Projects\RT\RTSolution\RT\test.jpg"),0,0);
        }
    }
}