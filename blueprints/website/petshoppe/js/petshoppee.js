/*******************************************************************************
 * SMART - State Machine ARchiTecture
 * Copyright (C) 2012 Individual contributors as indicated by the @authors tag
 *
 * This file is a part of SMART.
 *
 * SMART is a free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * SMART is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see http://www.gnu.org/licenses/
 *
 * ************************************************************
 * HEADERS
 * ************************************************************
 * File: org.anon.smart.d2cache.AbstractD2Cache
 * Author: rsankar
 * Revision: 1.0
 * Date: July 31, 2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * Purpose
 *
 * This javascript is used by Fixchg to add data dynamically
 * ************************************************************
 **/

smartconfig.tenant = "petshoppe";

var actions = [];

function addDiv(obj, cls)
{
	var divelem = $("<div/>", {
	'class':cls
	});
	obj.append(divelem);

	return divelem;
}

function addAText(obj, href, title, text)
{
	var aelem = $("<a/>", {
	'href':href,
	'title':title,
	'text':text
	});
	obj.append(aelem);
	return aelem;
}

function addAImg(obj, href, title, imgsrc)
{
	var img = 'icon featured-icon ' + imgsrc;
	var aelem = $("<a/>", {
	'href':href,
	'title':title,
	'text-align': 'center',
	}).append($('<span/>', {
	    'class': img
	})).append($('<img/>',{
		'src':imgsrc,
		'alt':title
		})
	);
	obj.append(aelem);
	return aelem;
}

function addRating(obj, stars)
{
	var cnt;
	var starcls;
	var ulelem = $('<ul/>', {
	'class':'rating'
	});
	for (cnt = 1; cnt <= 5; cnt++)
	{
		starcls = 'star-on';
		if (cnt > stars) starcls = 'star-off';
		ulelem.append($('<li/>').append($('<i/>', {
			'class':starcls
			}))
		);
	}
	//obj.append(ulelem);

	return ulelem;
}

function addAIconText(obj, href, title, icon, text)
{
	var aelem = $("<a/>", {
	'href':href,
	'title':title
	});
	obj.append(aelem);
	var icon = $('<i/>', {
	'class':icon,
	'text':text
	});
	aelem.append(icon);
	return aelem;
}

function addDropButton(obj, id, title, icon, text)
{
	//var bdiv = addDiv(obj, "btn-group");
	var bdiv = $("<span/>", {
	'class':'amount btn-group'
	});
	var belem = $("<a/>", {
	'class':'btn btn-general',
	'text':text,
	});

	bdiv.append(belem);
	var bddelem = $("<button/>", {
	'class':'btn btn-general dropdown-toggle',
	'data-toggle':'dropdown'
	});

	var selem = $("<span/>", {
	'class':'caret'
	});

	bddelem.append(selem);
	bdiv.append(bddelem);
	var ulelem = $("<ul/>", {
	'class':'dropdown-menu',
	'id':id
	});

	var lielem = $("<li/>");

	for (var actname in actions)
	{
		var action = 'javascript:' + actions[actname] + '("' + actname + '", "' + title + '")';
		var aten = $("<a/>", {
		'class':'title',
		'text': actname,
		'href': action
		});
		lielem.append(aten);
		ulelem.append(lielem);
	}

	bdiv.append(ulelem);
	obj.append(bdiv);
	return bdiv;
}

function addASpanText(obj, href, title, cls, text)
{
	var aelem = $('<a/>', {
	'href':href,
	'title':title
	});
	var spn = addSpan(aelem, cls, text);
	obj.append(aelem);
	return aelem;
}

function addSpan(obj, cls, text)
{
	var spn = $('<span/>', {
	'class':cls,
	'text':text
	});
	obj.append(spn);

	return spn;
}

