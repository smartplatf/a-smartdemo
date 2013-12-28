(function($) {
    $.widget("custom.fixchgcontact", {
        options: {
            backgroundColor: "#111",
            contactname: "default",
            text: "CONTACT",
            cssfile: "fxcontact.css"
        },

        _create: function() {
            o = this.options;
            el = this.element;
            $("<link/>", {
            'rel':'stylesheet',
            'href':'http://localhost/fixchgnew/css/' + o.cssfile
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

            var showdiv = $("<div/>", {
                'class':'fxcontactboxhover',
                'id':'contactsmall'
            }).append($("<p/>", {
            	'class':'fxcontactrotate',
            	'text': o.text
            }));

            var div = $("<div/>", {
                'class':'fxpopup fxcontactboxwhite',
                'id':'contactshow'
            });

            var msg = $("<div/>").append($("<span/>", {
                'class':'badge badge-important',
                'id':'fxcontactmsg',
                'name':'fxcontactmsg',
            }));

            div.append(msg);

            var form = $("<form/>", {
                'method':'POST',
                'id':'fxcontactform'
            });

            var cname = $("<input/>", {
                'type':'hidden',
                'id':'fxcontactname',
                'value':o.contactname
            });

	    var contactname = $("<input/>", {
	        'type':'text',
	        'id':'contactname',
	        'required':'required',
	        'placeholder':'Please provide your full name',
	        'class':'input-block-level'
	    });

            var email = $("<input/>", {
                'type':'email',
                'id':'contactemail',
                'name':'contactemail',
                'placeholder':'Please provide your email address',
                'class':'input-block-level',
                'required':'required'
            });

            var phone = $("<input/>", {
		    'type':'text',
		    'id':'contactphone',
		    'name':'contactphone',
		    'placeholder':'Please provide your phone number',
		    'class':'input-block-level'
            });

            var subject = $("<input/>", {
                'type':'text',
                'id':'contactsubject',
                'name':'contactsubject',
                'placeholder':'Please provide a subject',
                'class':'input-block-level'
            });

            var message = $("<textarea/>", {
		    'rows':'4',
		    'id':'contactmessage',
		    'name':'contactmessage',
		    'placeholder':'Write your message here',
		    'class':'input-block-level',
		    'required':'required'
            });

            var submit = $("<button/>", {
                'class':'btn btn-general',
                'type':'submit',
                'text':'Contact'
            });

            form.append(cname);
            form.append(contactname);
            form.append(email);
            form.append(phone);
            form.append(subject);
            form.append(message);
            form.append(submit);

            div.append(form);
            el.append(div);
            el.append(showdiv);

            $(document).ready (function() {
		    $('#contactsmall').click(function() {
			var smalldiv = $('#contactsmall');
			var div = $('#contactshow');
		        if (smalldiv.css('right') == '0px')
		        {
		        //show
			smalldiv.css({right: '301px'});
			div.css({right: '0px'});
			div.css({height: '330px'});
			}
			else
			{
			//hide
			div.css({height: '85px'});
			div.css({right: '-500px'});
			smalldiv.css({right: '0px'});
			}
		    });
            });

            $('#fxcontactform').submit(function(e) {
                e.preventDefault();
                var form = $('#fxcontactform');

                var name = $('#fxcontactname').val();
                var cname = $('#contactname').val();
                var email = $('#contactemail').val();
                var phone = $('#contactphone').val();
                var subject = $('#contactsubject').val();
                var message = $('#contactmessage').val();

                var smartcontact = createcontactconn(function() {
			var smalldiv = $('#contactsmall');
			var div = $('#contactshow');
			div.css({right: '-500px'});
			div.css({height: '85px'});
			smalldiv.css({right: '0px'});
			$('#contactemail').val('');
			$('#contactphone').val('');
			$('#contactsubject').val('');
			$('#contactmessage').val('');
			$('#contactname').val('');
			$('#fxcontactmsg').empty();

                });

                console.log("Contacting smart...");

                $('#fxcontactmsg').empty().append("Sending message.. Please wait..");
                smartcontact.contactNotification(name, cname, subject, message, email, phone);
                return false;
            });
        },

        destroy: function() {
        }
    });
})(jQuery);