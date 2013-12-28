smartconfig.server = "192.168.1.2";
smartconfig.smartPort = 9081;
smartconfig.uploadPort = 9021;

function PetAnimal() {
    this.prime = 'PetAnimal';
    this.callback = '';
    this.endcb = '';

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

    this.listAnimals = function(sz, cb) {
        this.callback = cb;
        this.submitSuccess = this.listcallback;
        this.list(this.prime, sz);
    };

    this.searchAnimals = function(category, cb, ecb) {
        this.callback = cb;
        this.endcb = ecb;
        this.submitSuccess = this.listcallback;
        var searchObj = {};
        searchObj['group'] = this.prime;
        searchObj['queryMap'] = {};
        searchObj['queryMap']['category'] = category;
        this.searchdata(searchObj);
    };

    this.searchAnimalNames = function(nm, cb, ecb) {
        this.callback = cb;
        this.endcb = ecb;
        this.submitSuccess = this.listcallback;
        var searchObj = {};
        searchObj['group'] = this.prime;
        searchObj['queryMap'] = {};
        searchObj['queryMap']['name'] = nm;
        this.searchdata(searchObj);
    };

    this.lookupAnimal = function(id, cb) {
        this.callback = cb;
        this.submitSuccess = this.lookupcallback;
        this.lookup(this.prime, id);
    };

    this.listcallback = function(resp, smartobj) {
        var cnt = 0;
        if (resp instanceof smartresponse) {
            var lresp = resp.response;
            cnt = lresp.list.length;
            console.log(lresp.list.length);
            for (var i = 0; i < lresp.list.length; i++)
            {
                var det = new animaldet();
                det.read(lresp.list[i], this);
                smartobj.callback(det);
            }
            smartobj.endcb(lresp.list.length);
        }
    };

    this.lookupcallback = function(resp, smartobj) {
        if (resp instanceof smartresponse) {
            var lresp = resp.response;
            var det = new animaldet();
            det.read(lresp.list[0], this);
            smartobj.callback(det);
        }
    };

    this.loaddata = function(tenant) {
        this.submitSuccess = function() {};
        var send = {};
        send['fortenant'] = tenant;
        this.postDataTo(send, "LoadPets", "FlowAdmin", "PetAnimalFlow");
    };
};

function animaldet() {
    this.id = '';
    this.category = '';
    this.type = '';
    this.name = '';
    this.price = '';
    this.description = '';
    this.availability = '';
    this.imageURL = '';

    this.read = function(lst, smartcom) {
        this.id = lst.values["id"];
        this.category = lst.values["category"];
        this.type = lst.values["type"];
        this.name = lst.values["name"];
        this.price = lst.values["price"];
        this.description = lst.values["description"];
        this.availability = lst.values["availability"];
        this.imageURL = smartcom.downloadurl(lst.values["imageURL"]);
    };
};


PetAnimal.prototype = new smart();


function createpetanimalconn()
{
    var fsmart = new PetAnimal();
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

    fsmart.flowName = 'PetAnimalFlow';
    return fsmart;
}


