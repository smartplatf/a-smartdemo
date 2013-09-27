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
 * File: fxcontact flow javascript 
 * Author: rsankar 
 * Revision: 1.0 
 * Date: July 31, 2013
 *
 * ************************************************************ 
 * REVISIONS
 * ************************************************************ 
 * Purpose
 *
 * This javascript is used for retrieving monitor data
 * ************************************************************
 **/

function smartmonitor() {
    this.dataset = {};
    this.datasetmax = 0;
    this.callback = '';
    
    this.monitorcallback = function(resp, smartobj) {
        if (resp instanceof smartresponse) {
            var lresp = resp.response;
            console.log(lresp.list.length);
            for (var i = 0; i < lresp.list.length; i++)
            {
                var key = lresp.list[i].values['key'];
                var counter = lresp.list[i].values['counter'];
                var grp = lresp.list[i].values['group'];
                key = key.substr(4);
                if (!(key in smartobj.dataset))
                    smartobj.dataset[key] = {};
                smartobj.dataset[key][grp] = counter;
                if (counter > this.datasetmax)
                    this.datasetmax = counter;
            }
            
            smartobj.callback();
        }        
    };
    
    this.eventTimeBasedCounter = function(flow, group, starttime, endtime, cb) {
        this.callback = cb;
        this.submitSuccess = this.monitorcallback;
        var send = {};
        send['flow'] = flow;
        send['group'] = group;
        send['monitortype'] = 'tcnt';
        send['hooktype'] = 'evt';
        send['startTime'] = starttime;
        send['endTime'] = endtime;
        this.postDataTo(send, "ReadMonitorData", 'FlowAdmin', 'Monitor');
    };    
};

smartmonitor.prototype = new smart();


function createmonitorconn(session)
{
    smartconfig.userSession = session;
    var fsmart = new smartmonitor();
    fsmart.sessionId = smartconfig.userSession;
    fsmart.submitSuccess = function(response) {
    	console.log(JSON.stringify(response));
    	if ((response.message != '') && (response.message != undefined))
    	    $('#fxcontactmsg').empty().append( response.message );
    	else
    	    $('#fxcontactmsg').empty().append( JSON.stringify(response) );
    };
    
    fsmart.submitFailure = function(error) {
        var msg = error.response.errors[0].context;
	$('#fxcontactmsg').empty().append(msg);
    };
    
    fsmart.submitStart = function() {
    };

    fsmart.submitEnd = function() {
    };
    
    fsmart.submitProgress = function(pct) {
    };
    
    fsmart.networkFailure = function(error) {
        $('#fxcontactmsg').empty().append(error);
    };
    
    fsmart.flowName = 'Monitor';
    return fsmart;
}

	
function createChartData(fsmart, key1, key2)
{
    var dataset1 = [];
    var dataset2 = [];
    var lbls = [];
    
    for (var lbl in fsmart.dataset)
    {
        lbls[i] = lbl;
        if (key1 in fsmart.dataset[lbl])
            dataset1[i] = fsmart.dataset[lbl][key1];
        else
            dataset[i] = 0;
            
        if (key2 in fsmart.dataset[lbl])
            dataset2[i] = fsmart.dataset[lbl][key2];
        else
            dataset2[i] = 0;
            
        i++;
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
    ret['datasets'] = [d1set, d2set];
    
    return ret;
}

function hide(div)
{
	div.css({top: '-1000px'});
	div.css({left: '-300px'});
}


function showGraph(flow, key1, key2, month, sess, canvas)
{   
    var start = month + '/01/2012 00:00';
    var end = month + '/30/2013 23:59'; //TODO change to 31 for different months
    var fsmart = createmonitorconn(sess);
    fsmart.eventTimeBasedCounter(flow, key1, start, end, function() {
        fsmart.eventTimeBasedCounter(flow, key2, start, end, function()
        {
	    var bardata = createChartData(fsmart, 'ContactNotification', 'CloseEnquiry');
	    var steps = fsmart.datasetmax;
	    var stepwidth = (steps / 10); //show in 10 steps
	    
	    if (steps <= 5)
	        stepwidth = 1;
	    else if ((steps > 5) && (steps <= 10))
	        stepwidth = 2;
	    else if ((steps > 10) && (steps <= 20))
	        stepwidth = 5;
	    
	    var myLine = new Chart(document.getElementById(canvas).getContext("2d")).Bar(bardata,
	        {
	   	    'scaleOverride':true,
		    'scaleStepWidth':stepwidth,
		    'scaleStartValue':0,
		    'scaleSteps':steps
	        });
	     //should be shown by the widget
	    //showBox($('#contactgraphdiv'), '250px', '150px');
        });
    });
}

