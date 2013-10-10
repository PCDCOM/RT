<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ServedByDrillDownReport.aspx.cs" Inherits="RT.ServedByDrillDownReport" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Served By Report</title>

    <link href="Content/themes/base/jquery-ui.css" rel="stylesheet" />
<script src="Scripts/jquery.validate.min.js" type="text/javascript"></script>
<script src="Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
<script src="Scripts/jquery-ui-1.8.20.min.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        $("#<%= txtToDate.ClientID %>").datepicker({ dateFormat: 'dd/mm/yy' });
        $("#<%= txtFromDate.ClientID %>").datepicker({ dateFormat: 'dd/mm/yy' });
    });
</script>
</head>
<body>

    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <h1 align="center">Served By Report</h1>
        <table style="border-collapse:collapse; border-color:#CCCCCC; border-style:solid; border-width:1pt">
            <tr>
                <td>From Date &nbsp;</td>
                <td><asp:TextBox ID="txtFromDate" runat="server"></asp:TextBox> </td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>To Date</td>
                <td><asp:TextBox ID="txtToDate" runat="server"></asp:TextBox></td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td><asp:Button ID="btnViewReport" runat="server" OnClick="btnViewReport_Click" Text="View Report" /></td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td><asp:HyperLink ID="Home" runat="server" NavigateUrl="~/">Home</asp:HyperLink></td>
            </tr>          
        </table>

    <rsweb:ReportViewer ID="rptVwrServedByDrillDown" runat="server" Height="564px" Width="1058px"></rsweb:ReportViewer>
        
    </form>
</body>
</html>
