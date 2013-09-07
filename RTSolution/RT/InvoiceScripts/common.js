
/*** Copyrights Reserver by Rochor IT Solutions Pte Ltd **************************************************************/

function isOdd(num) { return num % 2;}



/********************************************* FINAL BILL PRINT *************************************************/
function reportprint(start,end,report)
 {
	
	var fDisplay="<html><body onload='window.opener.close();'> "; 
		 
		fDisplay+="	<table align='left' width ='300px'>";
		fDisplay+="<tr>";
		fDisplay+="<td colspan='2' width='300px' >"; //class='csInvoiceHAddress'
		fDisplay+="<p class='csCompanyName'>RESTORAN MUTHU</p>";
		fDisplay+="<p class='cksInvoiceAddress'>";
		fDisplay+="No:118, Jalan Trus,<br />";
		fDisplay+="80000 Johor Bahru.<br />";
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		fDisplay+="<strong>Date: "+day + "/" + month + "/" + year+" </strong>  ";
		//fDisplay+=day + "/" + month + "/" + year+" "+hours + ":" + minutes + " "+"<br />";
	//	fDisplay+="<strong>Start Time : "+start+"</strong>";
	//	fDisplay+="&nbsp;End Time: ";
	//	fDisplay+="<small><b> "+end+"</b></small></strong><br/>";


    fDisplay+="</p></td></tr>";
    fDisplay+="<tr>";
	fDisplay+="	<td colspan='2'>";
	fDisplay+="	<table style=' border:1px solid black; border-collapse:collapse;' width ='250px'>";
	fDisplay+="	<tr>";
	fDisplay+="	<td width='15px' style='border:1px solid black;font-size:10px; text-align:center;'>S.No </td>";
	fDisplay+="<td width='145px' colspan='2' style='border:1px solid black;font-size:10px; text-align:center;'>Bill Time </td>";
	fDisplay+="<td width='35px' style='border:1px solid black; font-size:10px; text-align:center;'>BillNo </td>";
	fDisplay+="<td width='40px' style='border:1px solid black; font-size:10px; text-align:center;'> Bill Amount </td>";
	//fDisplay+="<td with='40px' style='border:1px solid black;font-size:10px; text-align:center;'> AMT</td>";
	fDisplay+="</tr>";
 var totalamount=0;
	var dateTimeoutput;
	 var reports=[];
	 reports=eval(report);
	 var count=1;
	 var currentamount;
	for ( var i = 0; i < reports.length; i++) {
	// for ( var i = 72; i < 80; i++) {	
		//alert(i);
	    var datareport = reports[i];
	 //   alert(datareport);
	    if(datareport.totalprice!=null){
	    	dateTimeoutput=JSONDateWithTime(datareport.createdate);
	    	currentamount=datareport.totalprice;
	    	totalamount=currentamount+totalamount;
	    	//	var currentTime1 = datareport.createdate;
	    	/*alert(currentTime1);
	    	var month1 = currentTime1.getMonth() + 1;
			var day1 = currentTime1.getDate();
			var year1 = currentTime1.getFullYear();
			var hours1 = currentTime1.getHours();
			var minutes1 = currentTime1.getMinutes();*/
			/*var currentTime1 = new Date(datareport.createdate);
			var month1 = currentTime1.getMonth() + 1;
			var day1 = currentTime1.getDate();
			var year1 = currentTime1.getFullYear();
			var hours1 = currentTime1.getHours();
			var minutes1 = currentTime1.getMinutes();
			var seconds1 = currentTime1.getSeconds();
		*/	
	    	fDisplay+="<tr>";
			fDisplay+="<td width='15px' style='border:1px solid black; font-size:12px; text-align:left;'>"+count+"</td>";
			//fDisplay+="<td width='105px' style='border:1px solid black; font-size:10px; text-align:left;'>"+myDate+"</td>";
			
			fDisplay+="<td width='145px' colspan='2' style='border:1px solid black; font-size:12px; text-align:center;'>"+dateTimeoutput+"</td>";
			
		//	fDisplay+="<td width='105px' colspan='2' style='border:1px solid black; font-size:10px; text-align:left;'>"+day1 + "/" + month1 + "/" + year1+" "+hours1 + ":" + minutes1 + ":"+seconds1 +"</td>";
			fDisplay+="<td width='35px' style='border:1px solid black; font-size:12px; text-align:center;'>"+datareport.invoiceid+"</td>";
			fDisplay+="<td width='40px' style='border:1px solid black; font-size:12px; text-align:center;'>"+datareport.totalprice.toFixed(2)+"</td>";
			fDisplay+="</tr>";
			count++;
	    }
	    }
	fDisplay+="<tr>";
	fDisplay+="<td colspan='4' width='145px' style=' text-align:right;'><strong> Total : </strong><font size='3'> RM  </font></td>";
	fDisplay+="<td  width='60px' style='text-align:center;'><strong><font size='4'>"+totalamount.toFixed(2)+"</font> </strong></td>";
	fDisplay+="</tr>";

	/*var proname;
	var eachqty;
	var eachprice;
	var eachtotal=0;
	var order=0;
	var oddd;
	var a;
	var fulltotal=0;
	// transaction details
	for(a=1; a<aaa; a++){
		fDisplay+="<tr>";
		fDisplay+="<td width='15px' style='border:1px solid black; font-size:12px; text-align:left;'>"+order+"</td>";
		fDisplay+=proname;
		fDisplay+="<td width='15px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachqty+"</td>";
		fDisplay+="<td width='30px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachprice+"</td>";
		fDisplay+="<td width='40px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachtotal.toFixed(2)+"</td>";
		fDisplay+="</tr>";
	}
	fDisplay+="<tr>";
	fDisplay+="<td colspan='4' width='145px' style=' text-align:right;'><strong> Total : </strong><font size='3'> RM  </font></td>";
	fDisplay+="<td  width='60px' style='text-align:center;'><strong><font size='4'>"+fulltotal.toFixed(2)+"</font> </strong></td>";
	fDisplay+="</tr>";*/
	
	fDisplay+="	</table>";
	fDisplay+="<br />";
	fDisplay+="	<table style=' border:1px solid black; border-collapse:collapse;' width ='205px'>";
	fDisplay+="	<tr>";
	
	//fDisplay+=get_object("inputdata").innerHTML=DrawCode39Barcode(get_object("inputdata").innerHTML,0);
	fDisplay+="	</tr>";
	fDisplay+="	</table>";
	fDisplay+="</body>";
	fDisplay+="</html>";
    var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
	WindowObject.document.writeln(fDisplay);
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.print();
	WindowObject.close();
}

function JSONDateWithTime(dateStr) {
  var  jsonDate = dateStr;

    //var d = new Date(parseInt(jsonDate.substr(6)));
  var d = new Date(parseInt(jsonDate));
  
    var m, day;
    m = d.getMonth() + 1;
    if (m < 10)
        m = '0' + m;
    if (d.getDate() < 10)
        day = '0' + d.getDate();
    else
        day = d.getDate();
    var formattedDate = m + "/" + day + "/" + d.getFullYear();
    var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    var formattedTime = hours + ":" + minutes + ":" + d.getSeconds();
    formattedDate = formattedDate + " " + formattedTime;
   
    return formattedDate;
}

