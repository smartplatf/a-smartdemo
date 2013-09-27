function setupcode(url, divid, type) {
    $('#codetitle').empty();
    $('#codetitle').append(url);
    $.ajax({
      url: url,
      cache: false
      })
      .done(function( html ) {
        var editor = ace.edit(divid);
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/" + type);
        editor.setReadOnly(true);
        editor.setValue( html );
        editor.navigateTo(0, 0);
      });
};

function setupeditor(divid, type)
{
    var editor = ace.edit(divid);
    editor.setTheme("ace/theme/textmate");
    editor.getSession().setMode("ace/mode/" + type);
    editor.setReadOnly(true);
    editor.getSession().setUseWrapMode(true);
    editor.navigateTo(0, 0);
};

function logeditor(divid, text)
{
    var editor = ace.edit(divid);
    editor.navigateTo(0, 0);
    editor.insert(text + "\n");
}

function setupsmart(fsmart, flow)
{
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

    fsmart.flowName = flow;
    return fsmart;
}


function populateFlows(resp, nm)
{
    var ignore = ['Security', 'AdminSmartFlow', 'Monitor', 'AllFlows'];
    if (resp instanceof smartresponse) {
        var lresp = resp.response;
        cnt = lresp.enabledFlows.length;
        console.log(lresp.enabledFlows.length);
        var ul = $('#' + nm);
        for (var i = 0; i < lresp.enabledFlows.length; i++)
        {
            if ($.inArray(lresp.enabledFlows[i], ignore) == -1)
            {
                var li = $("<li/>");
                li.append(lresp.enabledFlows[i]);
                ul.append(li);
            }
        }
    }
}

function getEnabledFlows(tenant, nm, sessid) {
    var smart = new smartadmin();
    setupsmart(smart, 'AdminSmartFlow');
    if (sessid != undefined)
        smart.sessionId = sessid;
    smart.submitSuccess = function(resp) {
        populateFlows(resp, nm);
    }
    smart.listEnabledFlows(tenant);
};

function setSessionId(tenant) {
    $.ajax({
       url: "checklogin.php",
       type: "POST",
       data: { 'tenant' : tenant }
    })
    .done(function(resp) {
        smartconfig.userSession = resp;
        getEnabledFlows(tenant, "enabledflows");
    });
};

function showsetup(cnt)
{
    var vals = setupparms[cnt];
    $('#posttitle').empty();
    $('#posttitle').append(vals['title']);
    $('#posturi').empty();
    $('#posturi').append(vals['uri']);
    $('#postdata').empty();
    var d = JSON.stringify(vals['data'], null, 2);
    $('#postdata').append(d);
    $('#postcomments').empty();
    $('#postcomments').append(vals['comments']);
}

function showdoc(doc)
{
    var url = 'documentation/' + doc + '.html';
    $.ajax({
      url: url,
      cache: false
      })
      .done(function( html ) {
        var editor = $('#eventdet');
        editor.empty();
        editor.append( html );
      });
}
