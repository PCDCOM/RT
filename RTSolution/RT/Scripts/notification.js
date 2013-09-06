
$(function () {
    
    var connection = $.connection('/echo');
    
    connection.received(function (data) {
        
        var objData = jQuery.parseJSON(data);
        jQuery.channel('publish', objData.Key, objData.Value);
    });

    connection.start().done(function (param) {
       
        $.notify().onload();
        connection.send("{'Key':'init','Value':''}");
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
            var loadOrderButtons = function (ords, obj, status) {

                $.each(ords, function (index, ord) {
                    if (status == ord.Status) {
                        var btn = $('<a/>',
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
                        obj.append(btn);
                    }
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
                var args = {};
                if (pargs.data.length > 1)
                    args = pargs.data[0];
                loadOrderButtons(args,$('#orderedNumbers'),0);
            };
            var initLoadBillButtons = function (pargs) {
                var args = {};
                if (pargs.data.length > 1)
                    args = pargs.data[0];
                loadOrderButtons(args, $('#billedNumbers'), 1);
            };
            var afterSaveLoadOrderButtons = function (pargs) {
                var args = {}
                args = pargs.data;
                loadOrderButtons(args,$('#orderedNumbers'), 0);
            };
            var afterSaveLoadBillButtons = function (pargs) {
                var args = {}
                args = pargs.data;
                loadOrderButtons(args, $('#billedNumbers'), 1);
            };
            var initLoadSeat = function (pargs) {
                var args = {}
                if (pargs.data.length > 1)
                    args.data = pargs.data[1];
                loadSeats(args);
            };
            $.channel('subscribe', 'init/*', initLoadOrderButtons);
            $.channel('subscribe', 'order/*', afterSaveLoadOrderButtons);
            $.channel('subscribe', 'init/*', initLoadSeat);
            $.channel('subscribe', 'seats/* ', loadSeats);
            $.channel('subscribe', 'init/*', initLoadBillButtons);
            $.channel('subscribe', 'order/*', afterSaveLoadBillButtons);

        }
    };
    notify.fn.init.prototype = notify.fn;
    $.notify = notify;
}(window.jQuery, window));

