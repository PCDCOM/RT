using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;
using System.Configuration;
using System.IO;
using System.Reflection;
using System.Web.Security;
namespace RT
{
    public partial class TodaysSalesReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (! HttpContext.Current.User.IsInRole("admin"))
            {
               
                Response.Redirect("~/Unauthorized.aspx");
            }

            if (!Page.IsPostBack)
            {
                txtFromDate.Text = DateTime.Today.AddDays(-1).ToString("dd/MM/yyyy");
                txtToDate.Text = DateTime.Today.AddDays(-1).ToString("dd/MM/yyyy");

                LoadReport();
            }
        }
     
        protected void btnViewReport_Click(object sender, EventArgs e)
        {
            LoadReport();
        }

        private void LoadReport()
        {
            rptVwrTodaysSales.Visible = true;
            rptVwrTodaysSales.LocalReport.ReportPath = string.Format(Server.MapPath(@"rdl\TodaysSalesReport.rdl"));

            SqlCommand cmd = new SqlCommand();

            DateTime dtFromDate = Convert.ToDateTime(txtFromDate.Text.ToString());
            DateTime dtToDate = Convert.ToDateTime(txtToDate.Text.ToString());

            cmd.Parameters.Add(new SqlParameter("@FromDay", dtFromDate.Day));
            cmd.Parameters.Add(new SqlParameter("@FromMonth", dtFromDate.Month));
            cmd.Parameters.Add(new SqlParameter("@FromYear", dtFromDate.Year));

            cmd.Parameters.Add(new SqlParameter("@ToDay", dtToDate.Day));
            cmd.Parameters.Add(new SqlParameter("@ToMonth", dtToDate.Month));
            cmd.Parameters.Add(new SqlParameter("@ToYear", dtToDate.Year));

            string thisConnectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            SqlConnection thisConnection = new SqlConnection(thisConnectionString);

            cmd.Connection = thisConnection;

            cmd.CommandText = "usp_getTodaysSales";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);

            System.Data.DataSet thisDataSet = new System.Data.DataSet();

            /* Put the stored procedure result into a dataset */
            da.Fill(thisDataSet);

            /* Associate thisDataSet  (now loaded with the stored 
               procedure result) with the  ReportViewer datasource */

            ReportDataSource datasource = new ReportDataSource("dtsetTodaysSales", thisDataSet.Tables[0]);
            rptVwrTodaysSales.LocalReport.DataSources.Clear();
            rptVwrTodaysSales.LocalReport.DataSources.Add(datasource);



            //if (thisDataSet.Tables[0].Rows.Count == 0)
            //{

            //}



            using (StreamReader rdlcSR = new StreamReader(Server.MapPath(@"rdl\TodaysSalesReport.rdl")))
            {
                rptVwrTodaysSales.LocalReport.LoadReportDefinition(rdlcSR);

                List<ReportParameter> lst = new List<ReportParameter>();

                ReportParameter rptParam1 = new ReportParameter("FromDay", dtFromDate.Day.ToString());
                ReportParameter rptParam2 = new ReportParameter("FromMonth", dtFromDate.Month.ToString());
                ReportParameter rptParam3 = new ReportParameter("FromYear", dtFromDate.Year.ToString());

                ReportParameter rptParam4 = new ReportParameter("ToDay", dtToDate.Day.ToString());
                ReportParameter rptParam5 = new ReportParameter("ToMonth", dtToDate.Month.ToString());
                ReportParameter rptParam6 = new ReportParameter("ToYear", dtToDate.Year.ToString());


                lst.Add(rptParam1);
                lst.Add(rptParam2);
                lst.Add(rptParam3);
                lst.Add(rptParam4);
                lst.Add(rptParam5);
                lst.Add(rptParam6);

                rptVwrTodaysSales.LocalReport.SetParameters(lst);
                rptVwrTodaysSales.LocalReport.Refresh();
            }
        }

    }
}