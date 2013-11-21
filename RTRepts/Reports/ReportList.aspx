<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportList.aspx.cs" Inherits="ReportList.ReportList" MasterPageFile="~/ReportMaster.Master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div>
    
        <h3>Report List</h3>

        <ul>
            <li>
                <asp:HyperLink ID="TodaysReport" runat="server" NavigateUrl="~/TodaysSalesReport.aspx">Todays Report</asp:HyperLink>
            </li>
            <li>
                <asp:HyperLink ID="SalesDrillDown" runat="server" NavigateUrl="~/SalesDrillDownReport.aspx">Sales DrillDown Report</asp:HyperLink>
            </li>
            <li>
                <asp:HyperLink ID="ServedByDrillDown" runat="server" NavigateUrl="~/ServedByDrillDownReport.aspx">Server By DrillDown Report</asp:HyperLink>
            </li>
             <li>
                <%--<asp:HyperLink ID="DenominatorTransaction" runat="server" NavigateUrl="~/DenominatorTransactionReport.aspx">Denominator Transaction Report</asp:HyperLink>--%>
            </li>
        </ul>
        
            
    </div>
</asp:Content>