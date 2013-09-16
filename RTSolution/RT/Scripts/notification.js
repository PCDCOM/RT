﻿
$(function () {
    
    var connection = $.connection('/Restaurant/echo');
    
    connection.received(function (data) {
        
        var objData = jQuery.parseJSON(data);
        jQuery.channel('publish', objData.Key, objData.Value);
    });
    connection.error(function (data) {
        alert('unable to connect the server pleaes try again');
        $.loader('close');
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
                                'class': 'btn btn-mini orderButton ord' + ord.OrderId,
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
            var loadTblBilled = function (ords, obj, status) {
                $.each(ords, function (index, ord) {
                    if (status == ord.Status) {
                        var row = $('<tr></tr>', {'class' : 'ordTr' + ord.OrderId});
                        var col1 = $("<td>" + ord.CreatedDate + "</td>");
                        var col2 = $("<td>" + ord.Seats + "</td>");
                        var col3 = $("<td>" + ord.Total + "</td>");
                        var btn = $('<a/>',
                            {
                                html: ord.OrderId,
                                'class': 'btn btn-mini orderButton ord' + ord.OrderId,
                                Id: "ord" + ord.OrderId,
                                click: function () {
                                    var id = this.id.substr(3, this.id.length);
                                    $.loadOrder(id);
                                }
                            }
                            );
                        var col4 = $("<td></td>")
                        col4.append(btn);
                        row.append(col1).append(col2).append(col3).append(col4);
                        obj.append(row);
                    } else if (obj.length > 0) {
                        //obj.find("option[text='ord" + ord.OrderId + "']").remove();
                        obj.find(".ord" + ord.OrderId).remove();
                        obj.find(".ordTr" + ord.OrderId).remove();
                        

                    }
                });
                //<tr class="row-b">
                //<td colspan="5"><b>No Paying Records</b>
                //</td>
                //</tr>
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
                    seatNode.unbind('click.loadorderevent');
                    if (item.Status == 2) {
                        seatNode.addClass("selectedSeat")
                        seatNode.bind('click.loadorderevent',function (e) {
                            $.loadOrder(ordId);
                        });
                    }
                    var ordId = item.OrderId;

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
            
            var initLoadBillTable = function (pargs) {
                var args = {};
                if (pargs.data.length > 1)
                    args = pargs.data[0];
                $('#tblBilled').empty();
                loadTblBilled(args, $('#tblBilled'), 1);
                
            };

            var initLoadSeat = function (pargs) {
                var args = {}
                if (pargs.data.length > 1)
                    args.data = pargs.data[1];
                $(".csSeatList .seat a").parent().removeClass("selectingSeat").removeClass("selectedSeat");
                loadSeats(args);
                
                $.loader('close');
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

            var afterSaveLoadBillTable = function (pargs) {
                var args = {}
                args = pargs.data;
                loadTblBilled(args, $('#tblBilled'), 1);
            };

            $.channel('subscribe', 'init/*', initLoadOrderButtons);
            $.channel('subscribe', 'init/*', initLoadBillButtons);
            $.channel('subscribe', 'init/*', initLoadBillTable);
            $.channel('subscribe', 'init/*', initLoadSeat);
            
            $.channel('subscribe', 'order/*', afterSaveLoadOrderButtons);
            $.channel('subscribe', 'order/*', afterSaveLoadBillButtons);
            $.channel('subscribe', 'order/*', afterSaveLoadBillTable);
            $.channel('subscribe', 'seats', loadSeats);
            

        }
    };
    notify.fn.init.prototype = notify.fn;
    $.notify = notify;
}(window.jQuery, window));

