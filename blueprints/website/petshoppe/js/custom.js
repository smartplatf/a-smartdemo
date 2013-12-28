	jQuery(document).ready(function() {
		$('#layerslider').layerSlider({
			skinsPath : 'layerslider/skins/',
			skin : 'fullwidth',
			thumbnailNavigation : 'hover',
			hoverPrevNext : true,
			autoPlayVideos          : false,
			responsive : true,
			responsiveUnder : 1170,
			sublayerContainer : 1170,
			showCircleTimer     : false,
		});
		
	$('.main-slider').flexslider({
        slideshow: false
      });
	
  
	  $('.typeahead').typeahead()
	  
      /* RS - This needs to be done only after adding products 
      $('.top-flows, .recently-added, .clients').flexslider({
        animation: 'slide',
        slideshow: true,
        animationLoop: true,
        controlNav: false
      });*/
      $('.recent-blog, .testimonials').flexslider({
        animation: 'slide',
        slideshow: false,
        animationLoop: false,
        controlNav: false
      });
	  
	$("#countdown").countdown({
		date: "23 december 2013 23:59:59", // add your date here.
		format: "on"
	},
	function() { 
		alert("done!") 
	});		
		
	$(function () {
		$('#wdtTab a:first').tab('show');
	})
	
	
		$(".hover").hover(
		function () {
			$("ul.topcart").slideDown(500);
		}, 
		function () {
			alert($("ul.topcart"));
			$("ul.topcart").slideUp(500);
		}
	);


    $('.social, .store-categories, .display').tooltip({
      selector: "a[data-toggle=tooltip]"
    })

    $('.social, .store-categories, .display').tooltip()
	
	});
	
	jQuery(window).scroll(function(){
		if (jQuery(this).scrollTop() > 1) {
			jQuery('.wdttop').css({bottom:"25px"});
		} else {
			jQuery('.wdttop').css({bottom:"-100px"});
		}
	});
	jQuery('.wdttop').click(function(){
		jQuery('html, body').animate({scrollTop: '0px'}, 800);
		return false;
	});
	
jQuery(document).ready(function() {
	/*jQuery(document).find('.wdt-product').each(function(i, widget) {
		widget = jQuery(widget);
		
		if(!widget.hasClass('active')) {
			widget.addClass('active');
			wdtGallery(widget);
		}
		
	});*/
    $('#confirmPassword').on('focusout', function() {
	passwordMatch();
    });
    
    $('#FlowName').on('focusout', function() {
	var fixchg = createfixchgconn();
	fixchg.availableFxFlow($('#FlowName').val(), function(present) {
	    if (present == 1)
	    {
		var v = $('#FlowName').val();
		$('#FlowName').val('');
		$('#FlowName').attr('Placeholder', v + ' is already used, please select a different flow name');
	    }
	});
    });

    $('#SoaName').on('focusout', function() {
	var fixchg = createfixchgconn();
	fixchg.availableSoaName($('#SoaName').val(), function(present) {
	    if (present == 1)
	    {
		var v = $('#SoaName').val();
		$('#SoaName').val('');
		$('#SoaName').attr('Placeholder', v + ' is already used, please modify your jar file with a different name and upload.');
	    }
	});
    });
});

var wdtGallery = function(widget) {
	
	widget.find('.wdt-product').each(function(i, img) {
		img = jQuery(img);
		
		img.mouseenter(function() {
			widget.attr('data-stop', 1);
			img.addClass('hover');
		});
		
		img.mouseleave(function() {
			widget.attr('data-stop', 0);
			img.removeClass('hover');
		});		
		});
};


$('#uploadform').submit(function() {
	// submit the form
	//$(this).ajaxSubmit(function(data) { alert('submitted ' + data); });
	var validate = validateJarUpload();
	console.log("Submitting form upload " + validate);
	if (validate)
	{
	    var asmart = createarchivesconn();
	    console.log(asmart.sessionId);
	    asmart.upload($(this), function(data) 
	        {
	            if (data.iserror)
	            {
	                alert("Problem uploading file. " + data);
	                return;
	            }
	            var file = data.response.uploadfilename;
	            //var file = $('#uploadFile').val();
	            alert ("Uploaded successfully " + file); 
	            //window.location.replace("createflow.php?title=" + file);
	            setupCreateFlow(file);
	        });	        
	}
	// return false to prevent normal browser submit and page navigation
	return false;
});

$('#newflow').submit(function(e){
    e.preventDefault();
    console.log("Overridden submit");
    var validated = validateCreate();
    if (!validated)
	return false;

    var form = $('#newflow');
    var asmart = createarchivesconn();
    asmart.convertToFlow(form, $('#archive').val(), function(response) {
	//window.location.replace("Dashboard.php");
	if ($('#created-ul') != null)
	{
	    $('#created-ul').empty();
	    var fxchg = createfixchgconn();
	    fxchg.searchMyFlows(smartconfig.user, 'created', addToCreated, 'icon-share');
	    
	    $('#myarchives-ul').empty();
            var archives = createarchivesconn();
            archives.listfiles(smartconfig.user, addToNewFlows, 'icon-file');

	}
	if (response.message != '')
	    $('#messagespace').empty().append(response.message);
	else
	    $('#messagespace').empty().append(JSON.stringify(response));
	hideBox($('#createflowdiv'));
    });

    return false;
});

function reload() {
	if ($('#myarchives-ul') != null)
	{
	    $('#myarchives-ul').empty();
	    var archives = createarchivesconn();
	    archives.listfiles(smartconfig.user, addToNewFlows, 'icon-file');

	}
};


 function setupCreateFlow(title) {
    var asmart = createarchivesconn();
    asmart.details(title, function(obj) {
	if (obj.currentstate == 'inactive')
	{
	    alert('Cannot create flow from an inactive archive');
	    $('#createflow').attr('disabled', 'disabled');
	    return false;
	}

	JarFile.value = obj.values['ArchiveFile'];
	archive.value = obj.values['ArchiveName'];
	$('#jarfilehead').empty().append("Jar File: " + obj.values['ArchiveName']);
	$('#datehead').empty().append("Uploaded on: " + obj.values['uploadedDate']);
	var soafiles = obj.values['soaFiles'];
	console.log(soafiles.length);
	$('#SoaFile').empty();
	for (var i = 0; i < soafiles.length; i++)
	{
	    $('#SoaFile').append($('<option/>', {
		value : soafiles[i],
		text : soafiles[i]
		}));
	}
	showBox($('#createflowdiv'), '250px', '20px');
    });
};

function changePassword() {
   showBox($('#changepwddiv'), '250px', '150px');
};

function passwordMatch()
{
    var pwd = $('#credential').val();
    var cpwd = $('#confirmPassword').val();
    if (pwd != cpwd)
    {
	$('#confirmPassword').val('');
	$('#confirmPassword').attr('Placeholder', "The Password does not match the confirm password. Please re-enter.");
    }
};


$('#changepwd').submit(function(e){
    e.preventDefault();
    console.log("Change pwd Overridden submit");
    var usmart = createfixchgconn();
    var action = usmart.changePassword($('#changepwd'), function(data) {
	hideBox($('#changepwddiv'));
    	$('#messagespace').empty().append(data);
    });
});


function subscribeTo() {
    var email = $('#subscribeaddr').val();
    var name = $('#subscribename').val();
    var fsub = createsubconn();
    fsub.subscribeto(email, name);
};

function unsubscribeFrom() {
    var email = $('#subscribeaddr').val();
    var name = $('#subscribename').val();
    var fsub = createsubconn();
    fsub.unsubscribe(email);
};
