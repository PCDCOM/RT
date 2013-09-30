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
    public class TotalSummaryPrint
    {
        PrintDocument pdoc = null;

        public DateTime TodaysDate { get; set; }
        public decimal DenominatorTotl { get; set; }
        public decimal OrderTotal { get; set; }
        public decimal Difference { get; set; }       
        public string PrinterName { get; set; }

        public void print()        {

            pdoc = new PrintDocument();
            PrinterSettings ps = new PrinterSettings();
            Font font = new Font("Courier New", 15);
            PaperSize psize = new PaperSize("Custom", 100, 200);
            pdoc.DefaultPageSettings.PaperSize = psize;
            pdoc.DefaultPageSettings.PaperSize.Height = 820;
            pdoc.DefaultPageSettings.PaperSize.Width = 520;

            pdoc.PrinterSettings.PrinterName = PrinterName;
            pdoc.PrintPage += new PrintPageEventHandler(pdoc_PrintPage);
            using (WindowsImpersonationContext wic = WindowsIdentity.Impersonate(IntPtr.Zero))
            {
                pdoc.Print();
            }


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
            graphics.DrawString("RESTORAN MUTHU", new Font("Courier New", 13, FontStyle.Bold),
                                new SolidBrush(Color.Black), startX, startY + Offset);
            graphics.DrawString(TodaysDate.ToShortDateString(),
               font,
                    new SolidBrush(Color.Black), startX + 180, startY + Offset);
            Offset = Offset + 30;

     
            //Total
            graphics.DrawString(string.Format("Order Total : {0}", OrderTotal),
               font,
                    new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;

            graphics.DrawString(string.Format("Denominator Total : {0}", DenominatorTotl),
             font,
                  new SolidBrush(Color.Black), startX, startY + Offset);
            Offset = Offset + 20;

            graphics.DrawString(string.Format("Difference : {0}", Difference),
             font,
                  new SolidBrush(Color.Black), startX, startY + Offset);
                                   
        }

        void DrawRow(int startX, int startY, Graphics graphics, Pen lightPen, string[] txts, Font font)
        {
            int celltWidth = 0;

            var rectObjects = new[] { 
                new { rect = new RectangleF (startX , startY , celltWidth = 25, 20), txt = txts[0], alignment = StringAlignment.Far },
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  105, 20), txt = txts[1] ,alignment = StringAlignment.Near},
                new { rect = new RectangleF (startX = startX + celltWidth, startY, celltWidth =  30, 20), txt = txts[2] ,alignment = StringAlignment.Far},
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