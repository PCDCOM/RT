
var JSON_seats = '';

var tr_current = "";

/**
 * ******************************* LOAD JSP CONTENT
 * *********************************
 */
var firstorder;
var nextorder;
var swaporder;
var productcount = 1;
var submitAction = 'New';
var invoiceIDsetup = "";
var billNo = "";
var currentInvoiceNo;
var nextInvoiceNo;
var invoice_bill_no = invoiceIDsetup;

function collapseOthers(currentID, type, setCookieVal) {
    $("[id^='itm-btn']").addClass("none");
    $('#itm-btn-' + currentID).removeClass("none");
    
    $('.PBtn .active').removeClass('active');
    $('.SBtn .active').removeClass('active');
    $('#' + currentID + ' a').addClass('active');

    if (setCookieVal && type == 'SBtn') {
        setCookie("floorname", currentID, 365);
    }
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

function setFloor() {

    var floorname = getCookie("floorname");
    if (floorname != null && floorname != "") {
        //change floor	  
        collapseOthers(floorname, 'SBtn', false);
    }
    else {
        collapseOthers('SBtn1', 'SBtn', true);
    }
}

function seatSettingDetails() {

    seatArrangmentSet();
    seatArrangmentSetB();
    seatArrangmentSetC();
    setFloor();
}


$(function () {
    //$.checkAuth = function (xhr) {
    //    //var header = xhr.getResponseHeader("X_User_Logged_In");
    //    //if (header !== "true") {
    //    //    alert("Your session has timed out, you will be redirected to the login page.");
    //    //    window.location = "/Restaurant/";
    //    //}
    //};
    $.loadOrder = function (ordId, from) {
        $.loader({
            className: "blue-with-image-2",
            content: ''
        });
        $.ajax({
            //"/" + from +"/OrderedProducts/"
            url: $("#loadOrder").val() +"/" +  ordId,
            error: function (xhr, ajaxOptions, thrownError) {
                $.loader('close');
                alert(xhr.status);
            },
            success: function (result) {
                $.loader('close');

                //$.checkAuth(xhr);

                $(".csSeatList .seat a").parent().removeClass("selectingSeat");
                $('#orderedNumbers a').removeClass("btn-info-mini");
                $('#billedNumbers a').removeClass("btn-info-mini");
                $('#invoice a').removeClass("btn-info-mini");

                $('#orderedNumbers .ord' + ordId).addClass("btn-info-mini");
                $('#billedNumbers .ord' + ordId).addClass("btn-info-mini");
                $('#invoice .ord' + ordId).addClass('btn-info-mini');

                $("#divOrderDetails").html(result);
                $.setOrderedProductEvents();
                
            }
        });
    };


    $.setOrderedProductEvents = function () {
        
        $('#saveOrder').click(function (e) {
            
            e.preventDefault();


            var rowCount = $('table#dataTable tr.new-order').length;
            if (rowCount > 0) {
                $.loader({
                    className: "blue-with-image-2",
                    content: ''
                });
                $.ajax({
                    type: "POST",
                    url: $("#saveOrderUrl").val(),
                    data: $('form').serialize(),
                    success: function (result,typ, xhr) {
                        $.loader('close');
                        /* check auth */
                        //$.checkAuth(xhr);

                        $("#divOrderDetails").html(result);
                        $.setOrderedProductEvents();
                        setFloor();
                        
                    },
                    error: function (e) {
                        $.loader('close');
                        alert(e);
                        
                    }
                });
            }
        });

        $('#saveBill').click(function (e) {
            
            e.preventDefault();
            $.loader({
                className: "blue-with-image-2",
                content: ''
            });
            $.ajax({
                type: "POST",
                url: $("#saveBillUrl").val(),
                data: $('form').serialize(),
                success: function (result) {
                    $.loader('close');
                    /* check auth */

                    //$.checkAuth(xhr);

                    $("#divOrderDetails").html(result);
                    $.setOrderedProductEvents();
                    setFloor();
                    
                },
                error: function (e) {
                    $.loader('close');
                    alert(e);
                }
            });
        });
        $('#savePayment').click(function (e) {
            e.preventDefault();
            var paidAmt=0, totAmount = 0;
            if ($.isNumeric($("#PaidAmount").val()))
                paidAmt = parseFloat( $("#PaidAmount").val());
            if ($.isNumeric($("#TotalAmount").val()))
                totAmount = parseFloat($("#TotalAmount").val());
            if (paidAmt < totAmount) {
                alert("Please enter paid amount greater than or equal to total amount");
                $("#PaidAmount").focus();
                return;
            }
            $.loader({
                className: "blue-with-image-2",
                content: ''
            });
            $.ajax({
                type: "POST",
                url: $("#savePayUrl").val(),
                data: $('form').serialize(),
                success: function (result) {
                    $.loader('close');
                    //$.checkAuth(xhr);

                    $("#divOrderDetails").html(result);
                    //loadOrders(result);
                    $.setOrderedProductEvents();
                    
                },
                error: function (e) {
                    $.loader('close');
                    alert(e);
                }
            });
        });
    };
});



$(document).ready(function () {



    $('#btnLoadOrder').click(function (e) {
        e.preventDefault();
        var ordId = $('#txtOrderId').val()
        if (ordId && $.isNumeric(ordId))
            $.loadOrder(ordId,"Order");
    });

    $.setOrderedProductEvents();


    $("#product-adder td div.circle").click(
        function () {
            var currentQty = trim($("#quantity").val());
            var btnQty = $(this).html();
            if (btnQty == "C") {
                $("#quantity").val("");
                return false;
            }

            if (isNumber(btnQty)) {
                if (isNumber(currentQty)) {
                    $("#quantity").val(currentQty + "" + btnQty);
                } else if (currentQty == null || currentQty == "") {
                    $("#quantity").val(btnQty);
                    var productId = $("#current-item-id").val();
                    var unitPrice = $("#current-item-unitprice").val();
                    var productName = $("#current-item-name").val();
                    if ($("#prev-added-item-id").val() == productId) {
                        // ////alert("ipdateproduct::::");
                        // need to investigate this method
                        // updateProduct(productName, parseInt(btnQty) - 1,
                        // productId);
                        updateCurrentProduct(productName,
                                parseInt(btnQty) - 1, productId);
                    }
                }
            }
            return false;
        });

    $('#autoProduct').keyup(function (e) {
        var key = 0;
        var evt = (e) ? e : (window.event) ? window.event : null;
        if (evt) {
           key = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
        }
        if (key == 13) {
            var txt = $('#autoProduct').val();
            var val = $('#ProductDataList').find('option[value="' + txt + '"]');
            var prm1 = val.attr('prm1');
            var prm2 = val.attr('id');
            addRowRecord(prm1, prm2);
            $('#autoProduct').val("");
        }
    });

});
function setBalanceAmountValue() {
    var bamount = $('#BalanceAmount').val();
    if (isNaN(bamount)) {
        $('#BalanceAmount').val("0.00");
    }
}

function setBalanceAmount() {
    var totalamount = $('#TotalAmount').val();
    var amountpaid = $('#PaidAmount').val();
    var bamount = $('#BalanceAmount').val();
    if (isNaN(bamount)) {
        $('#BalanceAmount').val("0.00");
    }
    var balanceAmount = parseFloat(amountpaid) - parseFloat(totalamount);
    //	////////////////alert("balanceAmount"+balanceAmount);
    $('#BalanceAmount').val(balanceAmount.toFixed(2));
    if (balanceAmount != 'NaN') {
        $('#BalanceAmount').val(balanceAmount.toFixed(2));
    } else {
        $('#BalanceAmount').val("0.00");
    }

    if (isNaN(balanceAmount)) {
        $('#BalanceAmount').val("0.00");
    }
}

function enterPlaceBill(e) {

    var characterCode;

    var evt = (e) ? e : (window.event) ? window.event : null;
    if (evt) {
        var key = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
    }

    if (key == 13) {
        alert('en');
        var printcurrentinvoiceNo;
        printcurrentinvoiceNo = $("#Id").val();
        invoice_bill_no = printcurrentinvoiceNo;
        setBalance();
        var paidamount = $("#PaidAmount").val();
        if (paidamount == '') {
            // alert("paid not provided then it is considered same amount provided");
            paidamount = $("#TotalAmount").val();
            $("#PaidAmount").val(paidamount);
        }
        if (invoice_bill_no == paidamount) {
            $("#PaidAmount").val('');
            return;
        }
        placeBillEntered();
        return true;
    }
    else {
        return false;
    }


}


function placeBillEntered() {
    $('#savePayment').trigger('click');
}

function addRowRecord(value, id) {
        var rowCount = $('table#dataTable tr').length - 1;

        if (rowCount == 0) {

            if (JSON_seats == "" && !$('#parceloptionID').is(':checked')) {
                alert("please select seatNo/Table or TakeAway check");

                setFloor();
                return true;
            }
        }


        var data = value.split(",");
        var productName = trim(data[0]);
        var unitPrice = trim(data[1]);
        var parcelPrice = trim(data[2]);
        if (parcelPrice == 'null') {
            parcelPrice = trim(data[1]);
        }
        var productId = trim(id + "");
        if ($('.csChkAll').attr('checked')) {
            $('.csChkParcel').each(function (index, e) {
                $(this).attr('checked', 'checked');
            });
            if (parcelPrice == '') {
                unitPrice = trim(data[1]);
            } else {
                unitPrice = parcelPrice;
            }
        }
        // set the values of product...
        $("#current-item-id").val(productId);
        $("#current-item-unitprice").val(unitPrice);
        $("#current-item-parcelprice").val(parcelPrice);
        $("#current-item-name").val(productName);
        $("#quantity").val("");

        if ((!productExists(productName, productId))
                && (productExists(productName, productId) != null)) {

            if (!updateProduct(productName, 1, productId)) {

                addNewDataRow(productName, unitPrice, parcelPrice, productId);
                if ($('.csChkAll').attr('checked')) {
                    $('.csChkParcel').each(function (index, e) {
                        $(this).attr('checked', 'checked');
                    });
                    unitPrice = parcelPrice;
                }

                $("#prev-added-item-id").val(productId);
            }
            // $(".invoice-wrapper-table #product-adder tr
            // td:nth-child(1)").html(document.getElementById("seatno").value);
        } else if ((productExists(productName, productId))
                && (!$('.csChkAll').is(':disabled'))) {
        
            repeatedProductUpdate(productName, productId, unitPrice, parcelPrice);
            if ($('.csChkAll').attr('checked')) {
                $('.csChkParcel').each(function (index, e) {
                    $(this).attr('checked', 'checked');
                });
                unitPrice = parcelPrice;
            }
            $("#prev-added-item-id").val(productId);
            // $(".invoice-wrapper-table #product-adder tr
            // td:nth-child(1)").html(document.getElementById("seatno").value);
        }
        updateInvoiceTotal();
    }

    function addNewDataRow(name, unitprice, parcelPrice, productId) {
        // //////alert("name::::::"+name);

        var rowCount = $('table#dataTable tr.new-order').length;
    
        var currentTotal = $('#TotalAmount').val();
        var totalQty = $('#totalqty');
        var newTotal = parseFloat(unitprice);
        var remove_space_productName = name.split(' ').join('');
        var rowId = 'row-id-' + remove_space_productName + "-" + productId;

        //if (rowCount > 1) {
            newTotal = newTotal + parseFloat(currentTotal);
        //}

        var removeButton = "<a href='" + "javascript:deleteDataRow(\"" + rowId
                + "\"," + rowCount + ");" + "' >"
                + "<img class='button-icon'	src='images/button-remove.png'>"
                + "</a>";
        var parcel = parcelPrice;
        var parceloption, parcelClsName, parcelValue;

        if (document.getElementById("parceloptionID").checked == true) {
            // alert("parceloptionID True");
            parceloption = ' checked="checked"';
            parcelClsName = ' class="new-order parcelRow  plist_' + rowCount + '"';
            parcelValue = '1';
            unitprice = parcelPrice;
        } else if (document.getElementById("parceloptionID").checked == false) {
            // alert("parceloptionID False");
            parcelClsName = ' class="new-order nonParcelRow plist_' + rowCount + '"';
            parcelValue = '0';
            parceloption = '0';
        }

        var rowHtmlData = '<tr id='
                + rowId
                + ''
                + parcelClsName
                + ' data-count="'
                + rowCount
                + '">'
                + '<td><input type="checkbox"'
                + parceloption
                + ' class="p_'
                + rowCount
                + ' csChkParcel" id="parcelid'
                + rowCount
                + '" name="orderedproducts['
                + rowCount
                + '].ParcelPrice" data-unitprice="'
                + unitprice
                + '"  value='
                + parcelPrice
                + ' onclick="changeParcelPrice(\''
                + rowId
                + '\','
                + rowCount
                + ','
                + unitprice
                + ','
                + parcelPrice
                + ')" />'
                + '<input type="hidden" id="type'
                + rowCount
                + '" value="'
                + parcelValue
                + '" name="orderedproducts['
                + rowCount
                + '].Type"/>'
                + '<input type="hidden" id="rowscount" value="'
                + rowCount
                + '" name="rowsets"/><input type="hidden" id="productId'
                + rowCount
                + '" value="'
                + productId
                + '" name="orderedproducts['
                + rowCount
                + '].ProductId"/>'
                + '</td>'
                + '<td><span>' + name + '</span><input  id="nameid'
                + rowCount
                + '" type="hidden" name="orderedproducts[' + rowCount + '].ProductName" value="'
                + name
                + '"/></td>'

                + '<td> <a class="number_button_unit_price" href="#" onclick="changeUnitPrice(\''
                + rowId
                + '\')">'
                + parseFloat(unitprice).toFixed(2)
                + '</a>'
                + '<input id="unitid'
                + rowCount
                + '" type="hidden" size="5" value="'
                + unitprice
                + '" data-unitprice="'
                + unitprice
                + '" name="orderedproducts['
                + rowCount
                + '].Price">'
                + '</td>'

                + '<td><a class="number_button_qty" href="#" onclick="updateQuantity(\''
                + rowId + '\')">1</a>'
                + '<input type="hidden" size="3" name="orderedproducts[' + rowCount
                + '].Quantity" value="1" id="qtyid' + rowCount + '"></td>'

                + '<td id="unitTotal"><span>' + parseFloat(unitprice).toFixed(2) + '</span>'

                + '<input type="hidden" size="3" name="orderedproducts[' + rowCount + '].Amount" value="' + unitprice + '" id="Amount' + rowCount + '">'
                
                + '</td>'
                + '<td>' + removeButton + '</td>' + '</tr>';

        $('#dataTable tr:last').after(rowHtmlData);
        $('#TotalAmount').val(newTotal.toFixed(2));
        $('#totalqty').val(rowCount);
        document.getElementById("parceloptionID").checked = false;

    }


    // $(document).ready(function(){
    function updateInvoiceTotal() {
        var total = 0;
        var i = 0;
        $("#dataTable tr").each(function () {
            $this = $(this);
            unitTotal = $this.find("td#unitTotal span").html();

            if (isNumber(unitTotal)) {
                total += parseFloat(unitTotal);
                i++;
            }
        });

        $("#TotalAmount").val(total.toFixed(2));
        $('#invoice #totalqty').val(i);

    }

    function doClear() {

        location.href = "addinvoice.htm";
        /*
         * $.post('addinvoice.htm',function(data){ ////////////alert(data);
         * 
         * });
         */

    }

    function make_blank() {
        document.getElementById("product").value = "";

    }

    $(function () {
        // a workaround for a flaw in the demo system
        // (http://dev.jqueryui.com/ticket/4375), ignore!
        $("#dialog:ui-dialog").dialog("destroy");

        var name = $("#name"), email = $("#email"), company = $("#company"), mobile = $("#mobile"), address = $("#address"), allFields = $(
                []).add(name), tips = $(".validateTips");

        var topay = $("#topay"), amounttendered = $("#amounttendered"), cash = $("#cash"), credit = $("#credit"), onaccount = $("#onaccount"), layby = $("#layby"), allFields = $(
                []).add(topay), tips = $(".validateTips");

        function updateTips(t) {
            tips.text(t).addClass("ui-state-highlight");
            setTimeout(function () {
                tips.removeClass("ui-state-highlight", 1500);
            }, 500);
        }

        function checkLength(o, n, min, max) {
            if (o.val().length > max || o.val().length < min) {
                o.addClass("ui-state-error");
                updateTips("Length of " + n + " must be between " + min + " and "
                        + max + ".");
                return false;
            } else {
                return true;
            }
        }

        function checkRegexp(o, regexp, n) {
            if (!(regexp.test(o.val()))) {
                o.addClass("ui-state-error");
                updateTips(n);
                return false;
            } else {
                return true;
            }
        }

        function transfer() {
            document.write(name);
            location.href = "addinvoice.htm?name=" + name.val() + "&mailid="
                    + email;
        }
        $("#dialog-form")
                .dialog(
                        {
                            autoOpen: false,
                            height: 250,
                            width: 350,
                            modal: true,
                            buttons: {
                                "Create Customer": function () {
                                    var bValid = true;
                                    allFields.removeClass("ui-state-error");

                                    bValid = bValid
                                            && checkLength(name, "username", 3, 16);
                                    bValid = bValid
                                            && checkLength(email, "email", 6, 80);
                                    bValid = bValid
                                            && checkLength(company, "company", 6,
                                                    80);

                                    bValid = bValid
                                            && checkLength(mobile, "mobile", 6, 80);

                                    bValid = bValid
                                            && checkRegexp(name,
                                                    /^[a-z]([0-9a-z_])+$/i,
                                                    "Username may consist of a-z, 0-9, underscores, begin with a letter.");
                                    // From jquery.validate.js (by joern),
                                    // contributed by Scott Gonzalez:
                                    // http://projects.scottsplayground.com/email_address_validation/
                                    bValid = bValid
                                            && checkRegexp(
                                                    email,
                                                    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                                                    "eg. ui@jquery.com");

                                    bValid = bValid
                                            && checkRegexp(company,
                                                    /^[a-z]([0-9a-z_])+$/i,
                                                    "Companyname may consist of a-z, 0-9, underscores, begin with a letter.");

                                    bValid = bValid
                                            && checkRegexp(mobile, /^([0-9])+$/i,
                                                    "Username may consist of a-z, 0-9, underscores, begin with a letter.");

                                    if (bValid) {

                                        $('#NewCustomer').val(name.val());
                                        $('#Email').val(email.val());
                                        $('#Company').val(company.val());
                                        $('#Mobile').val(mobile.val());

                                        $(this).dialog("close");
                                    }

                                },
                                Cancel: function () {
                                    $(this).dialog("close");
                                }
                            },
                            close: function () {
                                allFields.val("").removeClass("ui-state-error");
                            }
                        });

        $("#create-user").button().click(function () {
            $("#dialog-form").dialog("open");
            return false;
        });



        $("#payment").button().click(function () {
            var topay = document.getElementById("TotalAmount").value;
            var newpaidamount = parseFloat($('#paidamount').val());
            $("#topay").val(topay);
            if (!isNaN(newpaidamount) ? newpaidamount : 0) {
                // $("#amounttendered").val(newpaidamount);
                $("#calc_result").val(newpaidamount);
            } else {
                // $("#amounttendered").val(0.00);
                $("#calc_result").val(0.00);
            }
            $("#paymenttype").dialog("open");
            return false;
        });

    });





    function repeatedProductUpdate(productName, productId, unitPrice, parcelPrice) {

        var remove_space_productName = productName.split(' ').join('');
        var rowSelector = "tr#row-id-" + remove_space_productName + "-" + productId;
        var newRow = rowSelector + '.nonParcelRow';
        var parcelRow = rowSelector + '.parcelRow';
        if ($(newRow).length == 0 && $(parcelRow).length != 1) {
            addNewDataRow(productName, unitPrice, parcelPrice, productId);
        } else if ($(rowSelector).hasClass('nonParcelRow')
                && !$('#parceloptionID').is(':checked')) {
            rowSelector = rowSelector + '.nonParcelRow';
            if ($(rowSelector).html() != null) {
                var qty = parseInt($(rowSelector + ' td:nth-child(4) input').val());
                var unitPrice = parseFloat($(rowSelector + ' td:nth-child(3) input')
                        .val());
                var newQty = parseInt(qty + 1);

                if (isNumber(newQty) && newQty > 0) {
                    var newItemTotalPrice = unitPrice * newQty;
                    var invoiceTotal = Number($("#TotalAmount").val())
                            + newItemTotalPrice;

                    $(rowSelector + " .number_button_qty").html(newQty);
                    $(rowSelector + " td:nth-child(5) span").html(
                            newItemTotalPrice.toFixed(2));
                    $(rowSelector + ' td:nth-child(4) input').val(newQty);
                    $(rowSelector + ' td:nth-child(5) input').val(
                            newItemTotalPrice.toFixed(2));

                    updateInvoiceTotal();
                }

                return true;
            }
        } else if ($(rowSelector).hasClass('parcelRow')
                && $('#parceloptionID').is(':checked')) {
            rowSelector = rowSelector + '.parcelRow';
            if ($(rowSelector).html() != null) {
                var qty = parseInt($(rowSelector + ' td:nth-child(4) input').val());
                var unitPrice = parseFloat($(rowSelector + ' td:nth-child(3) input')
                        .val());
                var newQty = parseInt(qty + 1);

                if (isNumber(newQty) && newQty > 0) {
                    var newItemTotalPrice = unitPrice * newQty;
                    var invoiceTotal = Number($("#TotalAmount").val())
                            + newItemTotalPrice;

                    $(rowSelector + " .number_button_qty").html(newQty);
                    $(rowSelector + " td:nth-child(5) span").html(
                            newItemTotalPrice.toFixed(2));
                    $(rowSelector + ' td:nth-child(4) input').val(newQty);
                    $(rowSelector + ' td:nth-child(5) input').val(
                            newItemTotalPrice.toFixed(2));

                    updateInvoiceTotal();
                }

                return true;
            }
        } else {

            addNewDataRow(productName, unitPrice, parcelPrice, productId);
        }
        return false;
    }

    function tickParcel(count) {
        // ////////////alert("tickparcel"+count);
    }

    function checkAll() {
        var chkAll = $('.csChkAll').is(':checked');
        if (chkAll) {
            $('.csChkParcel').each(
                    function (index, e) {
                        $(this).attr('checked', 'checked');
                        var $row = $(this).closest('tr');
                        var row_count = index + 1;
                        var parcel_price = parseFloat($('#parcelid' + row_count)
                                .val());
                        var unit_price = $('#unitid' + row_count).val();
                        var quantity = parseInt($('#qtyid' + row_count).val());
                        var new_item_price = parcel_price * quantity;

                        if (isNumber(parcel_price) && parcel_price > 0) {
                            $('#unitid' + row_count).val(parcel_price.toFixed(2));
                            $('.number_button_unit_price', $row).text(
                                    parcel_price.toFixed(2));
                            $('td:nth-child(5) span', $row).text(
                                    new_item_price.toFixed(2));
                            $('td:nth-child(5) input', $row).val(
                                    new_item_price.toFixed(2));
                        }

                    });
        } else {
            $('.csChkParcel').each(
                    function (index, e) {
                        $(this).removeAttr('checked');
                        var $row = $(this).closest('tr');
                        var row_count = index + 1;
                        var unit_price = parseFloat($('#unitid' + row_count).data(
                                'unitprice'));
                        var quantity = parseInt($('#qtyid' + row_count).val());
                        var new_item_price = unit_price * quantity;

                        if (isNumber(unit_price) && unit_price > 0) {
                            $('#unitid' + row_count).val(unit_price.toFixed(2));
                            $('.number_button_unit_price', $row).text(
                                    unit_price.toFixed(2));
                            $('td:nth-child(5) span', $row).text(
                                    new_item_price.toFixed(2));
                            $('td:nth-child(5) input', $row).val(
                                    new_item_price.toFixed(2));
                        }
                    });
        }
        updateInvoiceTotal();

        /*
         * var len=$('table#dataTable tr').length; len=len-1;
         * //////////////alert("length"+len); for(var a=1;a<=len;a++){ for (var
         * i=0;i<document.forms[0].elements.length;i++) { var
         * e=document.forms[0].elements[i]; if ((e.name != 'allbox')) { var
         * prodid=document.getElementById("productId"+a).value; var
         * prodname=document.getElementById("nameid"+a).value; var
         * prodnamee=prodname.split(' ').join(''); var
         * unitprice=document.getElementById('unitid'+a).value; var
         * parcelprice=document.getElementById('parcelid'+a).value; var rowId1 =
         * 'row-id-'+prodnamee+"-"+prodid; //
         * ////////////alert("rowid:::::::"+rowId); var rowSelector1 = "#" +rowId1 ; //
         * ////////////alert("rowselector:::::::"+rowSelector); var qty =
         * parseInt($(rowSelector1 + ' td:nth-child(4) input').val());
         * e.checked=document.forms[0].allbox.checked; if(e.checked==true){
         * if(isNumber(parcelprice) && parcelprice > 0){ var newItemTotalPrice3 =
         * parcelprice * qty; var invoiceTotal3 = Number($("#TotalAmount").val()) +
         * newItemTotalPrice3; $(rowSelector1 + "
         * .number_button_unit_price").html(parcelprice); $(rowSelector1 + "
         * td:nth-child(5) span").html(newItemTotalPrice3.toFixed(2));
         * $(rowSelector1 + ' td:nth-child(3) input').val(parcelprice);
         * $(rowSelector1 + ' td:nth-child(5)
         * input').val(newItemTotalPrice3.toFixed(2));
         * 
         * updateInvoiceTotal(); } } else if(e.checked==false){ //
         * ////////////alert("UNCHECKEDDDDDDDDDD"+unitprice); if(isNumber(unitprice) &&
         * unitprice > 0){ var newItemTotalPrice3 = unitprice * qty; var
         * invoiceTotal3 = Number($("#TotalAmount").val()) + newItemTotalPrice3;
         * $(rowSelector1 + " .number_button_unit_price").html(unitprice);
         * $(rowSelector1 + " td:nth-child(5)
         * span").html(newItemTotalPrice3.toFixed(2)); $(rowSelector1 + '
         * td:nth-child(3) input').val(unitprice); $(rowSelector1 + '
         * td:nth-child(5) input').val(newItemTotalPrice3.toFixed(2));
         * 
         * updateInvoiceTotal(); } }
         *  } } }
         */
    }
    /**
     * 
     * @param name
     * @param unitprice
     * @param productId
     */





    // UnitPrice instead of ParcelPrice Changes at the time of PARCEL
    function changeParcelPrice(rowId, rowCount, unitprice, parcelPrice) {

        var rowSelector = "#" + rowId;
        var qty = parseInt($(rowSelector + ' td:nth-child(4) input').val());
        var unitPrice = parseFloat(unitprice);

        // alert("rowSelector :::"+rowSelector);
        if (document.getElementById('parcelid' + rowCount).checked == true) {
            // var productName = $("#product-adder tr:nth-child(1)
            // td:nth-child(1)").html();
            $(rowSelector).removeClass('nonParcelRow');
            $(rowSelector).addClass('parcelRow');

            if (isNumber(parcelPrice) && parcelPrice > 0) {
                var newItemTotalPrice1 = parcelPrice * qty;
                // var invoiceTotal1 = Number($("#TotalAmount").val()) +
                // newItemTotalPrice1;
                $(rowSelector + " .number_button_unit_price").html(
                        parcelPrice.toFixed(2));
                $(rowSelector + " td:nth-child(5) span").html(
                        newItemTotalPrice1.toFixed(2));
                $(rowSelector + ' td:nth-child(3) input').val(
                        parcelPrice.toFixed(2));
                $(rowSelector + ' td:nth-child(5) input').val(
                        newItemTotalPrice1.toFixed(2));
                updateInvoiceTotal();
            }
        } else if (document.getElementById('parcelid' + rowCount).checked == false) {
            $(rowSelector).removeClass('parcelRow');
            $(rowSelector).addClass('nonParcelRow');
            if (isNumber(unitPrice) && unitPrice > 0) {
                var newItemTotalPrice2 = unitPrice * qty;
                // var invoiceTotal2 = Number($("#TotalAmount").val()) +
                // newItemTotalPrice2;
                $(rowSelector + " .number_button_unit_price").html(
                        unitPrice.toFixed(2));
                $(rowSelector + " td:nth-child(5) span").html(
                        newItemTotalPrice2.toFixed(2));
                $(rowSelector + ' td:nth-child(3) input').val(unitPrice.toFixed(2));
                $(rowSelector + ' td:nth-child(5) input').val(
                        newItemTotalPrice2.toFixed(2));
                updateInvoiceTotal();
            }
        }

    }

    function productExists(productName, productId) {
        var remove_space_productName = productName.split(' ').join('');
        var rowSelector = "tr#row-id-" + remove_space_productName + "-" + productId;
        if ($(rowSelector).html() != null || $(rowSelector).hasClass('old_order')) {
            return true;
        }

        return false;
    }



    function updateProduct(productName, qty, productId) {
        var rowSelector = "tr#row-id-" + productName + "-" + productId;

        if ($(rowSelector).html() != null) {

            var rowNumber = $(rowSelector).prevAll("tr").length - 1;
            if (rowNumber != 0) {
                var unitPrice = parseFloat($(rowSelector + " #unitid" + rowNumber)
                        .val());
                var currentQty = parseFloat($(rowSelector + " #qtyid" + rowNumber)
                        .val());
                var newQty = currentQty + parseFloat(qty);
                var newItemTotalPrice = unitPrice * newQty;
                var invoiceTotal = parseFloat($("#TotalAmount").val())
                        + newItemTotalPrice;

                $(rowSelector + " .number_button_unit_price").html(unitPrice);
                $(rowSelector + " .number_button_qty").html(newQty);

                $(rowSelector + " td:nth-child(5) span").html(
                        newItemTotalPrice.toFixed(2));
                $(rowSelector + " td:nth-child(5) input").html(
                        newItemTotalPrice.toFixed(2));
                $(rowSelector + " #qtyid" + rowNumber).val(newQty);

                updateInvoiceTotal();

                return true;
            }

        }

        return false;
    }



    function deleteDataRow(rowId, count) {
        // ////////////////alert(rowId);
        var $row = $('#dataTable #' + rowId);
        var nextRow = $row.next('tr').find('td:nth-child(1)').text();
        if ($row) {
            $('.plist_' + count).remove();
        }
        if ($('#dataTable tr').length == 1) {
            $('#prev-added-item-id').val($("#current-item-id").val());
        }
        if (nextRow) {
            reorderInvoiceContent(nextRow - 1);
        }
    }

    function clearCurrentProduct() {
        $("#current-item-id").val("");
        $("#current-item-name").val("");
        $("#curren-item-unitprice").val("");
        $("#prev-added-item-id").val("");
        $("#product-adder tr td:nth-child(1)").html("");
    }



    function removeAll() {
        $("#dataTable tr").each(function (i, el) {
            if (i > 0) {
                $(el).remove();
            }
        });
        $("#TotalAmount").val(0.0);
        $("#Seats").val("");
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function setInvoiceBalance() {
        alert('sd');
        var totalamount = $('#TotalAmount').val();
        var amountpaid = $('#paidamount').val();
        var balanceAmount = parseFloat(amountpaid) - parseFloat(totalamount);
        $('#balanceamt').val(balanceAmount.toFixed(2));
        if (balanceAmount >= 0) {
            $('input:radio[document.invoiceForm.paystatus.value]')[0].checked = true;
        } else if (balanceAmount <= 0) {
            $('input:radio[document.invoiceForm.paystatus.value]')[1].checked = true;
        }

    }

    function updateParcelPriceQuantity(rowId, parcelPrice) {
        var rowSelector = "#" + rowId;
        var qty = parseInt($(rowSelector + ' td:nth-child(4) input').val());
        var unitPrice = parseFloat(parcelPrice);
        var newQty = parseInt(prompt("Quantity", qty));

        if (isNumber(newQty) && newQty > 0) {
            var newItemTotalPrice = unitPrice * newQty;
            var invoiceTotal = Number($("#TotalAmount").val()) + newItemTotalPrice;

            $(rowSelector + " .number_button_qty").html(newQty);
            $(rowSelector + " td:nth-child(5) span").html(
                    newItemTotalPrice.toFixed(2));
            $(rowSelector + ' td:nth-child(4) input').val(newQty);
            $(rowSelector + ' td:nth-child(5) input').val(
                    newItemTotalPrice.toFixed(2));

            updateInvoiceTotal();
        }
    }

    function updateQuantity(rowId) {
        var rowSelector = "#" + rowId;
        var qty = parseInt($(rowSelector + ' td:nth-child(4) input').val());
        var unitPrice = parseFloat($(rowSelector + ' td:nth-child(3) input').val());
        var newQty = parseInt(prompt("Quantity", qty));

        if (isNumber(newQty) && newQty > 0) {
            var newItemTotalPrice = unitPrice * newQty;
            var invoiceTotal = Number($("#TotalAmount").val()) + newItemTotalPrice;

            $(rowSelector + " .number_button_qty").html(newQty);
            $(rowSelector + " td:nth-child(5) span").html(
                    newItemTotalPrice.toFixed(2));
            $(rowSelector + " td:nth-child(5) input").val(
            newItemTotalPrice.toFixed(2));

            $(rowSelector + ' td:nth-child(4) input').val(newQty);
            $(rowSelector + ' td:nth-child(5) input').val(
                    newItemTotalPrice.toFixed(2));

            updateInvoiceTotal();
        }
    }

    function changeQuantity(rowId, newQty) {
        var rowSelector = "#" + rowId;
        var qty = parseInt($(rowSelector + ' td:nth-child(4) input').val());
        var unitPrice = parseFloat($(rowSelector + ' td:nth-child(3) input').val());

        if (isNumber(newQty) && newQty > 0) {

            var newItemTotalPrice = unitPrice * newQty;
            var invoiceTotal = Number($("#TotalAmount").val()) + newItemTotalPrice;

            $(rowSelector + " .number_button_qty").html(newQty);
            $(rowSelector + " td:nth-child(5) span").html(
                    newItemTotalPrice.toFixed(2));
            $(rowSelector + " td:nth-child(5) input").val(
                    newItemTotalPrice.toFixed(2));
            $(rowSelector + ' td:nth-child(4) input').val(newQty);

            updateInvoiceTotal();
        }
    }
    /**
     * Update quantity with textbox value and plus button clik
     * **************************************************************************************
     */

    function addProductsWithQuantitySelection() {
        var currentQty = parseInt(trim($("#quantity").val()));
        if (isNumber(currentQty)) {
            var productId = trim($("#current-item-id").val());
            // var productName = $("#product-adder tr:nth-child(1)
            // td:nth-child(1)").html();
            var productName = $("#current-item-name").val();
            if ($("#prev-added-item-id").val() == productId) {
                var remove_space_productName = productName.split(' ').join('');
                var rowId = "row-id-" + remove_space_productName + "-" + productId;
                changeQuantity(rowId, currentQty);
                // need to investigate the belwo method purpose
                // clearCurrentProduct();
            } else if (!productExists(productName, productId)) {
                var unitPrice = $("#current-item-unitprice").val();
                if (productId != "" && productId != null) {
                    addNewDataRow(productName, unitPrice, productId);
                    updateProduct(productName, currentQty - 1, productId);
                }
            } else if (!updateProduct(productName, currentQty, productId)) {
                var unitPrice = $("#current-item-unitprice").val();
                if (productId != "" && productId != null) {
                    addNewDataRow(productName, unitPrice, productId);
                    updateProduct(productName, currentQty - 1, productId);
                }
            }

        }
    }

    /**
     * ******************* update the quantity and total price while click the
     * number button *****************
     */
    function updateCurrentProduct(productName, qty, productId) {
        var remove_space_productName = productName.split(' ').join('');
        var rowSelector = "tr#row-id-" + remove_space_productName + "-" + productId;
        if ($(rowSelector).html() != null) {
            var rowNumber = $(rowSelector).prevAll("tr").length-1;
            if (rowNumber != 0) {
                var unitPrice = parseFloat($(rowSelector + " #unitid" + rowNumber)
                        .val());
                var currentQty = parseFloat($(rowSelector + " #qtyid" + rowNumber)
                        .val());
                var newQty = currentQty + parseFloat(qty);
                var newItemTotalPrice = unitPrice * newQty;
                // var invoiceTotal = parseFloat($("#TotalAmount").val()) +
                // newItemTotalPrice;
                $(rowSelector + " .number_button_unit_price").html(unitPrice);
                $(rowSelector + " .number_button_qty").html(newQty);
                $(rowSelector + " td:nth-child(5) span").html(
                        newItemTotalPrice.toFixed(2));
                $(rowSelector + " td:nth-child(5) input").html(
                        newItemTotalPrice.toFixed(2));
                $(rowSelector + " #qtyid" + rowNumber).val(newQty);
                updateInvoiceTotal();
                return true;
            }
        }
        return false;
    }

    function changeUnitPrice(rowId) {
        var rowSelector = "#" + rowId;
        var qty = parseInt($(rowSelector + ' td:nth-child(4) input').val());
        var unitPrice = parseFloat($(rowSelector + ' td:nth-child(3) input').val());
        var newUnitPrice = parseFloat(prompt("Unit Price", unitPrice));

        if (isNumber(newUnitPrice) && newUnitPrice > 0) {

            var newItemTotalPrice = newUnitPrice * qty;
            var invoiceTotal = Number($("#TotalAmount").val()) + newItemTotalPrice;
            $(rowSelector + " .number_button_unit_price").html(newUnitPrice);
            $(rowSelector + " td:nth-child(5) span").html(
                    newItemTotalPrice.toFixed(2));
            $(rowSelector + " td:nth-child(5) input").val(
            newItemTotalPrice.toFixed(2));

            $(rowSelector + ' td:nth-child(3) input').val(newUnitPrice);
            $(rowSelector + ' td:nth-child(5) input').val(
                    newItemTotalPrice.toFixed(2));

            updateInvoiceTotal();
        }
    }

    function addTable(tableId, element) {
        $parent = $($(element).parent());
        if ($parent.hasClass('table-button')) {
            $parent.removeClass('table-button');
            $parent.addClass('table-button-select');
        } else {
            $parent.removeClass('table-button-select');
            $parent.addClass('table-button');

        }
    }

    function trim(stringToTrim) {
        return stringToTrim.replace(/^\s+|\s+$/g, "");
    }

    function ltrim(stringToTrim) {
        return stringToTrim.replace(/^\s+/, "");
    }

    function rtrim(stringToTrim) {
        return stringToTrim.replace(/\s+$/, "");
    }

    /**
     * ********************************************STARTED -- RESTUARANT_POS SEAT
     * ARRAANGEMENT by malini********************************************
     */


    function showArrangements(options) {
        // function showArrangements(seats,seatsWithInvoice){
        var settings = {
            rows: 5,
            cols: 8,
            rowCssPrefix: 'row-',
            colCssPrefix: 'col-',
            seatWidth: 50,
            seatHeight: 50,
            seatCss: 'seat',
            selectedSeatCss: 'selectedSeat',
            selectingSeatCss: 'selectingSeat',
            tableName: '',
            placeId: 1,
            reservedSeats: [],
            tablePrefix: ''
        };

        var options = $.extend({}, settings, options);
        var init = function () {
            reservedSeat = [];
            for (var i = 0; i < options.reservedSeats.length; i++) {
                reservedSeat[i] = parseInt(options.reservedSeats[i], 10);

            }
            var str = [], seatNo, className, strLeft = [], strRight = [];
            var conte = '';
            var tbl = '<div class="csTableName">' + options.tablePrefix + ' '
                    + options.tableName + '</div>';
            var checkAll = '<div class="csCheckAll"><input type="checkbox" class="csSelectAllTable" /></div>';
            var place = '<div class="csSeatWrapper" id="place-' + options.placeId
                    + '"></div>';
            var result = '';
            str.push(tbl, checkAll, '<ul class="csSeatList">');
            for (i = 0; i < options.rows; i++) {
                for (j = 0; j < options.cols; j++) {
                    seatNo = (i + j * options.rows + 1);
                    seatText = options.tableName + seatNo;
                    className = options.seatCss + ' ' + options.rowCssPrefix
                            + i.toString() + ' ' + options.colCssPrefix
                            + j.toString();
                    if ($.isArray(reservedSeat)
                            && $.inArray(seatNo, reservedSeat) != -1) {
                        className += ' ' + options.selectedSeatCss;
                    }
                    conte = '<li  class="' + className + '"' + 'style="top:'
                            + (i * options.seatHeight).toString() + 'px;left:'
                            + (j * options.seatWidth).toString() + 'px">'
                            + '<a title="' + seatText + '">' + seatText + '</a>'
                            + '</li>';
                    str.push(conte);
                }
            }
            str.push('</ul>');
            $('#' + options.groupId + ' .p_' + options.column).append(place);
            $('#place-' + options.placeId).html(str.join('')).width(
                    options.seatWidth * options.cols).height(
                    options.seatHeight * options.rows + 10)
        };

        // case I: Show from starting
        // init();

        // CLICK BOOKED SEATS ONLY
        // Case II: If already booked

        init(options);

        $('#place-' + options.placeId + ' .' + options.seatCss).click(function () {
            invoice_bill_no = "";
            // ////////////alert("invoicebbbbbbbbbbbbbbbbbbbbb"+billNo);
            removeAll();
            billNo = "";
            // ////////////alert("invoicebbbbbbbbbbbbbbbbbbbbb"+billNo);
            var str = '', item; // modified on 17.10.2012
            if ($(this).hasClass(options.selectedSeatCss)) {
                // $(this).closest('.csSeatWrapper').find('li').removeClass(options.selectingSeatCss);
            } else {
                $(this).toggleClass(options.selectingSeatCss);
                getSelectedSeats();
                uncheckSelectedSeats($(this));
            }
        });

        // Select All seat in a table
        $('#place-' + options.placeId + ' .csSelectAllTable').click(
                function () {
                    invoice_bill_no = "";
                    // ////////////alert("invoicebbbbbb");
                    removeAll();
                    billNo = '';
                    if ($(this).is(':checked')) {
                        $(this).closest('.csSeatWrapper').find(
                                'li:not(.' + options.selectedSeatCss + ')')
                                .addClass(options.selectingSeatCss);
                    } else {
                        $(this).closest('.csSeatWrapper').find('li').removeClass(
                                options.selectingSeatCss);
                    }
                    getSelectedSeats();
                });

        // DISPLAY ALL SEATS
        $('#btnShow').click(
                function () {
                    var str = [];
                    $('.csChkAll').removeAttr('checked');
                    $.each($('#place-' + options.placeId + ' li.'
                            + options.selectedSeatCss + ' a, #place li.'
                            + options.selectingSeatCss + ' a'), function (index,
                            value) {
                                str.push($(this).attr('title'));
                            });
                });

        // DISPLAY SELECTED SEATS ONLY
        $('#btnShowNew').click(
                function () {
                    var str = [], item;
                    $.each($('#place-' + options.placeId + ' li.'
                            + options.selectingSeatCss + ' a'), function (index,
                            value) {
                                item = $(this).attr('title');
                                // str.push(item);
                                str.push($(this).text());
                                $('#results').val(str);

                            });

                });
    }

    function getSelectedSeats() {
        // //////////////alert("getSelectedseats");
        var str1 = '';
        var showSeats = [];
        var seat_data = {};
        var arrSeats = [];
        var noOfTables = $('.csSeatWrapper').length;
        // //////////////alert("bo"+noOfTables);
        for (var id = 1; id <= noOfTables; id++) {

            var selected = $('#place-' + id + ' li.selectingSeat a');
            if (selected.length) {
                var tbleName = $('#place-' + id + ' .csTableName').text();
                var cnt = tbleName + '-';
                var objSeats = {};
                var items = [], rows = [];
                $.each(selected, function (index, value) {
                    var item1 = $(this).attr('title');
                    // ////alert("item1 >>>>"+item1);
                    var seatObj = {};
                    cnt += item1;
                    seatObj["seatname"] = item1.toString();
                    items.push(seatObj);
                    showSeats.push(item1);
                    rows.push(item1);

                    if ((index + 1) != selected.length) {
                        cnt += ',';
                    }

                });
                if (str1 != '') { // modified on 17.10.2012
                    str1 += "#" + cnt; // modified on 17.10.2012
                } else { // modified on 17.10.2012
                    str1 += cnt; // modified on 17.10.2012
                }
                objSeats.tablename = tbleName;
                objSeats.row = rows.join(',');
                objSeats.seats = items;
                arrSeats.push(objSeats);
            }
            $('.csChkAll').removeAttr('checked');

        }
        // console.log(arrSeats);
        showSeats = showSeats.join(',');
        $("#Seats").val(showSeats);
        $('#printSeatNo').val(str1);
        $('#showSeatNo').val(showSeats);
        if (arrSeats.length) {
            JSON_seats = JSON.stringify(arrSeats);
            // ////alert("JSON VALUES :::: "+JSON_seats);
        } else {
            JSON_seats = '';
            // ////alert("JSON VALUES :::: "+JSON_seats);
        }
        $('#seatno').val(JSON_seats);

        // Final JSON output vairable name is 'JSON_seats'
        // console.log(JSON_seats);
        // $('#seatnoDisplay').val(str1);

    }

    function uncheckSelectedSeats($this) {
        var $panel = $this.closest('.csSeatWrapper');
        var noOfSeats = $panel.find('li').length;
        var noOfBookedSeats = $panel.find('.selectedSeat').length;
        var noOfSelectedSeats = $panel.find('.selectingSeat').length;
        if ((noOfBookedSeats + noOfSelectedSeats) == noOfSeats) {
            $('.csSelectAllTable', $panel).attr('checked', 'checked');
        } else {
            $('.csSelectAllTable', $panel).attr('checked', false);
        }
    }