/********************************************* FINAL BILL PRINT *************************************************/
function billprint(orderno)

 {
	var seatdetails=document.getElementById("showSeatNo");
	var servicedBy=document.getElementById("serviceBy");
		var fDisplay="<html><body onload='window.opener.close();'> "; 
		 
		fDisplay+="	<table align='left' width ='300px'>";
		fDisplay+="<tr>";
		fDisplay+="<td colspan='2' width='300px' >"; //class='csInvoiceHAddress'
		fDisplay+="<p class='csCompanyName'>RESTORAN MUTHU</p>";
		fDisplay+="<p class='cksInvoiceAddress'>";
		fDisplay+="No:118, Jalan Trus,<br />";
		fDisplay+="80000 Johor Bahru.<br />";
		
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
		fDisplay+="<strong>Tel: 07-2214113</strong>  ";
		fDisplay+=day + "/" + month + "/" + year+" "+hours + ":" + minutes + " "+"<br />";
		fDisplay+="<strong>Bill No : "+orderno+"</strong>";
		fDisplay+="&nbsp;Service: ";
		if(servicedBy!=undefined){
		fDisplay+="<small><b> "+servicedBy.value+"</b></small></strong><br/>";
}
if(seatdetails!=undefined)
   {
		fDisplay+="<small><b> "+seatdetails.value+"</b></small></strong><br>";
   }

    fDisplay+="</p></td></tr>";
    fDisplay+="<tr>";
	fDisplay+="	<td colspan='2'>";
	fDisplay+="	<table style=' border:1px solid black; border-collapse:collapse;' width ='205px'>";
	fDisplay+="	<tr>";
	fDisplay+="	<td width='15px' style='border:1px solid black; font-size:10px; text-align:center;'> No </td>";
	fDisplay+="<td width='105px' style='border:1px solid black;font-size:10px; text-align:center;'> Item </td>";
	fDisplay+="<td width='15px' style='border:1px solid black; font-size:10px; text-align:center;'>Qy </td>";
	fDisplay+="<td width='30px' style='border:1px solid black; font-size:10px; text-align:center;'> RM </td>";
	fDisplay+="<td with='40px' style='border:1px solid black;font-size:10px; text-align:center;'> AMT</td>";
	fDisplay+="</tr>";
	var aaa = $('table#dataTable tr').length;
	var proname;
	var eachqty;
	var eachprice;
	var eachtotal=0;
	var order=0;
	var oddd;
	var a;
	var fulltotal=0;
	for(a=1; a<aaa; a++){
	 order=a;
	 proname = document.getElementById('nameid'+order).value;
	 eachqty=document.getElementById('qtyid'+order).value;
	 eachprice=document.getElementById('unitid'+order).value;
	 eachtotal=parseFloat(eachqty)*parseFloat(eachprice);
	 fulltotal = parseFloat(fulltotal)+parseFloat(eachtotal);
	 oddd=document.getElementById('saleorderid'+order);
	 parcel=document.getElementById('parcelid'+order).checked;
		// alert(parcel);
		 if(parcel){
			 parcel = ' (P)';
		 }else{
			 parcel = '';
		 }
		 if(oddd!=undefined){
     			 //proname=proname+" ***";
				proname="<td width='105px' style='border:1px solid black; font-size:10px; text-align:left;'>"+proname + parcel +"</td>";
			}else{
				proname="<td width='105px' style='border:1px solid black; font-size:10px; text-align:left;'>"+proname + parcel +"</td>";
			}

	 
	fDisplay+="<tr>";
	fDisplay+="<td width='15px' style='border:1px solid black; font-size:12px; text-align:left;'>"+order+"</td>";
	fDisplay+=proname;
	fDisplay+="<td width='15px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachqty+"</td>";
	fDisplay+="<td width='30px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachprice+"</td>";
	fDisplay+="<td width='40px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachtotal.toFixed(2)+"</td>";
	fDisplay+="</tr>";
	}
	fDisplay+="<tr>";
	fDisplay+="<td colspan='4' width='145px' style=' text-align:right;'><strong> Total : </strong><font size='3'> RM  </font></td>";
	fDisplay+="<td  width='60px' style='text-align:center;'><strong><font size='4'>"+fulltotal.toFixed(2)+"</font> </strong></td>";
	fDisplay+="</tr>";
	
	fDisplay+="	</table>";
	fDisplay+="<br />";
	fDisplay+="	<table style=' border:1px solid black; border-collapse:collapse;' width ='205px'>";
	fDisplay+="	<tr>";
	
	//fDisplay+=get_object("inputdata").innerHTML=DrawCode39Barcode(get_object("inputdata").innerHTML,0);
	fDisplay+="	</tr>";
	fDisplay+="	</table>";
	  // $("#barcodeValue").val=orderno;
	 //  alert($("#barcodeValue").val);
	   generateBarcode(orderno);
	//alert(document.getElementById("barcodeTarget"));
	fDisplay+="<div style='width:"+document.getElementById("barcodeTarget").style.width+";'>"+document.getElementById("barcodeTarget").innerHTML + "</div>";
	//alert(document.getElementById("barcodeTarget").style.width);
	fDisplay+="</body>";
	fDisplay+="</html>";
    var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
	WindowObject.document.writeln(fDisplay);
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.print();
	WindowObject.close();
}


