function Payment() {
    this.prime = 'Payment';
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
                smartobj.callback(lresp.list[i].values['payment']);
            }
        }
    };

    this.payOrder = function(orderid, cb, name, email, phone, addr1, addr2, city, state, country, pin, payby) {
        var send = {};
        send['name'] = name;
        send['email'] = email;
        send['phone'] = phone;
        send['addr1'] = addr1;
        send['addr2'] = addr2;
        send['city'] = city;
        send['state'] = state;
        send['country'] = country;
        send['pincode'] = pin;
        send['payBy'] = payby;

        this.callback = cb;
        this.submitSuccess = this.createcallback;
        this.postDataTo(send, "PayEvent", "Order", orderid);
    };
};

Payment.prototype = new smart();


function createPaymentconn()
{
    var fsmart = new Payment();
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

    fsmart.flowName = 'PaymentFlow';
    return fsmart;
}


