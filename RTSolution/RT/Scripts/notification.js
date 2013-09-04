
$(function () {
    
    var connection = $.connection('/echo');
    
    connection.received(function (data) {
        
        var objData = jQuery.parseJSON(data);
        objData.Key, objData.Value);
    });

    connection.start().done(function (param) {
       
        $.notify().onload();
        connection.send("{'Key':'init','Value':'value1'}");
    });
});




(function ($, window) {
    "use strict";
    
    var notify,
    events = {
        OnLoad: "OnLoad"
    },
    notify = function () {
        return new notify.fn.init();
    };
    notify.events = events;
    notify.fn = notify.prototype = {
        init: function () {
            this._ = {};
            
        },
        callevents: function () {
           
        },

        onload: function () {
            
            var notify = this;
            var loadOrderButtons = function (arg) {

                var ords = arg.data;
                $.each(ords, function (index, ord) {
                    var btn =$('<a/>',
                        {
                            html: ord.OrderId,
                            'class': 'orderButton',
                            Id: "ord" + ord.OrderId,
                            click: function () {
                                var id = this.id.substr(3, this.id.length);
                                $.loadOrder(id);
                            }
                        }
                        );
                    $('#invoiceReorderBlk').append(btn);
                });
                
            };
            var loadSeats = function (arg) {
                var data = arg.data;
                var sts;
                if (typeof (data) == "string")
                    sts = jQuery.parseJSON(data);
                else
                    sts = data;
                $.each(sts, function (index, item) {
                    var seatNode = $(".csSeatList .seat a[title=" + item.Name + "]").parent().removeClass("selectingSeat").removeClass("selectedSeat").addClass("selectedSeat");
                    var ordId = item.OrderId;
                    seatNode.click(function (e) {
                        $.loadOrder(ordId);
                    });
                });
            };
            var initLoadOrderButtons = function (pargs) {
                var args = {}
                if (pargs.data.length > 1)
                    args.data = pargs.data[0];
                loadOrderButtons(args);
            };
            var initLoadSeat = function (pargs) {
                var args = {}
                if (pargs.data.length > 1)
                    args.data = pargs.data[1];
                loadSeats(args);
            };
            $.channel('subscribe', 'init/*', initLoadOrderButtons);
            $.channel('subscribe', 'order/*', loadOrderButtons);
            $.channel('subscribe', 'init/*', initLoadSeat);
            $.channel('subscribe', 'seats/* ', loadSeats);


        }
    };
    notify.fn.init.prototype = notify.fn;
    $.notify = notify;
}(window.jQuery, window));

