function Order() {
    this.prime = 'Order';
    this.callback = '';

    this.createmessage = function(form, cb) {
        console.log("create message");
        var json = $(form).serializeObject();
        this.callback = cb;
        this.submitSuccess = this.createcallback;
        this.createPrime(this.prime, JSON.stringify(json));
    };

    this.createcallback = function(resp, smartobj) {
        smartobj.callback(resp);
    };

    this.listMessages = function(sz, cb) {
        this.callback = cb;
        this.submitSuccess = this.listcallback;
        this.list(this.prime, sz);
    };

    this.listcallback = function(resp, smartobj) {
        var cnt = 0;
        if (resp instanceof smartresponse) {
            var lresp = resp.response;
            cnt = lresp.list.length;
            console.log(lresp.list.length);
            for (var i = 0; i < lresp.list.length; i++)
            {
                smartobj.callback(lresp.list[i].values['order']);
            }
        }
    };

    this.getOrder = function(order, cb) {
        this.callback = cb;
        this.submitSuccess = this.createcallback;
        var send = {};
        this.postDataTo(send, "GetOrder", this.prime, order);
    };
};

Order.prototype = new smart();


function createOrderconn()
{
    var fsmart = new Order();
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

    fsmart.flowName = 'OrderFlow';
    return fsmart;
}


