(function($) {    
    $.widget("custom.monitor", {  
        options: {
            text: "",
            session: "",
            flow:"",
            graphkey1: "",
            graphkey2: ""
        },
        
        _create: function() {
            monoption = this.options;
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
            'src':'http://localhost/fixchgnew/js/smartmonitor.js'
            }).appendTo("head");

            $("<script/>", {
            'type':'text/javascript',
            'src':'http://localhost/fixchgnew/js/chart.js'
            }).appendTo("head");            
                        
            /*$("<script/>", {
            'type':'text/javascript',
            'src':'http://localhost/fixchgnew/js/smartcom.js'
            }).appendTo("head");*/
                        
            var enqbtn = $("<button/>", {
                'class':'btn btn-general',
                'id':'showgraph',
                'text': monoption.text
            });
            
            el.append(enqbtn);
            
            var months = ['January', 'February','March','April','May','June',
                          'July','August','September','October','November','December'];
            
            var divname = monoption.text + 'div';
            var fulldiv = $("<div/>", {
                'class':'fxpopup',
                'id': divname
            });
            
            var hidefn = 'javascript:hide($("#' + divname + '"));';
            var headdiv = $("<div/>", {
                'class':'boxhead',
            }).append($("<div/>", {
            	'class':'left span5'
            }).append($("<h2/>", {'text': monoption.text }))).append($("<div/>",{
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
                'id':monoption.text
            });

            var msg = $("<div/>", {
                'class':'span5'
            }).append($("<span/>", {
                'class':'badge badge-important',
                'id':'fxmonitormsg',
                'name':'fxmonitormsg',
            }));
            
            var selid = monoption.text + "select";
            var select = $("<select/>", {
                'class':'input-block-level',
                'id':selid
            });
            
            for (i = 0; i < months.length; i++)
            {
                var j = i + 1;
                var val = '' + j;
                if (j < 10)
                    val = '0' + j;
                select.append($("<option/>", {
                    'value':val,
                    'text':months[i]
                }));
            };
            
            var canvasid = "canvas" + monoption.text;
            var acanvas = $("<canvas/>", { 'id': canvasid });
           
	    div.append(msg);
	    div.append(select);
	    div.append(acanvas);
	    
	    fulldiv.append(div);
            el.append(fulldiv);
            
            $(document).ready (function() {
                    var selid = monoption.text + "select";
                    $('#' + selid).change(function() {
                        var val = $('#'+selid).val();
                        var canvas = 'canvas' + monoption.text;
                        showGraph(monoption.flow, monoption.graphkey1, monoption.graphkey2, val, monoption.session, canvas)
                    });
                    
		    $('#showgraph').click(function() {
		    
		    	var dt = new Date();
		    	var month = dt.getMonth() + 1;
		    	var mstr = '' + month;
		    	if (month < 10)
		    	    mstr = '0' + month;
		    	$('#'+selid).val(mstr);
                        var canvas = 'canvas' + monoption.text;
                        showGraph(monoption.flow, monoption.graphkey1, monoption.graphkey2, mstr, monoption.session, canvas)
		    	
		        var divname = '#' + monoption.text + 'div';
			var div = $(divname);
			var divlst = $('#' + monoption.text);

			div.css({top: '150px'});
			div.css({left: '300px'});
			div.css({width: '500px'});
			div.css({height: '500px'});
			divlst.css({width: 'auto'});
			divlst.css({height: 'auto'});
		    });		    
            });
	},
        
        destroy: function() {
        }
    });
})(jQuery);