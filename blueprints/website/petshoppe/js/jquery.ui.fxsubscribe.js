(function($) {
    $.widget("custom.fxsubscribe", {
        options: {
            text: "",
            session: "",
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
            'src':'http://localhost/fixchgnew/js/fxsubscribe.js'
            }).appendTo("head");

            /*$("<script/>", {
            'type':'text/javascript',
            'src':'http://localhost/fixchgnew/js/smartcom.js'
            }).appendTo("head");*/

            var enqbtn = $("<button/>", {
                'class':'btn btn-general',
                'id':'publishnl',
                'text': o.text
            });

            el.append(enqbtn);

            var fulldiv = $("<div/>", {
                'class':'fxpopup',
                'id': 'publishnewsletterdiv'
            });


            var hidefn = 'javascript:hide($("#publishnewsletterdiv"));';
            var headdiv = $("<div/>", {
                'class':'boxhead',
            }).append($("<div/>", {
            	'class':'left span5'
            }).append($("<h2/>", {'text': o.text }))).append($("<div/>",{
                'class':'right'
            }).append($("<div/>", {'class':'wdt-links'}).append($("<a/>",{
                'href': hidefn
            }).append($("<i/>", {
                'class':'icon-remove'
            })
            ))));

            fulldiv.append(headdiv);

            var div = $("<div/>", {
                'class':'fxcontactboxwhite',
                'id':'publishnewsletter'
            });

            var msg = $("<div/>", {
                'class':'span5'
            }).append($("<span/>", {
                'class':'badge badge-important',
                'id':'fxsubscribemsg',
                'name':'fxsubscribemsg',
            }));

	    div.append(msg);

	    var uploadfrm = $("<form/>", {
	    	'id':'uploadnewsletter',
	    	'class':'register-form',
	    	'method':'post',
	    	'enctype':'multipart/form-data'
	    	});

	   var objtype = $("<input/>", {
	   	'name':'group',
	   	'type':'hidden',
	   	'value':'NewsLetterFile'
	   });
	   uploadfrm.append(objtype);

	   var fdiv = $("<div/>", { 'class':'fileinputs' });
	   var file = $("<input/>", {
	   	'type':'file',
	   	'id':'img-upload-file',
	   	'name':'img-upload-file',
	   	'accept':'*.pdf',
	   	'class':'file input-block-level'
	   });
	   fdiv.append(file);

	   var fakediv = $("<div/>", {
	       'class':'fakefile'
	   });

	   var finput = $("<input/>", {
	       'class':'input-block-level',
	       'type':'text',
	       'placeholder':'Select your newsletter PDF',
	       'name':'imguploadfile',
	       'id':'imguploadfile',
	       'required':'required'
	   });
	   fakediv.append(finput);
	   fdiv.append(fakediv);
	   fdiv.append($("<p/>"));

	   uploadfrm.append(fdiv);

           var sendfrm = $("<form/>", {
               'id':'sendnewsletter',
               'method':'post',
               'class':'register-form'
           });

           var sub = $("<input/>", {
               'class':'input-block-level',
               'type':'text',
               'id':'subject',
               'name':'subject',
               'required':'required',
               'placeholder':'Please provide the subject line for the newletter'
           });

           sendfrm.append(sub);
           var textarea = $('<textarea/>', {
               'class':'input-block-level',
               'rows':5,
               'id':'content',
               'name':'content',
               'required':'required',
               'placeholder':'Please enter the contents of the newsletter email'
           });

           sendfrm.append(textarea);

           var btn = $("<button/>", {
               'class':'btn btn-general input-block-level',
               'type':'submit',
               'text':'Send'
           });

           sendfrm.append(btn);

	    div.append(uploadfrm);
	    div.append(sendfrm);

	    fulldiv.append(div);
            el.append(fulldiv);

            $(document).ready (function() {
                    $('#img-upload-file').change(function() {
			$('#imguploadfile').val($(this).val().replace("C:\\fakepath\\", ""));
                    });

		    $('#publishnl').click(function() {

			var div = $('#publishnewsletterdiv');
			var divlst = $('#publishnewsletter');

			div.css({top: '150px'});
			div.css({left: '200px'});
			div.css({width: '500px'});
			div.css({height: '500px'});
			divlst.css({width: 'auto'});
			divlst.css({height: 'auto'});
		    });
            });

             $('#sendnewsletter').submit(function (e) {
	         e.preventDefault();
	         var smartcon = createsubconn();
	         smartcon.upload($('#uploadnewsletter'),
	    	function(data)
	    	{
	    	    var form = $('#sendnewsletter');
	    	    console.log("Submitting form sendnewsletter: " + form);
	    	    if (data.iserror)
	    	    {
	    		alert("Error uploading file. " + data);
	    		return;
	    	    }

	    	    var file = data.response.uploadfilename;
	    	    console.log("Setting the newsletter file as: " + file);
	    	    var asmart = createsubconn();
	    	    asmart.sendnewsletter(file, $('#subject').val(), $('#content').val(), function(data1) {
	    		hideBox($('#publishnewsletterdiv'));
	    		if (data.message != '')
	    		    $('#fxsubscribemsg').empty().append( data1.message );
	    		else
	    		    $('#fxsubscribemsg').empty().append( JSON.stringify(data1) );
	    	    });
	    	});
	         return false;
	     });
	},

        destroy: function() {
        }
    });
})(jQuery);