function Cart() {
    this.prime = 'Cart';
    this.callback = '';

    this.create = function(cartName, cb) {
        console.log("create data");
        this.callback = cb;
        this.submitSuccess = this.createcallback;
        var add = {};
        add['cartName'] = cartName;
        this.createPrime(this.prime, JSON.stringify(add));
    };

    this.createcallback = function(resp, smartobj) {
        smartobj.callback(resp);
    };

    this.getCartItems = function(cartName, cb) {
        this.callback = cb;
        this.submitSuccess = this.createcallback;
        var send = {};
        this.postDataTo(send, "GetCartItems", this.prime, cartName);
    };

    this.addCartItem = function(cartName, item, cb) {
        console.log("Calling event for " + cartName);
        this.callback = cb;
        this.submitSuccess = this.createcallback;

        //Add your event data here.
        //send['yourfld'] = 'yourvalue'
        var send = {};
        send['cartItem'] = item;

        this.postDataTo(send, "AddToCart", this.prime, cartName);
    };
};

Cart.prototype = new smart();


function createCartconn()
{
    var fsmart = new Cart();
    fsmart.sessionId = smartconfig.userSession;
    fsmart.submitSuccess = function(response) {
    	console.log(JSON.stringify(response));
    };

    fsmart.submitFailure = function(error) {
        console.log(JSON.stringify(error));
    };

    fsmart.submitStart = function() {
    };

    fsmart.submitEnd = function() {
    };

    fsmart.submitProgress = function(pct) {
    };

    fsmart.networkFailure = function(error) {
        console.log(JSON.stringify(error));
    };

    fsmart.flowName = 'CartFlow';
    return fsmart;
}


