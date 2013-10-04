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


namespace PrintingSystem
{
    public class OrderPrint
    {
        PrintDocument pdoc = null;
        public OrderedProduct[] NewItems { get; set; }
        public OrderedProduct[] OldItems { get; set; }
        public string Seats { get; set; }
        public long OrderId { get; set; }
        public string PrinterName { get; set; }
        public void print()
        {

            using (pdoc = new PrintDocument())
            {
                PrinterSettings ps = new PrinterSettings();
                Font font = new Font("Verdana", 15);
                PaperSize psize = new PaperSize("Custom", 100, 200);
                pdoc.DefaultPageSettings.PaperSize = psize;
                pdoc.DefaultPageSettings.PaperSize.Height = 820;
                pdoc.DefaultPageSettings.PaperSize.Width = 520;

                pdoc.PrinterSettings.PrinterName = PrinterName;
                pdoc.PrintPage += new PrintPageEventHandler(pdoc_PrintPage);
                LogAdapter.Info("user id : " + WindowsIdentity.GetCurrent().Name, "order", "printing");

                pdoc.Print();

            }
        }


        void pdoc_PrintPage(object sender, PrintPageEventArgs e)
        {
            Graphics graphics = e.Graphics;
            Font font = new Font("Verdana", 8);
            Font fontBold = new Font("Verdana", 8, FontStyle.Bold);
            Font fontstriked = new Font("Verdana", 7, FontStyle.Strikeout);
            Pen boldPen = new Pen(Color.Black, 3);
            Pen lightPen = new Pen(Color.Black, 1);

            float fontHeight = font.GetHeight();
            int startX = 3;
            int startY = 2;
            int Offset = 5;
            graphics.DrawString("RESTORAN MUTHU", new Font("Verdana", 10, FontStyle.Bold),
                                new SolidBrush(Color.Black), startX, startY + Offset);
            graphics.DrawString(DateTime.Now.ToShortDateString(),
               font,
                    new SolidBrush(Color.Black), startX + 180, startY + Offset);

            Offset = Offset + 20;
            graphics.DrawString(string.Format("Bill No : {0}     {1}", OrderId, Seats),
                font,
                    new SolidBrush(Color.Black), startX, startY + Offset);


            string[] headerTxts = { "No", "Item", "Qty", "TA." };
            DrawRow(startX, startY = Offset + 20, graphics, lightPen, headerTxts, fontBold);


            int Sno = 0;
            if (OldItems != null)
            {
                foreach (OrderedProduct item in OldItems)
                {
                    string parcel = (item.Type == 1) ? ((char)0x221A).ToString() : "X";
                    string[] rowTxt = { (++Sno).ToString(), item.ProductName, item.Quantity.ToString(), parcel };
                    DrawRow(startX, startY = startY + 20, graphics, lightPen, rowTxt, fontstriked);

                }
            }
            if (NewItems != null)
            {
                foreach (OrderedProduct item in NewItems)
                {
                    string parcel = (item.Type == 1)? ((char)0x221A).ToString() : "X";
                    string[] rowTxt = { (++Sno).ToString(), item.ProductName, item.Quantity.ToString(), parcel };
                    DrawRow(startX, startY = startY + 20, graphics, lightPen, rowTxt, font);

                }
            }
        }

        void DrawRow(int startX, int startY, Graphics graphics, Pen lightPen, string[] txts, Font font)
        {
            int celltWidth = 0;

            var rectObjects = new[] { 
                new { rect = new RectangleF (startX , startY , celltWidth = 25, 20), txt = txts[0], alignment = StringAlignment.Far },
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  115, 20), txt = txts[1] ,alignment = StringAlignment.Near},
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  30, 20), txt = txts[2] ,alignment = StringAlignment.Far},
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  30, 20), txt =txts[3] ,alignment = StringAlignment.Center},
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