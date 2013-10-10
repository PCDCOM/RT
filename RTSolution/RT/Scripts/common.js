
/*** Copyrights Reserver by Rochor IT Solutions Pte Ltd **************************************************************/

function isOdd(num) { return num % 2;}





/********************************************* FINAL BILL PRINT *************************************************/


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

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}


function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}





