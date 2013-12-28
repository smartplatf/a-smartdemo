(function($) {    
    $.widget("custom.fxmessage", {  
        options: {
        },
        
        _create: function() {
            el = this.element;
            $("<link/>", {
            'rel':'stylesheet',
            'href':'http://localhost/fixchgnew/css/fxmessage.css'
            }).appendTo("head");
            
            $("<link/>", {
            'rel':'stylesheet',
            'href':'http://localhost/fixchgnew/css/bootstrap.css'
            }).appendTo("head");
            
            $("<script/>", {
            'type':'text/javascript',
            'src':'http://localhost/fixchgnew/js/fxmessage.js'
            }).appendTo("head");

	    var div = $("<div/>", {
	        'class':'fxmessageboxhover',
	        'id':'fxmessagediv'
	    });
            var scrollmsg = $("<marquee/>", {
                'class':'lead',
                'behavior':'scroll',
                'scrollamount':'2',
                'id':'showmessage',
                'text':''
            });
            
            div.append(scrollmsg);
            el.append(div);

            $(document).ready (function() {
                showmessages();
            });
	},
        
        destroy: function() {
        }
    });
})(jQuery);