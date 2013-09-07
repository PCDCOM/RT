
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
                                'class': 'orderButton ord' + ord.OrderId,
                                Id: "ord" + ord.OrderId,
                                click: function () {
                                    var id = this.id.substr(3, this.id.length);
                                    $.loadOrder(id);
                                }
                            }
                            );
                        obj.append(btn);
                    } else if (obj.length > 0 ) {
                        //obj.find("option[text='ord" + ord.OrderId + "']").remove();
                        obj.find(".ord" + ord.OrderId).remove();
                        
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
                    var seatNode = $(".csSeatList .seat a[title=" + item.Name + "]").parent().removeClass("selectingSeat").removeClass("selectedSeat");
                    if (item.Status == 1 || item.Status == 2) {
                        seatNode.addClass("selectedSeat")
                    }
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
                $('#orderedNumbers').empty();
                loadOrderButtons(args, $('#orderedNumbers'), 0);

            };
            var initLoadBillButtons = function (pargs) {
                var args = {};
                if (pargs.data.length > 1)
                    args = pargs.data[0];
                $('#billedNumbers').empty();
                loadOrderButtons(args, $('#billedNumbers'), 1);
                $.channel('unsubscribe', 'init/*');
            };
            var initLoadSeat = function (pargs) {
                var args = {}
                if (pargs.data.length > 1)
                    args.data = pargs.data[1];
                $(".csSeatList .seat a").parent().removeClass("selectingSeat").removeClass("selectedSeat");
                loadSeats(args);
                
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

            $.channel('subscribe', 'init/*', initLoadOrderButtons);
            $.channel('subscribe', 'order/*', afterSaveLoadOrderButtons);
            $.channel('subscribe', 'init/*', initLoadSeat);
            $.channel('subscribe', 'seats', loadSeats);
            $.channel('subscribe', 'init/*', initLoadBillButtons);
            $.channel('subscribe', 'order/*', afterSaveLoadBillButtons);

        }
    };
    notify.fn.init.prototype = notify.fn;
    $.notify = notify;
}(window.jQuery, window));

