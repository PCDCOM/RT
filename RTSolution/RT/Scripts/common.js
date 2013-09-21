
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







