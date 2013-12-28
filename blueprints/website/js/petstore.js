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
 * This javascript is used by petstore blueprint applications
 * to add data dynamically via AJAX to the different elements.
 * ************************************************************
 **/

 smartconfig.tenant = "kennelindia";

function addDiv(obj, cls)
{
	var divelem = $("<div/>", {
	'class':cls
	});
	obj.append(divelem);

	return divelem;
}

function addAText(obj, href, title, text, cls)
{
	var aelem = $("<a/>", {
	'href':href,
	'title':title,
	'text':text,
    'class':cls
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
    }).append($('<img/>',{
        'src':imgsrc,
        'alt':title
        })
    );
    obj.append(aelem);
    return aelem;
}

function addAImgWidth(obj, href, title, imgsrc, width, height)
{
    var img = 'icon featured-icon ' + imgsrc;
    var aelem = $("<a/>", {
    'href':href,
    'title':title,
    'text-align': 'center',
    }).append($('<img/>',{
        'src':imgsrc,
        'alt':title,
        'width':width,
        'height':height
        })
    );
    obj.append(aelem);
    return aelem;
}

function addItem(addTo, title, desc, cost, id, imgsrc)
{
    var href = "item.html?id=" + id;
    var div = addDiv(addTo, "item-block-1");
    var div2 = addDiv(div, "image-wrapper");
    var image = addDiv(div2, "image");
    var overlay = addDiv(image, "overlay");
    var pos = addDiv(overlay, "position");
    var divtxt = addDiv(pos, "");
    var p = $("<p/>", {
        'text':desc
    });
    divtxt.append(p);
    addAText(divtxt, id, "quickshop", "Quick shop", "quickshop");
    var aitem = addAImg(image, href, title, imgsrc);
    var h2 = $("<h2>");
    var atitle = addAText(h2, href, "", title, "");
    var price = $("<p/>", {
        'text': '$' + cost,
        'class':'price'
    });
    div.append(h2);
    div.append(price);
}

function initQuickShopDetails(id)
{
    var smartconn = createpetanimalconn();
    smartconn.lookupAnimal(id, showbox);
    return false;
}

function showbox(animal)
{
    var quickshopimg = $("#quickshopimage");
    quickshopimg.attr("src", animal.imageURL);
    var quickshophead = $("#quickshophead");
    quickshophead.empty().append(animal.name);
    var quickshoptext = $("#quickshoptext");
    quickshoptext.empty().append(animal.description);
    var quickshopprice = $("#quickshopprice");
    quickshopprice.empty().append('$' + animal.price);
    $('#shopItemId').val(animal.id);
    $('.lightbox').fadeIn(350); //IE does not allow to fadein transparent stuff
    $('.quick-shop').fadeIn(350, pandora.adjustQuickShopPopupPosition());
}

function currentPage()
{
   var path = window.location.pathname.split('/');
   var len = path.length;
   var page = path[len - 1];
   return page;
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

        var smartconn = createpetanimalconn();
        smartconn.searchAnimals(type, displayPet, finishDisplay);
    }

    return true;
}

function finishDisplay(len)
{
    pandora.initQuickShop();
}

function displayPet(animal)
{
    var addTo = $("#petitems");
    addItem(addTo, animal.name, animal.description, animal.price, animal.id, animal.imageURL);
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
                $('#totalprice').empty().append('$' + data.response['totalPrice']);
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
                pandora.closeQuickShopPopup();
            });
       });
    }
    else
    {
        conn.addCartItem(cartId, item, function(data) {
            getCartItems(true);
            pandora.closeQuickShopPopup();
         });
    }
}

function initCartItems(id, cb)
{
    var smartconn = createpetanimalconn();
    smartconn.lookupAnimal(id, cb);
    return false;
}

function addUICartItem(animal)
{
    var div = $('#cartitems');
    var rowdiv = addDiv(div, "row clearfix");
    var itemblock = addDiv(rowdiv, "item-block-1");
    var proddiv = addDiv(rowdiv, "product");
    var qtydiv = addDiv(rowdiv, "quantity");
    var pricediv = addDiv(rowdiv, "price");

    var imgwrapper = addDiv(itemblock, "image-wrapper");
    var img = addDiv(imgwrapper, "image");
    var aimg = addAImg(img, "#", animal.name, animal.imageURL);

    var h4 = $('<h4/>', { 'text': animal.name });
    proddiv.append(h4);

    var qty = $("<input/>", {
        'type' : 'text',
        'value':'1'
    });

    qtydiv.append(qty);

    pricediv.append('$' + animal.price);
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
                initCartItems(val, addOrderItem);
            }
        });
    }
}

function addOrderItem(animal)
{
    var div = $('#purchaseditems');
    var itemdiv = addDiv(div, 'item');
    var imgwrap = addDiv(itemdiv, 'image-wrapper-1');
    var img = addDiv(imgwrap, 'image');
    var aimg = addAImgWidth(img, '#', animal.name, animal.imageURL, '50px', '50px');
    var txtdiv = addDiv(itemdiv, 'text');
    var h3txt = $("<h3/>");
    var atxt = $("<a/>", {
        'class' : 'custom-font-1',
        'href': '#',
        'text' : animal.name
    });
    txtdiv.append(atxt);
    var ptxt = $("<p/>", {
        'text':'$'+animal.price
    });
    txtdiv.append(ptxt);
}

function redirectTo(page,ptype)
{
    var cartId = $('#shoppingcartid').val();
    var href = page + "?shoppingcartid=" + cartId;
    if (ptype != undefined)
        href = href + "&pettype=" + ptype;

    href = href + "&tenant=" + smartconfig.tenant;

    window.location = href;
}

function checkout()
{
    var cartid = $('#shoppingcartid').val();
    if ((cartid != '') && (cartid != undefined))
    {
        var smartconn = createCartconn();
        smartconn.checkOut(cartid, function(data) {
            console.log(data.response['orderId']);
            window.location.replace("checkout.php?orderid=" + data.response['orderId'] + "&tenant=" + smartconfig.tenant);
        });
    }
}

function continueshopping()
{
    var href = "index.php?" + "tenant=" + smartconfig.tenant;

    window.location = href;
}
