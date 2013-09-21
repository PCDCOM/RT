
    function calculate(value) {
        if (document.getElementById("txtinput" + value).value == "") {
            document.getElementById("txtoutput" + value).value = 0;
        }
        else {
            document.getElementById("txtoutput" + value).value = (parseInt(document.getElementById("txtinput" + value).value) * parseInt(document.getElementById("LabelDenomination" + value).value)).toString();
        }
    }


$(document).ready(function () {
    $(".inputtextbox").keydown(function (event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

    $(".inputtextbox").keyup(function (event) {
        calculateDenomination($(this));
        calculateSum();
    });

});

function calculateSum() {

    var sum = 0;
    //iterate through each textboxes and add the values
    $(".outputtextbox").each(function () {

        //add only if the value is number
        if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseInt(this.value);
        }

    });
    //.toFixed() method will roundoff the final sum to 2 decimal places
    $("#sum").html(sum);
}

function calculateDenomination(inputelement) {
    var inputval = inputelement.attr('id');
    // alert(inputval);
    var inputid = inputval.substr(8, inputval.length);
    // alert(inputid);

    if (document.getElementById("txtinput" + inputid).value == "") {

        document.getElementById("txtoutput" + inputid).value = "0";
    }
    else {

        document.getElementById("txtoutput" + inputid).value = (parseInt(document.getElementById("txtinput" + inputid).value) * parseInt(document.getElementById("LabelDenomination" + inputid).value)).toString();
        // alert(2);
    }
}

