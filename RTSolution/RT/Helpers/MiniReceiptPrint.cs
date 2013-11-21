using System;
using System.Collections.Generic;
using System.Linq;
using System.Drawing.Printing;
using System.Drawing;
using System.Threading;
using RT.Models;
using System.Configuration;
using RT;
using System.Security.Principal;
using System.Threading.Tasks;


namespace PrintingSystem
{
    public class MiniReceiptPrint
    {
        PrintDocument pdoc = null;

        public Nullable<decimal> TotalAmount { get; set; }
        public long OrderNo { get; set; }
        public string CreatedBy { get; set; }
        public string Seats { get; set; }
        public string CreateDate { get; set; }
        public string PrinterName { get; set; }
        public ICollection<OrderedProduct> OrderedProducts { get; set; }
        public void print()
        {

            using (pdoc = new PrintDocument())
            {
                PrinterSettings ps = new PrinterSettings();
                Font font = new Font("Courier New", 9);
                PaperSize psize = new PaperSize("Custom", 100, 200);
                pdoc.DefaultPageSettings.PaperSize = psize;
                pdoc.DefaultPageSettings.PaperSize.Height = 820;
                pdoc.DefaultPageSettings.PaperSize.Width = 520;

                pdoc.PrinterSettings.PrinterName = PrinterName;
                pdoc.PrintPage += new PrintPageEventHandler(pdoc_PrintPage);

                LogAdapter.Info("user id : " + WindowsIdentity.GetCurrent().Name, "order", "billing");
                LogAdapter.Info("pdoc.PrinterSettings.PrinterName  : " + pdoc.PrinterSettings.PrinterName, "order", "billing");
                LogAdapter.Info("isvalid : " + pdoc.PrinterSettings.IsValid.ToString(), "order", "billing");
                
                LogAdapter.Info("user id : " + WindowsIdentity.GetCurrent().Name, "order", "billing");



                Task.Run(() => pdoc.Print());
                //foreach (string printerName in PrinterSettings.InstalledPrinters)
                //{
                    
                //    LogAdapter.Info("Printer lists: " + printerName, "", "");

                //}
            }

        }


        void pdoc_PrintPage(object sender, PrintPageEventArgs e)
        {
            Graphics graphics = e.Graphics;
            Font font = new Font("Verdana", 8);
            Font fontBold = new Font("Verdana", 8, FontStyle.Bold);

            Pen boldPen = new Pen(Color.Black, 3);
            Pen lightPen = new Pen(Color.Black, 1);
            float fontHeight = font.GetHeight();
            int startX = 3;
            int startY = 2;
            int Offset = 5;
            string RestaurantName = ConfigurationManager.AppSettings["RestaurantName"];
            graphics.DrawString(RestaurantName, new Font("Verdana", 10, FontStyle.Bold),
                                new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;
            graphics.DrawString("No:118, Jalan Trus,",
                 font, new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;
            graphics.DrawString("80000 Johor Bahru.",
            font, new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;
            graphics.DrawString(CreateDate,
                font,new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;

            graphics.DrawString(string.Format("{0}", OrderNo),
            new Font("Verdana", 10, FontStyle.Bold),
            new SolidBrush(Color.Black), startX , startY + Offset);
            
            graphics.DrawString(string.Format("Tel: 07-2214113"),
               font,
                new SolidBrush(Color.Black), startX + 80, startY + Offset);

            Offset = Offset + 20;
            graphics.DrawString(string.Format("Service: {0}        {1}", CreatedBy, Seats),
                font,
                    new SolidBrush(Color.Black), startX, startY + Offset);


            string[] headerTxts = { "No", "Item", "Qt", "Price", "Amt" };
            DrawRow(startX, startY = Offset + 20, graphics, lightPen, headerTxts, new Font("Verdana", 6));


            int Sno = 0;
            
            foreach (OrderedProduct item in OrderedProducts)
            {
                decimal? tot = item.Price * item.Quantity;
                string[] rowTxt = { (++Sno).ToString(), item.ProductName, item.Quantity.ToString(), 
                                      String.Format("{0:0.00}", item.Price), String.Format("{0:0.00}",tot)};
                DrawRow(startX, startY = startY + 20, graphics, lightPen, rowTxt, new Font("Verdana", 6));
                
            }

            //Total
            RectangleF rf = new RectangleF(startX, startY = startY + 20, 185, 25);
            graphics.DrawRectangle(lightPen, rf.X, rf.Y, rf.Width, rf.Height);
            StringFormat stringFormat = new StringFormat();
            stringFormat.Alignment = StringAlignment.Far;
            stringFormat.LineAlignment = StringAlignment.Center;

            graphics.DrawString("Total: RM " + String.Format("{0:0.00}", TotalAmount), new Font("Verdana", 10, FontStyle.Bold), Brushes.Blue, rf, stringFormat);
            bool isAppendStar;
            bool.TryParse(ConfigurationManager.AppSettings["AppendStarInBarcode"], out isAppendStar);
            string strOrderNo = OrderNo.ToString();
            if (isAppendStar)
            {
                strOrderNo = "*" + OrderNo.ToString() + "*";
            }

            graphics.DrawString(strOrderNo,
                new Font("IDAutomationHC39M", 16),
                new SolidBrush(Color.Black), 50, startY + 40);

            graphics.DrawString(".", font,
                new SolidBrush(Color.Black), startX, startY + 170);
        }

        void DrawRow(int startX, int startY, Graphics graphics, Pen lightPen, string[] txts, Font font)
        {
            int celltWidth = 0;

            var rectObjects = new[] { 
                new { rect = new RectangleF (startX , startY , celltWidth = 18, 20), txt = txts[0], alignment = StringAlignment.Far },
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  92, 20), txt = txts[1] ,alignment = StringAlignment.Near},
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  15, 20), txt = txts[2] ,alignment = StringAlignment.Far},
                new { rect = new RectangleF (startX =startX + celltWidth, startY, celltWidth =  30, 20), txt = txts[3],alignment = StringAlignment.Far },
                new { rect = new RectangleF (startX =startX + celltWidth, startY, celltWidth = 30, 20), txt = txts[4] ,alignment = StringAlignment.Far}
            };



            foreach (var r in rectObjects)
            {
                DrawColumn(r.rect, graphics, lightPen, r.txt, font, r.alignment);
            }



        }
        void DrawColumn(RectangleF cell, Graphics g, Pen lightPen, string text, Font font, StringAlignment alignment)
        {
            g.DrawRectangle(lightPen, cell.X, cell.Y, cell.Width, cell.Height);
            StringFormat stringFormat = new StringFormat();
            stringFormat.Alignment = alignment;
            stringFormat.LineAlignment = StringAlignment.Center;

            g.DrawString(text, font, Brushes.Blue, cell, stringFormat);
        }


    }
}