function billprintFinal(orderno,barcodeoption)
{
	var seatdetails=document.getElementById("showSeatNo");
	var servicedBy=document.getElementById("serviceBy");
		var fDisplay="<html><body onload='window.opener.close();'> "; 
		 
		fDisplay+="	<table align='left' width ='300px'>";
		fDisplay+="<tr>";
		fDisplay+="<td colspan='2' width='300px' >"; //class='csInvoiceHAddress'
		fDisplay+="<p class='csCompanyName'>RESTORAN MUTHU</p>";
		fDisplay+="<p class='cksInvoiceAddress'>";
		fDisplay+="No:118, Jalan Trus,<br />";
		fDisplay+="80000 Johor Bahru.<br />";
		
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
		fDisplay+="<strong>Tel: 07-2214113</strong>  ";
		fDisplay+=day + "/" + month + "/" + year+" "+hours + ":" + minutes + " "+"<br />";
		fDisplay+="<strong>Bill No : "+orderno+"</strong>";
		fDisplay+="&nbsp;Service: ";
		if(servicedBy!=undefined){
		fDisplay+="<small><b> "+servicedBy.value+"</b></small></strong><br/>";
}
if(seatdetails!=undefined)
  {
		fDisplay+="<small><b> "+seatdetails.value+"</b></small></strong><br>";
  }

   fDisplay+="</p></td></tr>";
   fDisplay+="<tr>";
	fDisplay+="	<td colspan='2'>";
	fDisplay+="	<table style=' border:1px solid black; border-collapse:collapse;' width ='205px'>";
	fDisplay+="	<tr>";
	fDisplay+="	<td width='15px' style='border:1px solid black; font-size:10px; text-align:center;'> No </td>";
	fDisplay+="<td width='105px' style='border:1px solid black;font-size:10px; text-align:center;'> Item </td>";
	fDisplay+="<td width='15px' style='border:1px solid black; font-size:10px; text-align:center;'>Qy </td>";
	fDisplay+="<td width='30px' style='border:1px solid black; font-size:10px; text-align:center;'> RM </td>";
	fDisplay+="<td with='40px' style='border:1px solid black;font-size:10px; text-align:center;'> AMT</td>";
	fDisplay+="</tr>";
	var aaa = $('table#dataTable tr').length;
	var proname;
	var eachqty;
	var eachprice;
	var eachtotal=0;
	var order=0;
	var oddd;
	var a;
	var fulltotal=0;
	for(a=1; a<aaa; a++){
	 order=a;
	 proname = document.getElementById('nameid'+order).value;
	 eachqty=document.getElementById('qtyid'+order).value;
	 eachprice=document.getElementById('unitid'+order).value;
	 eachtotal=parseFloat(eachqty)*parseFloat(eachprice);
	 fulltotal = parseFloat(fulltotal)+parseFloat(eachtotal);
	 oddd=document.getElementById('saleorderid'+order);
	 parcel=document.getElementById('parcelid'+order).checked;
		// alert(parcel);
		 if(parcel){
			 parcel = ' (P)';
		 }else{
			 parcel = '';
		 }
		 if(oddd!=undefined){
    			 //proname=proname+" ***";
				proname="<td width='105px' style='border:1px solid black; font-size:10px; text-align:left;'>"+proname + parcel +"</td>";
			}else{
				proname="<td width='105px' style='border:1px solid black; font-size:10px; text-align:left;'>"+proname + parcel +"</td>";
			}

	 
	fDisplay+="<tr>";
	fDisplay+="<td width='15px' style='border:1px solid black; font-size:12px; text-align:left;'>"+order+"</td>";
	fDisplay+=proname;
	fDisplay+="<td width='15px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachqty+"</td>";
	fDisplay+="<td width='30px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachprice+"</td>";
	fDisplay+="<td width='40px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachtotal.toFixed(2)+"</td>";
	fDisplay+="</tr>";
	}
	fDisplay+="<tr>";
	fDisplay+="<td colspan='4' width='145px' style=' text-align:right;'><strong> Total : </strong><font size='3'> RM  </font></td>";
	fDisplay+="<td  width='60px' style='text-align:center;'><strong><font size='4'>"+fulltotal.toFixed(2)+"</font> </strong></td>";
	fDisplay+="</tr>";
	
	fDisplay+="	</table>";
	fDisplay+="<br />";
	fDisplay+="	<table style=' border:1px solid black; border-collapse:collapse;' width ='205px'>";
	fDisplay+="	<tr>";
	
	//fDisplay+=get_object("inputdata").innerHTML=DrawCode39Barcode(get_object("inputdata").innerHTML,0);
	fDisplay+="	</tr>";
	fDisplay+="	</table>";
	  // $("#barcodeValue").val=orderno;
	 //  alert($("#barcodeValue").val);
	//   generateBarcode(orderno);
	//alert(document.getElementById("barcodeTarget"));
	//fDisplay+="<div style='width:"+document.getElementById("barcodeTarget").style.width+";'>"+document.getElementById("barcodeTarget").innerHTML + "</div>";
	//alert(document.getElementById("barcodeTarget").style.width);
	fDisplay+="</body>";
	fDisplay+="</html>";
   var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
	WindowObject.document.writeln(fDisplay);
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.print();
	WindowObject.close();
}
function generateBarcode(value){
	  
	 //STEP : 1 getting barcode value 
//  var value = $("#barcodeValue").val();
  
// STEP 2 : Select barcode type
  var btype = $("#code128").val();

// STEP : 4 Format
  var renderer = $("input[name=renderer]:checked").val();
  
// STEP : 3 MISC 
	var quietZone = false;
  if ($("#quietzone").is(':checked') || $("#quietzone").attr('checked')){
    quietZone = true;
  }
	
  
  // declaration part
  var settings = {
    output:renderer,
    bgColor: $("#bgColor").val(),
    color: $("#color").val(),
    barWidth: $("#barWidth").val(),
    barHeight: $("#barHeight").val(),
    moduleSize: $("#moduleSize").val(),
    posX: $("#posX").val(),
    posY: $("#posY").val(),
    addQuietZone: $("#quietZoneSize").val()
  };
  
  if ($("#rectangular").is(':checked') || $("#rectangular").attr('checked')){
    value = {code:value, rect: true};
  }
  if (renderer == 'canvas'){
    clearCanvas();
    $("#barcodeTarget").hide();
    $("#canvasTarget").show().barcode(value, btype, settings);          
  
  } else {
    $("#canvasTarget").hide();
    $("#barcodeTarget").html("").show().barcode(value, btype, settings);
   
  }
}
    
function showConfig1D(){
  $('.config .barcode1D').show();
  $('.config .barcode2D').hide();
 
}

function showConfig2D(){
  $('.config .barcode1D').hide();
  $('.config .barcode2D').show();
}

function clearCanvas(){
  var canvas = $('#canvasTarget').get(0);
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;
  ctx.lineCap = 'butt';
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle  = '#000000';
  ctx.clearRect (0, 0, canvas.width, canvas.height);
  ctx.strokeRect (0, 0, canvas.width, canvas.height);
}

$(function(){
  $('input[name=btype]').click(function(){
    if ($(this).attr('id') == 'datamatrix') showConfig2D(); else showConfig1D();
  });
  $('input[name=renderer]').click(function(){
    if ($(this).attr('id') == 'canvas') $('#miscCanvas').show(); else $('#miscCanvas').hide();
  });
  if($("#barcodeTarget").length){
	  generateBarcode();
  }

 
});

function get_object(id) {
	// alert("object 111111:::::"+id);
	   var object = null;
	   if (document.layers) {
	    object = document.layers[id];
	   } else if (document.all) {
	    object = document.all[id];
	   } else if (document.getElementById) {
	    object = document.getElementById(id);
	   }
	  // alert("object 22222222222:::::"+object.value);
	   return object;
	  }
	

/*************************************** ORDER PRINT without prices *********************************************/
function orderprint(orderno){
	//var seatdetails=document.getElementById("seatno");
	
	var seatdetails=document.getElementById("showSeatNo");
	var servicedBy=document.getElementById("serviceBy");
	var fDisplay="<html><body onload='window.opener.close();'> "; 
  	// orderno=currentInvoiceNo;
fDisplay+="	<table align='left' width ='300px'>";
fDisplay+="<tr>";
fDisplay+="<td  colspan='2' width='300px' >"; //class='csInvoiceHAddress'
fDisplay+="<p class='csCompanyName'>RESTORAN MUTHU</p>";
var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate(); 
var year = currentTime.getFullYear();
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
fDisplay+="<strong>Tel: 07-2214113</strong><br />  ";
fDisplay+=day + "/" + month + "/" + year+" "+hours + ":" + minutes + " "+"<br />";
fDisplay+="<strong>Bill No : "+orderno+"</strong>";
fDisplay+="&nbsp;Service:";
if(servicedBy!=undefined){
fDisplay+="<small><b> "+servicedBy.value+"</b></small></strong><br/>";
}
if(seatdetails!=undefined){
fDisplay+="<small><b> "+seatdetails.value+"</b></small><br>";
}


fDisplay+="</p></td></tr>";

fDisplay+="<tr>";
	fDisplay+="	<td colspan='2'>";
	fDisplay+="	<table style=' border:1px solid black; border-collapse:collapse;' width ='205px'>";
	fDisplay+="	<tr>";
	fDisplay+="	<td width='15px' style='border:1px solid black; font-size:10px; text-align:center;'> No </td>";
	fDisplay+="<td width='105px'colspan='2'  style='border:1px solid black;font-size:10px; text-align:center;'> Item </td>";
	fDisplay+="<td width='15px' colspan='2' style='border:1px solid black; font-size:10px; text-align:center;'>Qy </td>";
	fDisplay+="</tr>";
	var tableLength = $('table#dataTable tr').length;
	
	var proname;
	var eachqty;
	var order=0;
	var oddd;
	for(var indexa=1; indexa<tableLength; indexa++){
	 order=indexa;
	 proname = document.getElementById('nameid'+order).value;
	 eachqty=document.getElementById('qtyid'+order).value;
	 oddd=document.getElementById('saleorderid'+order);
	 parcel=document.getElementById('parcelid'+order).checked;
	// alert(parcel);
	 if(parcel){
		 parcel = ' (P)';
	 }else{
		 parcel = '';
	 }
	if(oddd!=undefined){
	 //proname=proname+" ***";
		proname="<td width='105px'colspan='2' style='border:1px solid black; font-size:10px; text-decoration:line-through; text-align:left;'>"+proname + parcel +"</td>";
	}else{
		proname="<td width='105px'colspan='2' style='border:1px solid black; font-size:10px; text-align:left;'>"+proname + parcel +"</td>";
	}
	fDisplay+="<tr>";
	fDisplay+="<td width='15px' style='border:1px solid black; font-size:12px; text-align:left;'>"+order+"</td>";
	fDisplay+=proname;
	fDisplay+="<td width='15px' colspan='2' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachqty+"</td>";
	fDisplay+="</tr>";
	}
	fDisplay+="	</table>";
	
	fDisplay+="</body>";
	fDisplay+="</html>";
    var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
	WindowObject.document.writeln(fDisplay);
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.print();
	WindowObject.close();

}


