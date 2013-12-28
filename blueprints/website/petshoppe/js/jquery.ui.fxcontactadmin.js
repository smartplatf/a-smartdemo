(function($) {
    $.widget("custom.fxcontactadmin", {
        options: {
            backgroundColor: "#111",
            contactname: "default",
            text: "Enquiries",
            session: ""
        },

        _create: function() {
            o = this.options;
            el = this.element;
            $("<link/>", {
            'rel':'stylesheet',
            'href':'http://localhost/fixchgnew/css/fxcontact.css'
            }).appendTo("head");

            $("<link/>", {
            'rel':'stylesheet',
            'href':'http://localhost/fixchgnew/css/bootstrap.css'
            }).appendTo("head");

            $("<script/>", {
            'type':'text/javascript',
            'src':'http://localhost/fixchgnew/js/fxcontact.js'
            }).appendTo("head");


            /*$("<script/>", {
            'type':'text/javascript',
            'src':'http://localhost/fixchgnew/js/smartcom.js'
            }).appendTo("head");*/

            var enqbtn = $("<button/>", {
                'class':'btn btn-general',
                'id':'showenquiries',
                'text':o.text
            });

            el.append(enqbtn);

            var fulldiv = $("<div/>", {
                'class':'fxpopup',
                'id':'enquirylistdiv'
            });

            var headdiv = $("<div/>", {
                'class':'boxhead',
            }).append($("<div/>", {
            	'class':'left span5'
            }).append($("<h2/>", {'text':'Open Enquiries'}))).append($("<div/>",{
                'class':'right'
            }).append($("<div/>", {'class':'wdt-links'}).append($("<a/>",{
                'href':'javascript:hideEnquiries();'
            }).append($("<span/>", {
                'class':'icon-remove'
            })
            ))));

            fulldiv.append(headdiv);

            var div = $("<div/>", {
                'class':'fxcontactboxwhite',
                'id':'enquirylist'
            });

            var msg = $("<div/>").append($("<span/>", {
                'class':'badge badge-important',
                'id':'fxcontactmsg',
                'name':'fxcontactmsg',
            }));

	    var adiv = $("<div/>", {
		'class':'accordion',
		'id':'enquiry-accordion'
	    });
	    div.append(msg);
	    div.append(adiv);

	    fulldiv.append(div);
            el.append(fulldiv);

            $(document).ready (function() {
		    $('#showenquiries').click(function() {

			var div = $('#enquirylistdiv');
			var divlst = $('#enquirylist');

			var enq = $('#enquiry-accordion');
			enq.empty();

		        var fxsmart = createcontactconn(function() {
		        });

		        fxsmart.listOpenEnquiries(5, addEnquiry);

			div.css({top: '150px'});
			div.css({left: '300px'});
			div.css({width: '500px'});
			div.css({height: '300px'});
			divlst.css({width: 'auto'});
			divlst.css({height: 'auto'});
		    });
            });
	},

        destroy: function() {
        }
    });
})(jQuery);