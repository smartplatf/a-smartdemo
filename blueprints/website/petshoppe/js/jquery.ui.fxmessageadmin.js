(function($) {
    $.widget("custom.fxmessageadmin", {
        options: {
            session: "",
        },

        _create: function() {
            o = this.options;
            el = this.element;
            $("<link/>", {
            'rel':'stylesheet',
            'href':'http://localhost/fixchgnew/css/fxmessage.css'
            }).appendTo("head");

            $("<link/>", {
            'rel':'stylesheet',
            'href':'http://localhost/fixchgnew/css/bootstrap.css'
            }).appendTo("head");

            $("<link/>", {
            'rel':'stylesheet',
            'href':'http://localhost/fixchgnew/style.css'
            }).appendTo("head");

            $("<script/>", {
            'type':'text/javascript',
            'src':'http://localhost/fixchgnew/js/fxmessage.js'
            }).appendTo("head");

            var msgbtn = $("<button/>", {
                'class':'btn btn-general',
                'id':'addmsgbtn',
                'text':'Add Message'
            });

            var deactbtn = $("<button/>", {
                'class':'btn btn-general',
                'id':'deactivatebtn',
                'text':'Deactivate Message'
            });

            el.append(msgbtn);
            el.append(deactbtn);

            var fulldiv = $("<div/>", {
                'class':'fxmsgpopup',
                'id':'createmsgdiv'
            });

            el.append(fulldiv);
            var headdiv = $("<div/>", {
                'class':'boxhead',
            });

            fulldiv.append(headdiv);
            headdiv.append($("<div/>", {
            	'class':'left span3'
            }).append($("<h2/>", {'text':'Add Message'}))).append($("<div/>",{
                'class':'right'
            }).append($("<div/>", {'class':'wdt-links'}).append($("<a/>",{
                'href':'javascript:hidediv($("#createmsgdiv"));'
            }).append($("<i/>", {
                'class':'icon-remove'
            })
            ))));


            var p = $("<p/>", {
            'class':'input-block-level',
            'text':' '
            });

            var div = $("<div/>", {
                'class':'fxmsgboxwhite',
                'id':'createmsgbody'
            });

	    fulldiv.append(div);

            var msg = $("<div/>").append($("<span/>", {
                'class':'badge badge-important',
                'id':'fxmessage',
                'name':'fxmessage',
            }));

            var form = $("<form/>", {
                'class':'register-form',
                'id':'createmsg',
                'method':'post'
            });

            var inp = $("<input/>", {
                'class':'input-block-level',
                'id':'message',
                'name':'message',
                'required':'required',
                'placeholder':'Please enter the message to show'
            });


            var submit = $("<button/>", {
                'class':'btn btn-general input-block-level',
                'type':'submit',
                'text':'Add Message'
            });

            form.append(inp);
            form.append(p);
            form.append(submit);
	    //div.append(msg);
	    div.append(form);

	var dfulldiv = $("<div/>", {
	    'class':'fxmsgpopup',
	    'id':'deactivatediv'
	});

	el.append(dfulldiv);
	var dheaddiv = $("<div/>", {
	    'class':'boxhead',
	});

	dfulldiv.append(dheaddiv);
	dheaddiv.append($("<div/>", {
		'class':'left span3'
	}).append($("<h2/>", {'text':'DeActivate Messages'}))).append($("<div/>",{
	    'class':'right'
	}).append($("<div/>", {'class':'wdt-links'}).append($("<a/>",{
	    'href':'javascript:hidediv($("#deactivatediv"));'
	}).append($("<i/>", {
	    'class':'icon-remove'
	})
	))));

	var ddiv = $("<div/>", {
	    'class':'fxmsgboxwhite',
	    'id':'deactivatebody'
	});

	dfulldiv.append(ddiv);

	var table = $("<table/>", {
	    'class':'table table-striped'
	});

	var thead = $("<thead/>");
	var tr = $("<tr/>");
	thead.append(tr);
	tr.append($("<th/>", { 'text':'Message' }));
	tr.append($("<th/>", { 'text':'Action' }));

	var tbody = $("<tbody/>", { 'id':'addmessagehere'});
	table.append(thead);
	table.append(tbody);
	ddiv.append(table);

            $(document).ready (function() {
		    $('#addmsgbtn').click(function() {

			var div = $('#createmsgdiv');
			var divlst = $('#createmsgbody');

			div.css({top: '150px'});
			div.css({left: '300px'});
			div.css({width: '500px'});
			div.css({height: '300px'});
			divlst.css({width: 'auto'});
			divlst.css({height: 'auto'});
		    });

		    $('#deactivatebtn').click(function() {
			var div = $('#deactivatediv');
			var divlst = $('#deactivatebody');

			$('#addmessagehere').empty();
                	smartconfig.userSession = o.session;
		        var conn = createmessageconn();
		        conn.listMessages(10, addMessage);
			div.css({top: '150px'});
			div.css({left: '300px'});
			div.css({width: '500px'});
			div.css({height: '300px'});
			divlst.css({width: 'auto'});
			divlst.css({height: 'auto'});
		    });
            });

            $('#createmsg').submit(function(e) {
                e.preventDefault();

                var form = $('#createmsg');
                smartconfig.userSession = o.session;
                var fsmart = createmessageconn();
                fsmart.createmessage(form, function(resp) {
                    hidediv($('#createmsgdiv'));
                    showmessages();
                });

                return false;
            });
	},

        destroy: function() {
        }
    });
})(jQuery);