/******************************************** LOAD ALL THE SEATS with SELECTION OPTION***************************/
/*********************************** show seating for diamond quandrant ****************************************/
   function seatArrangmentSet(){
	   showArrangements({
			rows: 2,
			cols: 4,
			placeId: 1, //place id should be uique
			tablePrefix:'Table',
			tableName: 'A',
			column: 'left',
			groupId : 'holder1'
		});
		showArrangements({
				rows: 2,
				cols: 2,
				placeId: 6,
				tablePrefix:'Table',
				tableName: 'F',
				column: 'right',
				groupId : 'holder1'
			}); 
		showArrangements({
			rows: 2,
			cols: 4,
			placeId: 2,
			tablePrefix:'Table',
			tableName: 'B',
			column: 'left',
			groupId : 'holder1'
		});
		 showArrangements({
				rows: 2,
				cols: 2,
				placeId: 7,
				tablePrefix:'Table',
				tableName: 'G',
				column: 'right',
				groupId : 'holder1'
			}); 
		showArrangements({
			rows: 2,
			cols: 4,
			placeId: 3,
			tablePrefix:'Table',
			tableName: 'C',
			column: 'left',
			groupId : 'holder1'
		
		});
		 showArrangements({
				rows: 2,
				cols: 2,
				placeId: 8,
				tablePrefix:'Table',
				tableName: 'H',
				column: 'right',
				groupId : 'holder1'
			}); 
	
	   showArrangements({
			rows: 2,
			cols: 4,
			placeId: 4,
			tablePrefix:'Table',
			tableName: 'D',
			column: 'left',
			groupId : 'holder1'
		});
		 showArrangements({
				rows: 2,
				cols: 2,
				placeId: 9,
				tablePrefix:'Table',
				tableName: 'I',
				column: 'right',
				groupId : 'holder1'
			}); 
		 showArrangements({
			rows: 2,
			cols: 4,
			placeId: 5,
			tablePrefix:'Table',
			tableName: 'E',
			column: 'left',
			groupId : 'holder1'
		});		
	};
	
	function seatArrangmentSetB(){
		showArrangements({
				rows: 2,
				cols: 2,
				placeId: 10, //place id should be unique
				tablePrefix:'Table',
				tableName: 'J',
				column: 'left',
				groupId : 'holder2'
			});
		showArrangements({
					rows: 2,
					cols: 2,
					placeId: 11,
					tablePrefix:'Table',
					tableName: 'N',
					column: 'right',
					groupId : 'holder2'
				}); 
		showArrangements({
				rows: 2,
				cols: 2,
				placeId: 12,
				tablePrefix:'Table',
				tableName: 'K',
				column: 'left',
				groupId : 'holder2'
			});
		showArrangements({
					rows: 2,
					cols: 2,
					placeId: 13,
					tablePrefix:'Table',
					tableName: 'O',
					column: 'right',
					groupId : 'holder2'
				}); 
		showArrangements({
				rows: 2,
				cols: 2,
				placeId: 14,
				tablePrefix:'Table',
				tableName: 'L',
				column: 'left',
				groupId : 'holder2'
			
			});
		showArrangements({
					rows: 2,
					cols: 2,
					placeId: 15,
					tablePrefix:'Table',
					tableName: 'P',
					column: 'right',
					groupId : 'holder2'
				}); 
		
		showArrangements({
				rows: 2,
				cols: 2,
				placeId: 16,
				tablePrefix:'Table',
				tableName: 'M',
				column: 'left',
				groupId : 'holder2'
			});
		showArrangements({
					rows: 2,
					cols: 2,
					placeId: 17,
					tablePrefix:'Table',
					tableName: 'Q',
					column: 'right',
					groupId : 'holder2'
				}); 
			
		};
		
	
		
		function seatArrangmentSetC(){
			showArrangements({
					rows: 2,
					cols: 4,
					placeId: 18, //place id should be unique
					tablePrefix:'Table',
					tableName: 'R',
					column: 'left',
					groupId : 'holder3'
				});
			showArrangements({
						rows: 2,
						cols: 4,
						placeId: 19,
						tablePrefix:'Table',
						tableName: 'V',
						column: 'right',
						groupId : 'holder3'
					}); 
			showArrangements({
					rows: 2,
					cols: 4,
					placeId: 20,
					tablePrefix:'Table',
					tableName: 'S',
					column: 'left',
					groupId : 'holder3'
				});
			showArrangements({
						rows: 2,
						cols: 4,
						placeId: 21,
						tablePrefix:'Table',
						tableName: 'W',
						column: 'right',
						groupId : 'holder3'
					}); 
			showArrangements({
					rows: 2,
					cols: 4,
					placeId: 22,
					tablePrefix:'Table',
					tableName: 'T',
					column: 'left',
					groupId : 'holder3'
				
				});
			showArrangements({
						rows: 2,
						cols: 4,
						placeId: 23,
						tablePrefix:'Table',
						tableName: 'X',
						column: 'right',
						groupId : 'holder3'
					}); 
			
			showArrangements({
					rows: 2,
					cols: 4,
					placeId: 24,
					tablePrefix:'Table',
					tableName: 'U',
					column: 'left',
					groupId : 'holder3'
				});
			showArrangements({
						rows: 2,
						cols: 4,
						placeId: 25,
						tablePrefix:'Table',
						tableName: 'Y',
						column: 'right',
						groupId : 'holder3'
					}); 
				
			};





