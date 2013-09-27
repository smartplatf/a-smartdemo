function init()
{
    $("body").append("<script src='survey-code/resources/js/Survey.js' type='text/javascript'></script>");
    $("body").append("<script src='js/chart.js' type='text/javascript'></script>");
    setDemoSessionId('SurveyDemo1', false);
    setDemoSessionId('SurveyDemo2', true);


}

function setDemoSessionId(tenant, flow) {
    $.ajax({
       url: "checklogin.php",
       type: "POST",
       data: { 'tenant' : tenant }
    })
    .done(function(resp) {
        $('#' + tenant + 'sessid').val(resp);
        if (flow)
        {
            var ul = $("<ul/>", {
                'class' : 'tree bullet_arrow2'
            });

            var li = $("<li/>");
            var ali = $("<a/>", {
                'href' : '#',
                'text':tenant
            });
            li.append(ali);
            var tul = $("<ul/>", {
                'class' : 'tree bullet_arrow2',
                'id':'enabledflows2'
            });

            li.append(tul);
            ul.append(li);
            var div = $('#tenants');
            div.append(ul);

            getEnabledFlows(tenant, "enabledflows2", resp);
        }
    });
};

function showStatus(msg)
{
    $('#message').empty();
    $('#message').append(msg);
};

function showQuestions(tenant) {
    var sess = $('#' + tenant + 'sessid').val();
    var conn = createsurveyconn(tenant, sess);
    $('#enquiries').empty();
    conn.lookupQuestions('demo1questions', function(questionaire) {
        var tbody = $('#' + tenant + 'answers');

        var len = questionaire['questions'].length;
        $('#' + tenant + 'questions').val(len);
        for (var i = 0; i < len; i++)
        {
            var question = questionaire['questions'][i]['question'];

            var td1 = $('<td/>');
            var td2 = $('<td/>');
            var td3 = $('<td/>');
            var td4 = $('<td/>');

            td1.append(question);

            var yes = $('<input/>', {
                'type' : 'radio',
                'name':tenant + 'answer' + i,
                'id':tenant + 'answeryes' + i,
                'value':'aye'
            });
            var no = $('<input/>', {
                'type' : 'radio',
                'name':tenant + 'answer' + i,
                'id':tenant + 'answerno' + i,
                'value':'nay'
            });
            var maybe = $('<input/>', {
                'type' : 'radio',
                'name':tenant + 'answer' + i,
                'id':tenant + 'answermaybe' + i,
                'value':'maybe'
            });

            td2.append(yes);
            td3.append(no);
            td4.append(maybe);

            var tr = $('<tr/>');
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tbody.append(tr);
        }
    });
};

$('#tenant1get').click(function() {
    showQuestions('SurveyDemo1');

});

$('#tenant2get').click(function() {
    showQuestions('SurveyDemo2');

});

function postanswers(tenant, email)
{
    var cnt = $('#' + tenant + 'questions').val();
    var answers = [];

    for (var i = 0; i < cnt; i++)
    {
        var nm = 'input[name=' + tenant + 'answer' + i + ']:checked';
        var ans = $(nm).val();
        console.log(ans);
        onea = {};
        onea['answer'] = ans;
        answers.push(onea);
    }

    var sess = $('#' + tenant + 'sessid').val();
    var conn = createsurveyconn(tenant, sess);
    conn.recordAnswer('demo1questions', answers, email, function() {
        showStatus('Recorded Answer');
    });
}

function showResults(tenant, resp)
{
    var lst = resp['summary'];

    var dataset1 = [];
    var dataset2 = [];
    var dataset3 = [];
    var lbls = [];

    var len = lst.length;
    for (var i = 0; i < len; i++)
    {
        lbls[i] = i;
        dataset1[i] = lst[i]['ayes'];
        dataset2[i] = lst[i]['nays'];
        dataset3[i] = lst[i]['maybes'];
    }
    var ret = {};
    ret['labels'] = lbls;

    var d1set = {};
    d1set['fillColor'] = "rgba(220,220,220,0.5)";
    d1set['strokeColor'] = "rgba(220,220,220,1)";
    d1set['data'] = dataset1;

    var d2set = {};
    d2set['fillColor'] = "rgba(151,187,205,0.5)";
    d2set['strokeColor'] = "rgba(151,187,205,1)";
    d2set['data'] = dataset2;

    var d3set = {};
    d3set['fillColor'] = "rgba(151,187,205,0.5)";
    d3set['strokeColor'] = "rgba(151,187,205,1)";
    d3set['data'] = dataset3;

    ret['datasets'] = [d1set, d2set, d3set];
    var c = new Chart(document.getElementById(tenant + 'results').getContext("2d")).Bar(ret);
}

function showsummary(tenant)
{
    var sess = $('#' + tenant + 'sessid').val();
    var conn = createsurveyconn(tenant, sess);
    $('#enquiries').empty();
    conn.lookupSurvey('demo1questions', function(resp) {
        showResults(tenant, resp);
    });
}

$('#tenant1results').click(function() {
    showsummary('SurveyDemo1');
});

$('#tenant2results').click(function() {
    showsummary('SurveyDemo2');
});

$('#tenant1survey').submit(function(e) {
    e.preventDefault();

    var tenant = 'SurveyDemo1';
    postanswers(tenant);
    return false;
});

$('#tenant2survey').submit(function(e) {
    e.preventDefault();
    var tenant = 'SurveyDemo2';
    postanswers(tenant, $('#email').val());

    return false;
});