function addItem(obj, imgurl, title, id, desc, price, list)
{
	var spandiv = addDiv(obj, 'span3');
	var proddiv = addDiv(spandiv, 'wdt-product');
	var prodwrap = addDiv(proddiv, 'wdt-products-wrapper');
	var prodnxtdiv = addDiv(prodwrap, 'wdt-product active show');

    var addtocart = 'javascript:addItemToCart("' + id + '")';
	var aimg = addAImg(prodnxtdiv, addtocart, title, imgurl);
	var h4var = $('<h4/>');
	var nxta = addAText(h4var, addtocart, title, desc);
	prodnxtdiv.append(h4var);
	if (list == 0)
	{
		var pricdiv = addDiv(prodnxtdiv, 'wdt-pricing');
		var spn = addSpan(pricdiv, 'amount', price);
		var cart = addDiv(prodnxtdiv, 'wdt-cart');
		var cartbar = addDiv(cart, 'wdt-cart-bar');
		addAIconText(cartbar, addtocart, title, 'icon-shopping-cart', ' Add To Cart');
	}
	var overlay = addDiv(prodnxtdiv, 'wdt-overlay');
	addASpanText(overlay, addtocart, title, 'amount', price);
	wdtGallery(proddiv);
}

function addProductTo(ul, imgurl, title, id, desc, price, max)
{
	var liind = (ul.children('li').length - 1);
	var li;
	if (liind >= 0)
	{
		li = $(ul.children('li').get(liind));
		if (li.children('div').length >= max)
		{
			li = $('<li/>');
			ul.append(li);
		}
	}
	else
	{
		li = $('<li/>');
		ul.append(li);
	}
	addItem(li, imgurl, title, id, desc, price, 0);
	console.log("Added: " + title + ":" + desc);
}

function addProductToDiv(obj, imgurl, title, id, desc, price, max)
{
	var divind = (obj.children('div').length - 1);
	var div;
	if (divind >= 0)
	{
		div = $(obj.children('div').get(divind));
		if (div.children('div').length >= max)
		{
			div = addDiv(obj, 'row-fluid');
		}
	}
	else
	{
		div = addDiv(obj, 'row-fluid')
	}
	addItem(div, imgurl, title, id, desc, price, 0);
}

function addToSearch(imgurl, title, id, desc, price, max, detail)
{
	var div = $('#petitems');
	addProductToDiv(div, imgurl, title, id, desc, price, max);
}

function displayPet(animal)
{
    addToSearch(animal.imageURL, animal.name, animal.id, animal.description, "$" + animal.price, 4, animal.description)
}

function finishDisplay()
{
}

function currentPage()
{
   var path = window.location.pathname.split('/');
   var len = path.length;
   var page = path[len - 1];
   return page;
}

function initCartItems(id, cb)
{
    var smartconn = createpetanimalconn();
    smartconn.lookupAnimal(id, cb);
    return false;
}

function addUICartItem(animal)
{
    var body = $('#cartitems');
    var tr = $("<tr/>");
    var img = $("<td/>", { 'class':'image' })
        .append($("<a/>", {'href':'#'})
        .append($("<img/>", {'src':animal.imageURL})));
    tr.append(img);

    var prod = $("<td/>", {'class':'product', 'text':animal.name });
    tr.append(prod);

    var qty = $("<td/>", {'class':'stock', 'text':'1'});
    tr.append(qty);

    var price = $("<td/>", { 'class':'price', 'text': '$' + animal.price});
    tr.append(price);
    body.append(tr);
}

function getOrder(order)
{
    if ((order != undefined) && (order != ''))
    {
        var conn = createOrderconn();
        conn.getOrder(order, function(data) {
            console.log(data);
            var cost = '$' + data.response['totalPrice'];
            $('#ordercost').empty().append(cost);
            //populate for cart
            var items = data.response['orderItems'];
            var len = items.length;
            if (len > 2)
                len = 2;
            for (var i = 0; i < len; i++)
            {
                var val = items[i];
                initCartItems(val, addUICartItem);
            }
        });
    }
}

function getCartItems(addcnt)
{
    var cart = $('#shoppingcartid').val();
    if ((cart != undefined) && (cart != ''))
    {
        var conn = createCartconn();
        conn.getCartItems(cart, function(data) {
            console.log(data);
            if (addcnt)
            {
                var items = data.response['totalItems'] + " items";
                $('#shoppingcnt').empty().append(items);
            }
            else
            {
                var cnt = data.response['totalItems'] + " items";
                $('#shoppingcnt').empty().append(cnt);
                //$('#totalprice').empty().append('$' + data.response['totalPrice']);
                //populate for cart
                var items = data.response['items'];
                for (var i = 0; i < items.length; i++)
                {
                    var val = items[i]['actualItem'];
                    initCartItems(val, addUICartItem);
                }
            }
        });
    }
}