/************** print invoice ****************/
function printInvoice(orderno,saleorders){
	var fDisplay="";
	fDisplay+="	<table align='left' width ='300px'>";
	fDisplay+="<tr>";
	fDisplay+="<td colspan='2' width='300px' >"; //class='csInvoiceHAddress'
	fDisplay+="<p class='csCompanyName'>RESTORAN MUTHU</p>";
	fDisplay+="<p class='csInvoiceAddress'>";
	fDisplay+="No:118, Jalan Trus,<br />";
	fDisplay+="80000 Johor Bahru.<br />";
	fDisplay+="<strong>Tel: 07-2214113</strong><br />";
	fDisplay+="<br />";
	fDisplay+="<strong>Bill No : "+orderno+"</strong><br />";
	fDisplay+="</p></td></tr>";
	fDisplay+="<tr>";

	fDisplay+="	<td colspan='2'>";
	fDisplay+="	<table style=' border:1px solid black; border-collapse:collapse;' width ='205px'>";
	fDisplay+="	<tr>";
	fDisplay+="	<td width='15px' style='border:1px solid black; font-size:10px; text-align:center;'> No </td>";
	fDisplay+="<td width='105px' style='border:1px solid black;font-size:10px; text-align:center;'> Item </td>";
	fDisplay+="<td width='15px' style='border:1px solid black; font-size:10px; text-align:center;'>Qy </td>";
	fDisplay+="<td width='30px' style='border:1px solid black; font-size:10px; text-align:center;'> RM </td>";
	fDisplay+="<td with='40px' style='border:1px solid black;font-size:10px; text-align:center;'> AMT</td>";
	fDisplay+="</tr>";
	
	
	// sale orders  start 
	var saleordersdata = saleorders.split("#");
    var eachorder;
    var total=0;
    var index=0;
    var rowtotal=0;
	for(var i = 0; i < saleordersdata.length; i++){
		if(saleordersdata[i]!=undefined){
		eachorder=saleordersdata[i].split("*");
		if(eachorder!=undefined && eachorder[0]!=undefined && eachorder[1]!=undefined && eachorder[2]!=undefined && eachorder[3]){
		index=i+1;
		rowtotal=parseFloat(eachorder[1])*parseFloat(eachorder[2]);
		total = parseFloat(total)+parseFloat(rowtotal);

		fDisplay+="<tr>";
		fDisplay+="<td width='15px' style='border:1px solid black; font-size:12px; text-align:left;'>"+index+"</td>";
		fDisplay+="<td width='105px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachorder[0]+"</td>";
		fDisplay+="<td width='15px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachorder[1]+"</td>";
		fDisplay+="<td width='30px' style='border:1px solid black; font-size:10px; text-align:left;'>"+eachorder[2]+"</td>";
		fDisplay+="<td width='40px' style='border:1px solid black; font-size:10px; text-align:left;'>"+rowtotal.toFixed(2)+"</td>";
		fDisplay+="</tr>";
		}
		
		}
	}
	// sale orders end
		fDisplay+="<tr>";
		fDisplay+="<td colspan='4' width='165px' style=' text-align:right;'><strong> Total : RM </strong></td>";
		fDisplay+="<td  width='40px' style='text-align:left;'><strong>"+total.toFixed(2)+" </strong></td>";
		fDisplay+="</tr>";
		fDisplay+="	</table>";
		fDisplay+="<br />";
		
	
//	////////alert("table data"+fDisplay);
	return fDisplay;
}
/************************************************************************** AUTO COMPLETE *****************************************************/


/***********************BARCODE SCANNER***************************/
function searchByEnterKey(e) {
	var characterCode;
		if(e && e.which){ // NN4 specific code
		e = e;
		characterCode = e.which;
		}
		else {
		e = event;
		characterCode = e.keyCode; // IE specific code
		}
		if (characterCode == 13) {
			var textvalue=document.getElementById("prodnameid").value;
			checkwithbarcode(textvalue);
			//addNewDataRow(productName, unitPrice,parcelPrice,productId);
			//checkProductWithBarcode(textvalue);
			document.getElementById("prodnameid").value="";
			document.getElementById("prodnameid").focus();
			return true;
		}// Enter key is 13
		else {
			return false;
		}
		
	}
// ******************************* sacn invoice bill ************************************************************************************/
function searchByInvoiceIDEnterKey(e)
{
	
	var characterCode;
	if(e && e.which){ // NN4 specific code
	e = e;
	characterCode = e.which;
	}
	else {
	e = event;
	characterCode = e.keyCode; // IE specific code
	}
	if (characterCode == 13) {
		var textvalue=document.getElementById("invoicereorderID").value;
		//alert("before"+textvalue);
		
		loadOrderDetails(textvalue);
		//alert("after"+textvalue);
		//checkwithbarcode(textvalue);
		//addNewDataRow(productName, unitPrice,parcelPrice,productId);
		//checkProductWithBarcode(textvalue);
		document.getElementById("invoicereorderID").value="";
		//document.getElementById("invoicereorderID").focus();
		//alert( document.getElementById("payingamount"));
	    document.getElementById("payingamount").focus();

		return true;
	}// Enter key is 13
	else {
		return false;
	}


}




