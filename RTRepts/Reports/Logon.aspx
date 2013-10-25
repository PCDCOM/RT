<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Logon.aspx.cs" Inherits="ReportList.Logon" MasterPageFile="~/ReportMaster.Master"%>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div>

    <asp:Login ID="Login1" runat="server" OnAuthenticate="Login1_Authenticate" 
        BackColor="#EFF3FB" BorderColor="#B5C7DE" BorderPadding="7" BorderStyle="Solid" 
        BorderWidth="1px" Font-Names="Verdana" Font-Size="1.0em" ForeColor="#333333" DisplayRememberMe="false" UserNameLabelText ="User">
        <InstructionTextStyle Font-Italic="True" ForeColor="Black" />
        <LoginButtonStyle BackColor="White" BorderColor="#507CD1" BorderStyle="Solid" 
            BorderWidth="1px" Font-Names="Verdana" Font-Size="1.0em" ForeColor="#284E98" />
        <TextBoxStyle Font-Size="1.0em" />
        <TitleTextStyle BackColor="#507CD1" Font-Bold="True" Font-Size="1.0em" 
            ForeColor="White"/>
    </asp:Login>
</div>
</asp:Content>