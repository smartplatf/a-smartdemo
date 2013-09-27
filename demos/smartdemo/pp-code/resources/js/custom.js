function init()
{
    $("body").append("<script src='pp-code/cart/resources/js/Cart.js' type='text/javascript'></script>");
    $("body").append("<script src='pp-code/catalogue/resources/js/Catalogue.js' type='text/javascript'></script>");
    $("body").append("<script src='pp-code/review/resources/js/ReviewDetail.js' type='text/javascript'></script>");
}

function showCatalogue(tbody, nm) {
    var conn = createcatalogueconn();
    conn.listCatalogue(5, function(data) {

            var td1 = $("<td/>");
            var td2 = $("<td/>");
            var td3 = $("<td/>");
            var td4 = $("<td/>");

            var select = $('<input/>', {
                'type' : 'radio',
                'name': nm,
                'id': 'reviewObject',
                'value':data['skuId']
            });

            td1.append(select);
            td2.append(data['skuId']);
            td3.append(data['productName']);
            td4.append(data['cost']);

            var tr = $('<tr/>');
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);

            tbody.append(tr);
    });
};

$('#showproducts').click(function() {
    var tbody = $('#catalogue');
    showCatalogue(tbody, 'reviewObject');
});

$('#showcartproducts').click(function() {
    var tbody = $('#cartcatalogue');
    showCatalogue(tbody, 'cartItem');
});

$('#writereview').submit(function(e) {
    e.preventDefault();

    var conn = createReviewDetailconn();
    var nm = 'input[name=reviewObject]:checked';
    var robj = $(nm).val();

    var txt = $('#reviewText').val();
    var rate = $('#rating').val();

    conn.WriteReview(robj, txt, rate, function() {

    });

    return false;
});

function getCartItems()
{
    var cart = $('#cartName').val();
    if ((cart != undefined) && (cart != ''))
    {
        var conn = createCartconn();
        conn.getCartItems(cart, function(data) {
            console.log(data);
            var tbody = $('#cart');
            tbody.empty();
            var items = data.response['items'];
            for (var i = 0; i < items.length; i++)
            {
                var td = $('<td/>');
                var tr = $('<tr/>');

                var val = items[i]['actualItem'];
                td.append(val);
                tr.append(td);
                tbody.append(tr);
            }
        });
    }
}

$('#addcart').submit(function(e) {
    e.preventDefault();

    var conn = createCartconn();
    var nm = 'input[name=cartItem]:checked';
    var item = $(nm).val();

    var cart = $('#cartName').val();
    if ((cart == undefined) || (cart == ''))
    {
       var dt = new Date();
       cart = 'cart' + dt.getTime();
       conn.create(cart, function() {
           $('#cartName').val(cart);
            var conn1 = createCartconn();
            conn1.addCartItem(cart, item, function(data) {
                getCartItems();
            });
       });
    }
    else
    {
        conn.addCartItem(cart, item, function(data) {
            getCartItems();
        });
    }

    return false;
});