var cashierbillprint=false;
function placeBillEntered() {
	var tablesetup;
	var responsedata;
	var data;
	var printcurrentinvoiceNo;
	var neworder = true;
	var takeaway;
	var validateid = $('table#dataTable tr').length;// this code is for
												// validation with out
													// products order pay
	if (validateid <= 1) {
		return false;
	}
	if (billNo != undefined && billNo != "") {
		//billprint(billNo);
		neworder = false;
	}
	var queryString = $('#invoiceForm').serialize();
	printcurrentinvoiceNo = invoice_bill_no;
	document.getElementById("invoice_bill_no").value = printcurrentinvoiceNo;
	$.ajax({
				type : "POST",
				url : "addviewinvoice.htm?action=CLOSED&payaction=CLOSED&invoiceID="
						+ billNo,
				data : queryString,
				success : function(responseoutput) {
					
					$('.csChkAll').removeAttr('checked');
					$('#totalamt, #paidamount').val('');
				
					firstorder = 0;
					responsedata = responseoutput.split("@");
					data = responsedata[0];
					tablesetup = responsedata[1];
									
					// setBookedSeats(tablesetup);

					billNo = data;
					$('#inputdata').val(billNo);
					var barcodeoptions='rq';
					if (cashierbillprint) {
						billprintFinal(billNo,barcodeoptions);
					}
					//}
					deletePaidRecord(billNo);
					billNo = "";
					removeAll();
					//removeOldOrderAddNewOrder(data);
					// need to investigate
					nextInvoiceNo = data;
					
					// location.reload(true);
					takeaway = '<label id="takeaway"><font size="2">Take Away</font></label>';
				/*	$('.csSelectAllTable').removeAttr('checked');
					$('#payingamount').val("");
					 document.getElementById("invoicereorderID").focus();
					 $('input#paystatus2').attr("checked",true);
					//collapseOthers(8, 10);
*/					$("#takeawayTd").html(takeaway);
$('#payingamount').val("");
$('#invoicereorderID').focus();
cashierbillprint=false;
					return false;
				}
			});
	billNo = "";

}
function deletePaidRecord(rowId) {
   //  alert(rowId);
	var $row = $('#row_' + rowId);
	$row.closest("tr").remove();
	
	$('#href_' + rowId).remove();
	
}
function setBalance() {
	var totalamount = $('#totalamt').val();
	var amountpaid = $('#payingamount').val();
	//////////////////alert("totalamount"+totalamount);
	//////////////////alert("amountpaid"+amountpaid);
	var balanceAmount = parseFloat(amountpaid) - parseFloat(totalamount);
//	////////////////alert("balanceAmount"+balanceAmount);
	$('#balanceamt').val(balanceAmount.toFixed(2));
			
	if(balanceAmount>=0)
	{		
		$('input#paystatus1').attr("checked",true);
	}
	else if(balanceAmount<=0)
	{
		$('input#paystatus2').attr("checked",true);
	}
	//$("#id_of_button").trigger("click");
	
}
function isNumberData(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**********************     Moved from addinvoice.js to common.js      ****************************/
/**
 * *********************************************************** FINAL BILL PRINT
 * *******************************
 */
function placeBill() {
	
	var tablesetup;
	var responsedata;
	var data;
	var printcurrentinvoiceNo;
	var neworder = true;
	var takeaway;
	var validateid = $('table#dataTable tr').length;// this code is for
													// validation with out
													// products order pay
	if (validateid <= 1) {
		return false;
	}
	if (billNo != undefined && billNo != "") {
		//billprint(billNo);
		neworder = false;
	}
	var queryString = $('#invoiceForm').serialize();
	printcurrentinvoiceNo = invoice_bill_no;
	document.getElementById("invoice_bill_no").value = printcurrentinvoiceNo;
	billNo=printcurrentinvoiceNo;
	//alert("billNo:::::::::"+billNo);
	var totalamt=$('#totalamt').val;
	if(totalamt!=undefined && totalamt!=0.0){
	$.ajax({
				type : "POST",
				url : "addviewinvoice.htm?payaction=unpaid&action=READYTOPAY&invoiceID="
						+ billNo,
	
				data : queryString,
				success : function(responseoutput) {
					
			//	alert("billNo::::::::::"+responseoutput);
				//	  alert("totalamt::::::::::"+$("#totalamt").val());
					$('.csChkAll').removeAttr('checked');
					$('#totalamt, #paidamount').val('');

					firstorder = 0;
					responsedata = responseoutput.split("@");
					data = responsedata[0];
					tablesetup = responsedata[1];
									
					// setBookedSeats(tablesetup);
if(!isNumberData(data)){
alert("data is Not Value");
}

					billNo = data;
					/*if(data==0 || data=""){
					return ;
					}*/
					//alert("billNoafter bkened:::::::::"+billNo);
					$('#inputdata').val(data);
					removeCurrentPaidSeat(data);
					
					//alert("Barcode :: "+$('#inputdata').val(billNo));
					// Done now
					 $("#inputdata").html(data);
					
					//if (neworder) {
					if(data!=undefined || data!=0){
						billprint(data);
					} else{
					return ;
					}
					//}
					data="";
					billNo = "";
					removeAll();
					removeOldOrderAddNewOrder(data);
					// need to investigate
					nextInvoiceNo = data;
					/*
					 * if(data && (data > reorderLink)){ if(availLink == 4){
					 * $('a:last',$container).remove(); } nextInvoiceNo=data;
					 * //data = data-1; $container.prepend('<a
					 * href="javascript:loadOrderDetails(\''+data+'\')">'+data+'</a>');
					 * currentInvoiceNo=data; }
					 */
					// location.reload(true);
					takeaway = '<label id="takeaway"><font size="2">Take Away</font></label>';
					$('.csSelectAllTable').removeAttr('checked');
					$('#payingamount').val("");
					 document.getElementById("invoicereorderID").focus();
					 $('input#paystatus2').attr("checked",true);
					setFloor();
					$("#takeawayTd").html(takeaway);

					return false;
				}
			});
	}
	billNo = "";

}

function placeBillParcel() {
	var tablesetup;
	var responsedata;
	var data;
	var printcurrentinvoiceNo;
	var neworder = true;
	var takeaway;
	var validateid = $('table#dataTable tr').length;// this code is for
													// validation with out
													// products order pay
	if (validateid <= 1) {
		return false;
	}
	if (billNo != undefined && billNo != "") {
		//billprint(billNo);
		neworder = false;
	}
	var queryString = $('#invoiceForm').serialize();
	printcurrentinvoiceNo = invoice_bill_no;
	document.getElementById("invoice_bill_no").value = printcurrentinvoiceNo;
	var totalamt=$('#totalamt').val;
	if(totalamt!=undefined && totalamt!=0.0){
{
	$.ajax({
				type : "POST",
				url : "addviewinvoice.htm?action=READYTOPAY&invoiceID="
						+ billNo,
				data : queryString,
				success : function(responseoutput) {
					$('.csChkAll').removeAttr('checked');
					$('#totalamt, #paidamount').val('');

					firstorder = 0;
					responsedata = responseoutput.split("@");
					data = responsedata[0];
					tablesetup = responsedata[1];
									
					// setBookedSeats(tablesetup);

					billNo = data;
					$('#inputdata').val(billNo);
					removeCurrentPaidSeat(data);
					//alert("Barcode :: "+$('#inputdata').val(billNo));
					// Done now
					 $("#inputdata").html(billNo);
					//if (neworder) {
					if(billNo!=undefined && billNo!=0){
						billprint(billNo);
						}else{
							return ;
						}
				//	}
					billNo = "";
					removeAll();
					removeOldOrderAddNewOrder(data);
					// need to investigate
					nextInvoiceNo = data;
				
					takeaway = '<label id="takeaway"><font size="2">Take Away</font></label>';
					$('.csSelectAllTable').removeAttr('checked');
					$('#payingamount').val("");
					 document.getElementById("invoicereorderID").focus();
					 $('input#paystatus2').attr("checked",true);
					 
					collapseOthers(1, 9);
					$("#takeawayTd").html(takeaway);
					
					$('#parceloptionID').attr("checked",true);
					return false;
				}
			});
}
	billNo = "";

}





function finalplaceBill(){
	 var printcurrentinvoiceNo;
	 
	   var queryString = $('#invoiceForm').serialize();
	   printcurrentinvoiceNo=invoice_bill_no;
	   document.getElementById("invoice_bill_no").value=printcurrentinvoiceNo;
		  $.ajax({  
	    	  type: "POST",  
	    	  url: "addviewinvoice.htm?action=Pay&invoiceID="+printcurrentinvoiceNo,  
	    	  data: queryString,  
	    	  success: function(responseoutput) {  
	        	$('.csChkAll').removeAttr('checked');
	        	$('#totalamt, #paidamount').val('');
	        	alert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+printcurrentinvoiceNo);
	            // billprint(printcurrentinvoiceNo);
	        	 billNo="";
	             removeAll();
	             removeOldOrderAddNewOrder(printcurrentinvoiceNo);
	             document.getElementById("payingamount").value="";
	             document.getElementById("balanceamt").value="";
		            
	             document.getElementById("invoicereorderID").focus();
	             
	             
	               	return false;
	    	  }
	          });
	        billNo="";
	       
	     }




//$(document).ready(function()
function checkwithbarcode(productvalue)
		{
	var productavailable=false;
	
		  $.ajax({
		    type: "GET",
		    url:  "productdata.xml",
		    dataType: "xml",
		   // success: parseXml
		    success: function(xml){
		    		    $(xml).find('product').each(function(){
		    		    	 var productId = $(this).find('productid').text();
		    			    // var productName = $(this).find('productname').text();				    
		    				// var unitPrice = $(this).find('sellprice1').text();
		    				  var productName = $(this).find('name').text();				    
			    			//  var unitPrice = $(this).find('groupA').text();
		    				  var unitPrice = $(this).find('unitprice').text();
			    			  var parcelPrice =unitPrice;
		    				 if(productvalue==productId){
		    				 productValues=productName+","+unitPrice+","+parcelPrice;
		    				 addRowRecord(productValues,productId);
		    					addNewDataRowQuantity(productName, unitPrice,productId,quantity,index,parcelPrice);
		    					productavailable=true;
		    				 }
		  });
		
		  if(!productavailable){
	    		alert("No one Products Availabled here ");
				return false;
	    	}
		    }
	});
}
		
function parseXml(xml)
{

	var barcodeValue=document.getElementById("prodnameid").value;
      alert("aaaaaaannnnnnnnnaaaaa"+xml);		
	$(xmldata).find('products').each(function(){
     	 alert("Enterrrrraaaaaaaaaaaaaaaaaaaaaaaaarrrrrrrr");
	 	 var quantity=1;
	 	 var productId = $(this).find('productid').text();
	     var productName = $(this).find('productname').text();				    
		 var unitPrice = $(this).find('sellprice1').text();
		 var parcelPrice = $(this).find('sellprice2').text();
		 var barcode = $(this).find('barcode').text();
		 //alert("Values : "+productId+","+productName+","+unitPrice+","+parcelPrice+","+barcode);
		 if(barcodeValue==barcode){
			// alert("EXIST");
		 productValues=productName+","+unitPrice+","+parcelPrice;
		 addRowRecord(productValues,productId);
			// addNewDataRowQuantity(productName, unitPrice,productId,quantity,index,parcelPrice);
		 }else{
			alert("No one Products Availabled here ");
		 }
		
	   });


}


function checkProductWithBarcode(barcodeValue){
	
	//var barcodeValue=document.getElementById("barcodeReader").value;
	//alert("barcodeValue ::::"+barcodeValue);
	var productValues;
	var productavailable=false;
	$.ajax({
        type: "POST",
        url: "findbarcode.htm?barcodeValue="+barcodeValue,
        data: "&barcode="+barcodeValue,
        success: function(xmldata){
        	//alert("SUCCESS"+xmldata);
        	//var index=0;
        	$(xmldata).find('product').each(function(){
        	
			 	 // index++;
			 	 alert("Enterrrrrrrrrrrrr");
			 	 var quantity=1;
			 	 var productId = $(this).find('productID').text();
			     var productName = $(this).find('productname').text();				    
				 var unitPrice = $(this).find('sellprice1').text();
				 var parcelPrice = $(this).find('sellprice2').text();
				 var barcode = $(this).find('barcode').text();
				 //alert("Values : "+productId+","+productName+","+unitPrice+","+parcelPrice+","+barcode);
				 if(barcodeValue==barcode){
				 productValues=productName+","+unitPrice+","+parcelPrice;
				 addRowRecord(productValues,productId);
				 productavailable=true;
					// addNewDataRowQuantity(productName, unitPrice,productId,quantity,index,parcelPrice);
				 /*}else{
					alert("No one Products Availabled here ");
				 }*/
				 }
			   });
        	
        },
        error: function() {
        alert("An error occurred while processing XML file.");
        }
    });
	if(!productavailable){
		alert("No one Products Availabled here ");
		return false;
	}
	
}
/***************************************************GENERATE INVOICE BARCODE***********************************************************/

/***************************************************     GENERATE INVOICE-BARCODE     ****************************************************/

//STEP : 1
		function DrawCode39Barcode(data,
						   checkDigit)
		{
			//alert("data ::::"+data.value);
			return DrawHTMLBarcode_Code39(data,checkDigit,"yes","cm", 0,3,1,3,"bottom","center", "","black","white"); 
		}

//STEP : 2		
		function DrawHTMLBarcode_Code39(data,
						    checkDigit,
						    humanReadable,
						    units,
						    minBarWidth,
						    width,height,
						    barWidthRatio,
						    textLocation,
						    textAlignment,
						    textStyle,
						    foreColor,
						    backColor)
		{
			return DrawBarcode_Code39(data,
						 checkDigit,
						 humanReadable,
						 units,
						 minBarWidth,
						 width,height,
						 barWidthRatio,
						 textLocation,
						 textAlignment,
						 textStyle,
						 foreColor,
						 backColor,
						 "html");
		}

//STEP : 3		
          function DrawBarcode_Code39(data,
						    checkDigit,
						    humanReadable,
						    units,
						    minBarWidth,
						    width,height,
						    barWidthRatio,
						    textLocation,
						    textAlignment,
						    textStyle,
						    foreColor,
						    backColor,
						    mode)
		{

			  if (foreColor==undefined)
				  foreColor="black";
			  
			  if (backColor==undefined)
				  backColor="white";

			  if (textLocation==undefined)
				  textLocation="bottom";
			  
			  else if (textLocation!="bottom" && textLocation!="top")
				  textLocation="bottom";
			  
			  if (textAlignment==undefined)
				  textAlignment="center";
			  
			  else if (textAlignment!="center" && textAlignment!="left" && textAlignment!="right")
				  textAlignment="center";
			  
			  if (textStyle==undefined)
				  textStyle="";
			  
			  if (barWidthRatio==undefined)
				  barWidthRatio=3;
			  
			  if (height==undefined)
				  height=1;
			  
			  else if (height<=0 || height >15)
				  height=1;
			  
			  if (width==undefined)
				  width=3;
			  
			  else if (width<=0 || width >15)
				  width=3;
			  
			  if (minBarWidth==undefined)
				  minBarWidth=0;
			  
			  else if (minBarWidth<0 || minBarWidth >2)
			      minBarWidth=0;
			  
			  if (units==undefined)
				  units="cm";
			  
			  else if (units!="in" && units !="cm")
				  units="cm";
			  
			  if (humanReadable==undefined)
				  humanReadable="yes";
			  
			  else if (humanReadable!="yes" && humanReadable !="no")
				  humanReadable="yes";

          var encodedData = EncodeCode39(data, checkDigit);
			var humanReadableText = ConnectCode_Encode_Code39(data, checkDigit);
			var encodedLength = 0;
			var thinLength = 0;
			var thickLength = 0.0;
			var totalLength = 0.0;
			var incrementWidth = 0.0;
			var swing = 1;
			var result = "";
			var barWidth = 0;
			var thickWidth = 0.0;
			var svg;
			

			if (barWidthRatio >= 2 && barWidthRatio <= 3) {	}
			else
			barWidthRatio = 3;

          for (x = 0; x < encodedData.length; x++) {
				if (encodedData.substr(x, 1) == 't') {
					thinLength++;
					encodedLength++;
				} else if (encodedData.substr(x, 1) == 'w') {
					thickLength = thickLength + barWidthRatio;
					encodedLength = encodedLength + 3;
				}
			}
          totalLength = totalLength + thinLength + thickLength;
			
          if (minBarWidth > 0) {
				barWidth = minBarWidth.toFixed(2);
				width = barWidth * totalLength;
			} else
				barWidth = (width / totalLength).toFixed(2);
   			thickWidth = barWidth * 3;
			if (barWidthRatio >= 2 && barWidthRatio <= 3.0) {
				thickWidth = barWidth * barWidthRatio;
			}
	

			if (mode == "html") {
				if (textAlignment == 'center')
					result = '<div style="text-align:center">';
				else if (textAlignment == 'left')
					result = '<div style="text-align:left;">';
				else if (textAlignment == 'right')
					result = '<div style="text-align:right;">';
		
				var humanSpan = "";
				if (humanReadable == 'yes' && textLocation == 'top') {
					if (textStyle == '')
						humanSpan = '<span style="font-family : arial; font-size:8pt">'+ humanReadableText + '</span><br />';
					else
						humanSpan = '<span style=' + textStyle + '>'+ humanReadableText + '</span><br />';
				}
				result = result + humanSpan;
			}
					  

          for (x = 0; x < encodedData.length; x++) {
				var brush;
				if (swing == 0)
					brush = backColor;
				else
					brush = foreColor;
		
				if (encodedData.substr(x, 1) == 't') {
					if (mode == "html")
						result = result + '<span style="border-left:' + barWidth
								+ units + ' solid ' + brush + ';height:' + height
								+ units + ';display:inline-block;"></span>';
   					incrementWidth = incrementWidth + barWidth;
				} else if (encodedData.substr(x, 1) == 'w') {
					if (mode == "html")
						result = result + '<span style="border-left :' + thickWidth
								+ units + ' solid ' + brush + ';height:' + height
								+ units + ';display:inline-block;"></span>';
	     				incrementWidth = incrementWidth + thickWidth;
				}
		
				if (swing == 0)
					swing = 1;
				else
					swing = 0;
			}

          if (mode == "html") {
			var humanSpan = "";
			if (humanReadable == 'yes' && textLocation == 'bottom') {
				if (textStyle == '')
					humanSpan = '<br /><span style="font-family : arial; font-size:8pt">'
							+ humanReadableText + '</span>';
				else
					humanSpan = '<br /><span style=' + textStyle + '>'
							+ humanReadableText + '</span>';
			}
			result = result + humanSpan + "</div>";
		}
		return result;	
		}
          
          
//STEP : 4       
          function EncodeCode39(data,checkDigit)
          {
              var fontOutput = ConnectCode_Encode_Code39(data,checkDigit);
              var output = "";
              var pattern = "";
              for (x = 0; x < fontOutput.length; x++)
              {
                  switch (fontOutput.substr(x,1))
                  {
                      case '1':
                          pattern = "wttwttttwt";
                          break;
                      case '2':
                          pattern = "ttwwttttwt";
                          break;
                      case '3':
                          pattern = "wtwwtttttt";
                          break;
                      case '4':
                          pattern = "tttwwtttwt";
                          break;
                      case '5':
                          pattern = "wttwwttttt";
                          break;
                      case '6':
                          pattern = "ttwwwttttt";
                          break;
                      case '7':
                          pattern = "tttwttwtwt";
                          break;
                      case '8':
                          pattern = "wttwttwttt";
                          break;
                      case '9':
                          pattern = "ttwwttwttt";
                          break;
                      case '0':
                          pattern = "tttwwtwttt";
                          break;
                      case 'A':
                          pattern = "wttttwttwt";
                          break;
                      case 'B':
                          pattern = "ttwttwttwt";
                          break;
                      case 'C':
                          pattern = "wtwttwtttt";
                          break;
                      case 'D':
                          pattern = "ttttwwttwt";
                          break;
                      case 'E':
                          pattern = "wtttwwtttt";
                          break;
                      case 'F':
                          pattern = "ttwtwwtttt";
                          break;
                      case 'G':
                          pattern = "tttttwwtwt";
                          break;
                      case 'H':
                          pattern = "wttttwwttt";
                          break;
                      case 'I':
                          pattern = "ttwttwwttt";
                          break;
                      case 'J':
                          pattern = "ttttwwwttt";
                          break;
                      case 'K':
                          pattern = "wttttttwwt";
                          break;
                      case 'L':
                          pattern = "ttwttttwwt";
                          break;
                      case 'M':
                          pattern = "wtwttttwtt";
                          break;
                      case 'N':
                          pattern = "ttttwttwwt";
                          break;
                      case 'O':
                          pattern = "wtttwttwtt";
                          break;
                      case 'P':
                          pattern = "ttwtwttwtt";
                          break;
                      case 'Q':
                          pattern = "ttttttwwwt";
                          break;
                      case 'R':
                          pattern = "wtttttwwtt";
                          break;
                      case 'S':
                          pattern = "ttwtttwwtt";
                          break;
                      case 'T':
                          pattern = "ttttwtwwtt";
                          break;
                      case 'U':
                          pattern = "wwttttttwt";
                          break;
                      case 'V':
                          pattern = "twwtttttwt";
                          break;
                      case 'W':
                          pattern = "wwwttttttt";
                          break;
                      case 'X':
                          pattern = "twttwtttwt";
                          break;
                      case 'Y':
                          pattern = "wwttwttttt";
                          break;
                      case 'Z':
                          pattern = "twwtwttttt";
                          break;
                      case '-':
                          pattern = "twttttwtwt";
                          break;
                      case '.':
                          pattern = "wwttttwttt";
                          break;
                      case ' ':
                          pattern = "twwtttwttt";
                          break;
                      case '*':
                          pattern = "twttwtwttt";
                          break;
                      case '$':
                          pattern = "twtwtwtttt";
                          break;
                      case '/':
                          pattern = "twtwtttwtt";
                          break;
                      case '+':
                          pattern = "twtttwtwtt";
                          break;
                      case '%':
                          pattern = "tttwtwtwtt";
                          break;
				default : break;
                  }
                  output=output+pattern;
              }
              return output;
          }
//STEP : 5
		function ConnectCode_Encode_Code39(data,checkDigit)
		{
			var Result="";
			var cd="";
			var filtereddata="";
			filtereddata = filterInput(data);
			var filteredlength = filtereddata.length;
			if (checkDigit==1)
			{
				if (filteredlength > 254)
				{
					filtereddata = filtereddata.substr(0,254);
				}
				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 255)
				{
					filtereddata = filtereddata.substr(0,255);
				}
			}
			Result = "*" + filtereddata+cd+"*";
		      Result=html_decode(html_escape(Result));	
			return Result;
		}
		
