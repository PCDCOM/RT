using System;
using System.Collections.Generic;
using System.Linq;
using System.Drawing.Printing;
using System.Drawing;
using System.Threading;
using RT.Models;



namespace PrintingSystem
{
    public class ReceiptPrint
    {
        PrintDocument pdoc = null;

        public Nullable<decimal> TotalAmount { get; set; }
        public long OrderNo { get; set; }
        public string CreatedBy { get; set; }
        public string CreateDate { get; set; }
        public ICollection<OrderedProduct> OrderedProducts { get; set; }
        public void print()
        {
            pdoc = new PrintDocument();
            PrinterSettings ps = new PrinterSettings();
            Font font = new Font("Courier New", 15);
            PaperSize psize = new PaperSize("Custom", 100, 200);
            pdoc.DefaultPageSettings.PaperSize = psize;
            pdoc.DefaultPageSettings.PaperSize.Height = 820;
            pdoc.DefaultPageSettings.PaperSize.Width = 520;
            pdoc.PrintPage += new PrintPageEventHandler(pdoc_PrintPage);
            pdoc.Print();



        }


        void pdoc_PrintPage(object sender, PrintPageEventArgs e)
        {
            Graphics graphics = e.Graphics;
            Font font = new Font("Georgia", 8);
            Font fontBold = new Font("Georgia", 8, FontStyle.Bold);

            Pen boldPen = new Pen(Color.Black, 3);
            Pen lightPen = new Pen(Color.Black, 1);
            float fontHeight = font.GetHeight();
            int startX = 3;
            int startY = 2;
            int Offset = 5;
            graphics.DrawString("RESTORAN MUTHU", new Font("Courier New", 14, FontStyle.Bold),
                                new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 30;
            graphics.DrawString("No:118, Jalan Trus, 80000 Johor Bahru.",
                 font, new SolidBrush(Color.Black), startX, startY + Offset);

            Offset = Offset + 20;

            graphics.DrawString(string.Format("Tel: 07-2214113        Bill No : {0}", OrderNo),
               fontBold,
                    new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;
            graphics.DrawString(string.Format("{0}    Service: {1}", CreateDate, CreatedBy),
                font,
                    new SolidBrush(Color.Black), startX, startY + Offset);


            string[] headerTxts = { "No", "Item", "Qty", "RM", "Amt" };
            DrawRow(startX, startY = Offset + 20, graphics, lightPen, headerTxts, fontBold);


            int Sno = 0;
            
            foreach (OrderedProduct item in OrderedProducts)
            {

                string[] rowTxt = { (++Sno).ToString(), item.ProductName, item.Quantity.ToString(), 
                                      String.Format("{0:0.00}", item.Price), String.Format("{0:0.00}",item.Amount)};
                DrawRow(startX, startY = startY + 20, graphics, lightPen, rowTxt, font);
                
            }

            //Total
            RectangleF rf = new RectangleF(startX, startY = startY + 20, 280, 30);
            graphics.DrawRectangle(lightPen, rf.X, rf.Y, rf.Width, rf.Height);
            StringFormat stringFormat = new StringFormat();
            stringFormat.Alignment = StringAlignment.Far;
            stringFormat.LineAlignment = StringAlignment.Center;

            graphics.DrawString("Total: RM " + String.Format("{0:0.00}",TotalAmount), fontBold, Brushes.Blue, rf, stringFormat);


        }

        void DrawRow(int startX, int startY, Graphics graphics, Pen lightPen, string[] txts, Font font)
        {
            int celltWidth = 0;

            var rectObjects = new[] { 
                new { rect = new RectangleF (startX , startY , celltWidth = 25, 20), txt = txts[0], alignment = StringAlignment.Far },
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  110, 20), txt = txts[1] ,alignment = StringAlignment.Near},
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  25, 20), txt = txts[2] ,alignment = StringAlignment.Far},
                new { rect = new RectangleF (startX =startX + celltWidth, startY, celltWidth =  60, 20), txt = txts[3],alignment = StringAlignment.Far },
                new { rect = new RectangleF (startX =startX + celltWidth, startY, celltWidth = 60, 20), txt = txts[4] ,alignment = StringAlignment.Far}
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