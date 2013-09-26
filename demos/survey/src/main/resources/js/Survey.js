function Survey() {
    this.prime = 'Questionaire';
    this.callback = '';

    this.createcallback = function(resp, smartobj) {
        smartobj.callback(resp);
    };

    this.lookupQuestions = function(questionaire, cb) {
        this.callback = cb;
        this.submitSuccess = this.listcallback;
        this.lookup(this.prime, questionaire);
    };

    this.lookupSurvey = function(questionaire, cb) {
        this.callback = cb;
        this.submitSuccess = this.listcallback;
        this.lookup('Survey', questionaire);
    };

    this.listcallback = function(resp, smartobj) {
        var cnt = 0;
        if (resp instanceof smartresponse) {
            var lresp = resp.response;
            cnt = lresp.list.length;
            console.log(lresp.list.length);

            for (var i = 0; i < lresp.list.length; i++)
            {
                smartobj.callback(lresp.list[i].values);
            }
        }
    };

    this.recordAnswer = function(questionaire, ans, email, cb) {
        var send = {};
        send['answers'] = ans;
        if ((email != undefined) && (email != ''))
            send['email'] = email;
        this.callback = cb;
        this.submitSuccess = this.createcallback;
        this.postDataTo(send, "RecordAnswer", 'Survey', questionaire);
    };
};

Survey.prototype = new smart();


function createsurveyconn(ten, sess)
{
    smartconfig.tenant = ten;
    var fsmart = new Survey();
    fsmart.sessionId = sess;
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

    fsmart.flowName = 'SurveyFlow';
    return fsmart;
}