//STEP : 10
		function getCode39Character(inputdecimal) {
			var CODE39MAP=new Array("0","1","2","3","4","5","6","7","8","9",
							"A","B","C","D","E","F","G","H","I","J",
							"K","L","M","N","O","P","Q","R","S","T",
							"U","V","W","X","Y","Z","-","."," ","$",
							"/","+","%");
			return CODE39MAP[inputdecimal];
		}

//STEP : 7,9		
		function getCode39Value(inputchar) {
			var CODE39MAP=new Array("0","1","2","3","4","5","6","7","8","9",
							"A","B","C","D","E","F","G","H","I","J",
							"K","L","M","N","O","P","Q","R","S","T",
							"U","V","W","X","Y","Z","-","."," ","$",
							"/","+","%");
			var RVal=-1;
			for (i=0;i<43;i++)
			{
				if (inputchar==CODE39MAP[i])
				{
					RVal=i;
				}
			}
			return RVal;
		}

//STEP : 6		
		function filterInput(data)
		{
			var Result="";
			var datalength=data.length;
			for (x=0;x<datalength;x++)
			{
				if (getCode39Value(data.substr(x,1)) != -1)
				{
					Result = Result + data.substr(x,1);
				}
			}
			return Result;
		}

//STEP : 8
		function generateCheckDigit(data)
		{
			var Result="";
			var datalength=data.length;
			var sumValue=0;
			for (x=0;x<datalength;x++)
			{
				sumValue=sumValue+getCode39Value(data.substr(x,1));
			}
			sumValue=sumValue % 43;
			return getCode39Character(sumValue);
		}

//STEP : 11
		function html_escape(data)
		{
			var Result="";
			for (x=0;x<data.length;x++)
			{
				Result=Result+"&#"+data.charCodeAt(x).toString()+";";
			}
			return Result;
		}
}



