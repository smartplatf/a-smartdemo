function Contact() {
    this.prime = 'Contact';
    this.prime2 = 'Enquiry';
    this.callback = '';

    this.create = function(form, cb) {
        console.log("create contact");
        var json = $(form).serializeObject();
        this.callback = cb;
        this.submitSuccess = this.createcallback;
        this.createPrime(this.prime, JSON.stringify(json));
    };

    this.createcallback = function(resp, smartobj) {
        smartobj.callback(resp);
    };

    this.listEnquires = function(sz, cb) {
        this.callback = cb;
        this.submitSuccess = this.listcallback;
        this.list(this.prime2, sz);
    };

    this.listcallback = function(resp, smartobj) {
        var cnt = 0;
        if (resp instanceof smartresponse) {
            var lresp = resp.response;
            cnt = lresp.list.length;
            console.log(lresp.list.length);
            for (var i = 0; i < lresp.list.length; i++)
            {
                smartobj.callback(lresp.list[i].values['id'], lresp.list[i].values['name'], lresp.list[i].values['email'],
                        lresp.list[i].values['phone'], lresp.list[i].values['subject'], lresp.list[i].values['message']);
            }
        }
    };

    this.enquire = function(name, cname, sub, msg, email, phone, cb) {
        this.callback = cb;
        this.submitSuccess = this.createcallback;

        //Add your event data here.
        //send['yourfld'] = 'yourvalue'
        var send = {};
        send["subject"] = sub;
        send["message"] = msg;
        send["name"] = cname;
        send["email"] = email;
        send["phone"] = phone;

        this.postDataTo(send, "Enquire", this.prime, name);
    };

    this.closeEnquiry = function(id, cb) {
        this.callback = cb;
        this.submitSuccess = this.createcallback;
        var send = {};
        this.postDataTo(send, "CloseEnquiry", 'Enquiry', id);
    };
};

Contact.prototype = new smart();


function createContactconn()
{
    var fsmart = new Contact();
    fsmart.sessionId = smartconfig.userSession;
    fsmart.submitSuccess = function(response) {
    	console.log(JSON.stringify(response));
    };

    fsmart.submitFailure = function(error) {
        console.log(JSON.stringify(error));
        showStatus(error.responses.errors);
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

    fsmart.flowName = 'ContactFlow';
    return fsmart;
}