function redirectTo(page,ptype)
{
    var cartId = $('#shoppingcartid').val();
    var href = page + "?shoppingcartid=" + cartId;
    if (ptype != undefined)
        href = href + "&pettype=" + ptype;

    window.location = href;
}

function resetPets(type)
{
    var pg = currentPage();
    if (pg != 'index.php')
    {
        redirectTo('index.php');
    }
    else
    {
        var addTo = $("#petitems");
        addTo.empty();

        if ((type == undefined) || (type == ''))
            type = 'FISH';

        $('#category').empty().append(type);
        var smartconn = createpetanimalconn();
        smartconn.searchAnimals(type, displayPet, finishDisplay);
    }

    return true;
}

function addItemToCart(item)
{
    var cartId = $('#shoppingcartid').val();
    var conn = createCartconn();
    if ((cartId == undefined) || (cartId == ''))
    {
       var dt = new Date();
       cart = 'petanimalcart' + dt.getTime();
       conn.create(cart, function() {
           $('#shoppingcartid').val(cart);
            var conn1 = createCartconn();
            conn1.addCartItem(cart, item, function(data) {
                getCartItems(true);
            });
       });
    }
    else
    {
        conn.addCartItem(cartId, item, function(data) {
            getCartItems(true);
         });
    }
}

function checkout()
{
    var cartid = $('#shoppingcartid').val();
    if ((cartid != '') && (cartid != undefined))
    {
        var smartconn = createCartconn();
        smartconn.checkOut(cartid, function(data) {
            console.log(data.response['orderId']);
            window.location.replace("checkout.php?orderid=" + data.response['orderId']);
        });
    }
}

function showBox(div, x, y)
{
    div.css({left: x});
    div.css({top: y});
    div.css({opacity:"1"});
    $('#body-container').css({'pointer-events':'none'})
}

function hideBox(div)
{
    div.css({left: "-500px"});
    div.css({top: "-1000px"});
    div.css({opacity:"0"});
    $('#body-container').css({'pointer-events':'auto'})
}

function redirect(action, val)
{
    if (action == 'Login')
    	window.location.replace("Login.php");

}

function reloadpage()
{
    window.location.reload(false);
}

function addToReqdLinks(cnt, lnk)
{
    var div = $('#reqdlinks');
    var tr = $("<tr/>");
    var td1 = $("<td/>");
    var td2 = $("<td/>");
    var td3 = $("<td/>");
    var td4 = $("<td/>");
    var lnkin = $('<input/>', {
        'class':'input-block-level',
        'type':'text',
        'value':lnk,
        'readonly':'readonly',
        'id':'name' + cnt
    });

    td1.append(lnkin);

    var flows = $('<select/>', {
        'class':'input-block-level',
        'type':'text',
        'id':'flow' + cnt,
        'placeholder':'Enter a flow from which to link'
    });

   /* $("#flow option").each(function() {
        var val = $(this).val();
        var txt = $(this).html();
        flows.append(
            $('<option/>').val(val).html(txt)
        );
    });*/

    td2.append(flows);

    var objs = $('<input/>', {
        'class':'input-block-level',
        'type':'text',
        'id':'object' + cnt,
        'placeholder':'Enter an object to link to'
    });

    td3.append(objs);

    var attr = $('<input/>', {
        'class':'input-block-level',
        'type':'text',
        'id':'attribute' + cnt,
        'placeholder': 'Enter the attribute of the object to link this to'
    });

    td4.append(attr);

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    div.append(tr);
}

function pay(orderid)
{
    var name = $("#inputname").val();
    var email = $("#inputemail").val();
    var phone = $("#inputphone").val();
    var addr1 = $("#inputaddress").val();
    var addr2 = $("#inputaddress1").val();
    var city = $("#inputcity").val();
    var state = $("#inputstate").val();
    var country = $("#inputcountry").val();
    var pin = $("#inputcode").val();
    var payby = "paypal";
    if ($("#inputCheckbox2").is(":checked"))
        payby = "creditcard"
    else if ($("#inputCheckbox3").is(":checked"))
        payby = "netbanking";

    var conn = createPaymentconn();
    conn.payOrder(orderid, function() {
        window.location.replace("confirm.php?orderid=" + orderid);
    }, name, email, phone, addr1, addr2, city, state, country, pin, payby);
}
