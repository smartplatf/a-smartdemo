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
 * File: smartcom
 * Author: arjunb
 * Revision: 1.0
 * Date: July 31, 2013
 *
 * ************************************************************
 * REVISIONS
 * ************************************************************
 * Purpose
 *
 * This javascript is used by Smart js communicate to SMART server
 * ************************************************************
 **/
/****************************************** CONSTANTS *************************************************/
var FUNCTION_NOT_FOUND_EXCEPTION = "FUNCTION_NOT_DEFINED_EXCEPTION: success or/and failure callback function was (were) not defined";
var SMART_FIELDS_MISSING_EXCEPTION = "SMART_FIELDS_MISSING_EXCEPTION: tenant, server, protocol, port fields are mandatory to proceed";

var URL_SEPARATOR = "/";
var PORT_SEPARATOR = ":";
var PROTOCOL_SEPARATOR = "://";

var SMART_ACTION_LOOKUP = 'lookup';
var FLOW_ADMIN = 'FlowAdmin';
var TENANT_ADMIN = 'TenantAdmin';
var SMART_OWNER = 'SmartOwner';
var ADMIN_SMART_FLOW = 'AdminSmartFlow';
var SECURITY_FLOW = 'Security';

var SEARCH_EVENT = 'SearchEvent';
var LOOKUP_EVENT = 'LookupEvent';
var LISTALL_EVENT = 'ListAllEvent';
var CREATE_PRIME_EVENT = 'CreatePrime';
var UPDATE_PRIME_EVENT = 'UpdatePrime';

//var DEFINE_PRIME_EVENT = 'DefinePrime';
var GET_JAVASCRIPT_EVENT = 'GetJavaScript';
var CHECK_EXISTENCE_EVENT = "CheckExistence";

var FORM_EVENT_ATTRIBUTES = ['lookup', 'search', 'list', 'deploy', 'createTenant', 'enableFlow', 'createPrime', 'updatePrime', 'definePrime', 'upload', 'getTemplates', 'getTemplateMeta', 'getPrimeMeta', 'getJavaScript', 'checkExistence', 'listDeployments', 'register', 'activateUser', 'mail', 'statusCheck', 'listEnabledFlows'];

/******************************************* SMART OBJECT ********************************************/
var smartconfig = {
    'protocol' : 'http',
    'server' : 'localhost',
    'smartPort' : 9081,
    'uploadport' : 9021,
    'tenant' : '',
    'userSession' : '',
    'adminSession' : '',
    'user' : ''
};

function smart() {
    this.flowName = '';
    this.formEventName = '';
    this.submitSuccess = '';
    this.submitFailure = '';
    this.submitProgress = '';
    this.submitStart = '';
    this.submitEnd = '';
    this.networkFailure = '';
    this.targetUrl = '';
    this.dataSubmit = {};
    this.dataResponse = {};
    this.errors = {};
    this.exception = '';
    this.sessionId = '';

    //find using key
    this.lookup = function(classToLookIn, lookForKey) {
        var lookupObj = {};
        lookupObj['group'] = classToLookIn;
        lookupObj['key'] = lookForKey;
        validateAndPost(lookupObj, this, "LookupEvent", ["group", "key"], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    //search functionality
    this.search = function(classToLookIn, fieldToFind, havingValue, size) {
        var searchObj = {};
        searchObj['group'] = classToLookIn;
        searchObj['queryMap'] = {};
        searchObj['queryMap'][fieldToFind] = havingValue;
        if (size != undefined)
            searchObj['size'] = size;
        validateAndPost(searchObj, this, "SearchEvent", ["group", "queryMap"], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    //search functionality
    this.searchdata = function(searchObj) {
        validateAndPost(searchObj, this, "SearchEvent", ["group", "queryMap"], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    //list all data for a flow
    this.list = function(classToLookIn, resultSize) {
        var listObj = {};
        listObj['group'] = classToLookIn;
        listObj['size'] = resultSize;
        validateAndPost(listObj, this, "ListAllEvent", ["group", "size"], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    //create prime data for a flow
    this.createPrime = function(createClass, dataToCreate) {
        var createPrimeObj = {};
        createPrimeObj['create'] = createClass;
        createPrimeObj['data'] = dataToCreate;
        validateAndPost(createPrimeObj, this, "CreatePrime", ["create", "data"], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    //update prime data of a flow
    this.updatePrime = function(createClass, dataToUpdate, keyValueForData) {
        if (keyValueForData != undefined && keyValueForData != null && keyValueForData != " ") {
            var updatePrimeObj = {};
            updatePrimeObj['update'] = createClass;
            updatePrimeObj['data'] = dataToUpdate;
            validateAndPost(updatePrimeObj, this, "UpdatePrime", ["update", "data"], smartconfig.tenant, this.flowName, FLOW_ADMIN, keyValueForData);
        } else {
            throw "SMART EXCEPTION: Key field mandatory for update event;";
        }
    };

    //this configures for static key, need to add for other configurations
    this.configFlow = function(type, cfor, values) {
    	var config = {};
    	config['configName'] = type;
    	config['configValues'] = JSON.stringify(values);
    	config['staticKey'] = cfor;
    	validateAndPost(config, this, "ConfigFlow", [], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    //pagination event
    this.getListings = function(primeClass, pageNumber, itemsPerPage) {
        var listingsObject = {};
        listingsObject['group'] = primeClass;
        listingsObject['listingsPerPage'] = itemsPerPage;
        listingsObject['pageNum'] = pageNumber;
        validateAndPost(listingsObject, this, "GetListings", ["group", "listingsPerPage", "pageNum"], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    this.configStatic = function(configvalues, configname, statickey)
    {
        var data = {};
        data['configValues'] = configvalues;
        data['configName'] = configname;
        data['staticKey'] = statickey;
        validateAndPost(data, this, "ConfigFlow", [], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    this.connect = function() {
        smartConnect(this);
    };

    this.upload = function(form, callback) {
        var action = buildUrl(this, "UploadEvent", smartconfig.tenant, this.flowName);
        form.attr("action", action)
        var smartobj = this;
        form.ajaxSubmit({
		beforeSend: function(e)
		{
	            e.setRequestHeader("Session-Id", smartobj.sessionId);
		    smartobj.submitStart();
		},
		success: function(data)
		{
		    smartobj.submitProgress(100);
                    var resp = createResponse(data);
		    callback(resp);
		    smartobj.submitEnd();
		},
		error: function()
		{
		    smartobj.submitProgress(100);
		    smartobj.submitEnd();
		}
	});
    };

    this.changePassword = function(form, callback) {
        var smartobj = this;
        form.ajaxSubmit({
            beforeSend: function(e) {
	            e.setRequestHeader("Session-Id", smartobj.sessionId);
		    smartobj.submitStart();
            },
            success: function(data) {
		    smartobj.submitProgress(100);
		    callback(data);
		    smartobj.submitEnd();
            },
            error: function() {
		    smartobj.submitProgress(100);
		    smartobj.submitEnd();
            }
        });
    };

    this.downloadurl = function(filename) {
        var download = buildUrl(this, "DownloadEvent", smartconfig.tenant, this.flowName);
        var file = filename.replace("C:\\fakepath\\", ""); //this is just temporary, so we can cont further
        download = download + URL_SEPARATOR + file;
        return download;
    };

    this.postDataTo = function(data, event, keyname, keyvalue) {
        validateAndPost(data, this, event, [], smartconfig.tenant, this.flowName, keyname, keyvalue);
    };

    // form upload to smart
    this.form = function(formId, e) {
        e.preventDefault();
        checkPrerequisits(this);
        // make sure that the form has an event attribute. Else throw an error
        var formEvent = $("#" + formId).attr('event').trim();
        var formEventAvailable = CheckFormEvent(formEvent);
        if (formEventAvailable) {
            this.formEventName = formEvent;
            handleForm(formId, this);
        } else {
            var formErrObj = ["Form Event attribute '" + formEvent + "' not valid.Please add a valid 'event' attribute to the Form. It can be one of " + FORM_EVENT_ATTRIBUTES.toString()];
            window[this.submitFailure](formErrObj);
            return false;
        }
    }
};

/********************************************* VALIDATIONS *************************************************/
var allSetFlag = false;
//mandatory connect fields to validate
var connectionObject = ["protocol", "tenant", "flowName", "submitSuccess", "submitFailure", "networkFailure"];

function checkPrerequisits(smartobj) {
    //check if the success function and failure function are defined
    if (!validateUserFunctionNames(smartobj)) {
        allSetFlag = false;
        smartobj.exception = FUNCTION_NOT_FOUND_EXCEPTION;
        throw FUNCTION_NOT_FOUND_EXCEPTION;
    }
    if (!validateSmartAttributes(smartobj)) {
        allSetFlag = false;
        smartobj.exception += SMART_FIELDS_MISSING_EXCEPTION;
        throw SMART_FIELDS_MISSING_EXCEPTION;
    } else {
        allSetFlag = true;
        smartobj.errors = {};
    }
}

//validate if the functions given by the user actually exists. else throw an error.
function validateUserFunctionNames(smartobj) {
    //console.log("validating callback functions");
    var functionCheckFlag = false;
    // function presence flag
    // Since its name is being dynamically generated, always ensure your function actually exists
    if ( typeof eval(smartobj.submitSuccess) != "function") {
        throw "SUBMIT_SUCCESS_FUNCTION_DEFINITION_MISSING: Function definition is missing or not in global space.";
        functionCheckFlag = false;
    }
    if ( typeof eval(smartobj.submitFailure) != "function") {
        throw "SUBMIT_FAILURE_FUNCTION_DEFINITION_MISSING: Function definition is missing or not in global space.";
        functionCheckFlag = false;
    }
    if ( typeof eval(smartobj.networkFailure) != "function") {
        throw "SUBMIT_NETWORK_FUNCTION_DEFINITION_MISSING: Function definition is missing or not in global space.";
        functionCheckFlag = false;
    } else {
        functionCheckFlag = true;
    }
    return functionCheckFlag;
}

//validate minimum mandatory smart fields.
function validateSmartAttributes(smartobj) {
    //console.log("validating smart fields");
    var smartCheckFlag = false;

    if (smartconfig.tenant == (undefined || null) || smartconfig.tenant.trim() == "") {
        throw "SMART_TENANT_INVALID: Value --> '" + smartconfig.tenant + "' is invalid. Should have a valid value";
        smartCheckFlag = false;
    }
    if ( typeof smartconfig.protocol != "string" || smartconfig.protocol == (undefined || null) || smartconfig.protocol.trim() == "") {
        throw "SMART_PROTOCOL_INVALID: Value --> '" + smartconfig.protocol + "' is invalid. Should have a valid value";
        smartCheckFlag = false;
    }
    if ( typeof smartconfig.server != "string" || smartconfig.server == (undefined || null) || smartconfig.server.trim() == "") {
        throw "SMART_SERVER_INVALID: Value --> '" + smartconfig.server + "' is invalid. Should have a valid value";
        smartCheckFlag = false;
    }
    if (smartconfig.smartPort == (undefined || null) || smartconfig.smartPort == "") {
        throw "SMART_PORT_INVALID: Value --> '" + smartconfig.smartPort + "' is invalid. Should have a valid value";
        smartCheckFlag = false;
    } else {
        smartCheckFlag = true;
    }
    return smartCheckFlag;
}

//validate fields before object construction, for the event raised
function validation(receivedObj, smartobj, eventName, idealEventFields) {
    var forEvent = eventName;
    var errorObj = ["TO Raise " + forEvent + " :"];

    console.log("validating for --->" + JSON.stringify(receivedObj) + "  " + forEvent);
    //connection object field validation
    if (!smartobj.flowName)
        errorObj.push("flowName --> is mandatory");

    // event object fields validation
    var requiredFields = idealEventFields;
    for ( i = 0; i < requiredFields.length; i++) {
        if (!receivedObj[requiredFields[i]]) {
            errorObj.push(requiredFields[i] + "--> is missing");
        }
    }

    if (errorObj.length == 1) {
        errorObj = [];
        return true;
    } else {
        errorObj.push(".!PROBABLE CAUSE: Above information(s) was not provided (or) a wrong Event has been raised.");
        smartobj.submitFailure(errorObj);
        return false;
    }
}

/****************************************** IMPLEMENTATIONS ****************************************/

function smartConnect(smartobj) {
    url = smartobj.targetUrl;
    submitData = JSON.stringify(smartobj.dataSubmit);
    console.log(submitData);
    console.log(url);
    submitToSmart(url, submitData, smartobj);
}

function checkAllSetFlag(smartobj) {
    if (!allSetFlag) {
        throw smartobj.exception;
    }
}

function validateAndPost(eventUserData, smartobj, eventName, idealEventFields, smarttenant, smartflow, smartadmin, smartvalue) {
    checkPrerequisits(smartobj);
    //checkAllSetFlag();
    var goodToGoFLag = false;

    //alert(smartobj.flowName);
    // validate user object before event post
    goodToGoFLag = validation(eventUserData, smartobj, eventName, idealEventFields);

    if (goodToGoFLag) {
        //construct target url
        buildUrl(smartobj, eventName, smarttenant, smartflow);

        //prepare the JSOn for the event
        prepareDataObject(eventUserData, smartobj, idealEventFields, smartadmin, smartvalue);

        //connect with smart server and raise the query
        smartobj.connect();
    }
}

//prepares the JSON data object.
function prepareDataObject(userDt, smartobj, idealEventFields, smartadmin, smartvalue) {
    //smartobj.dataSubmit = {};
    smartobj.dataSubmit = userDt;
    admin = smartadmin;
    smartobj.dataSubmit[admin] = {};
    smartobj.dataSubmit[admin].___smart_action___ = SMART_ACTION_LOOKUP;
    smartobj.dataSubmit[admin].___smart_value___ = smartvalue;

    console.log(JSON.stringify(userDt));
    console.log(JSON.stringify(smartobj));
    //loop over the user object data to extract and set event object
    /*for (var i = 0; i < idealEventFields.length; i++) {
        smartobj.dataSubmit[idealEventFields[i]] = userDt[idealEventFields[i]];
    }*/

    return smartobj.dataSubmit;
}

//builds url for the event. takes eventname and flowname as params
function buildUrl(smartobj, eventName, smarttenant, smartflow) {
    var tenant = smarttenant;
    var flownme = smartflow;
    var evnt = eventName;

    //build Url
    if ((evnt == "UploadEvent") || (evnt == "DownloadEvent")) {
        smartobj.targetUrl = smartconfig.protocol + PROTOCOL_SEPARATOR + smartconfig.server + PORT_SEPARATOR + smartconfig.uploadPort + URL_SEPARATOR + tenant + URL_SEPARATOR + flownme + URL_SEPARATOR + evnt;
    } else {
        smartobj.targetUrl = smartconfig.protocol + PROTOCOL_SEPARATOR + smartconfig.server + PORT_SEPARATOR + smartconfig.smartPort + URL_SEPARATOR + tenant + URL_SEPARATOR + flownme + URL_SEPARATOR + evnt;
    }
    return smartobj.targetUrl;
}

/********************************************** UTILITIES*************************************************/

// submit details
function submitToSmart(posturl, submitData, smartobj) {
    console.log(submitData);
    $.ajax({
        url : posturl,
        type : "post",
        data : submitData,
        dataType : "json",

        beforeSend: function(e) {
            console.log("Starting to send...");
            e.setRequestHeader("Session-Id", smartobj.sessionId);
            //very specific to demo. Hence this shd not be used other places
            if (typeof logeditor == "function")
            {
                logeditor('jsondiv', JSON.stringify(smartobj.dataSubmit, null, 2));
                logeditor('jsondiv', "Request: " + posturl);
            }
            if ((typeof smartobj.submitStart) == "function")
                smartobj.submitStart();
        },

        success : function(data) {
            console.log("Completed...");
            //very specific to demo. Hence this shd not be used other places
            if (typeof logeditor == "function")
            {
                logeditor('jsondiv', JSON.stringify(data, null, 2));
                logeditor('jsondiv', "Response: ");
            }
            var resp = createResponse(data);
            if (( typeof smartobj.submitSuccess) == "string") {
                if (resp.iserror)
                    window[smartobj.submitFailure(resp, smartobj)]
                else
                    window[smartobj.submitSuccess(resp, smartobj)]
            } else if (( typeof smartobj.submitSuccess) == "function") {
                if (resp.iserror)
                    window[smartobj.submitFailure(resp, smartobj)]
                else
                    window[smartobj.submitSuccess(resp, smartobj)]
            }

            if ((typeof smartobj.submitEnd) == "function")
                smartobj.submitEnd();
        },
        error : function(err) {
            console.log("Completed...");
            //very specific to demo. Hence this shd not be used other places
            if (typeof logeditor == "function")
            {
                logeditor('jsondiv', JSON.stringify(err, null, 2));
                logeditor('jsondiv', "Response: ");
            }
            if (( typeof smartobj.submitSuccess) == "string") {
                window[smartobj.networkFailure(err)];
            } else if (( typeof smartobj.submitSuccess) == "function") {
                smartobj.networkFailure(err);
            }
            if ((typeof smartobj.submitEnd) == "function")
                smartobj.submitEnd();
        }
    });
}

//function to create the response
function createResponse(respdata) {
    var resp = respdata;
    if (respdata['responses'] != undefined) {
        resp = new smartresponse();
        resp.original = respdata;
        resp.read((respdata['responses'])[0]);
    } else if (respdata['error'] != undefined) {
        resp = new smartresponse();
        resp.original = respdata;
        resp.read(respdata);
    }

    return resp;
}

/* The response that is sent from smart */
function smartresponse() {
    this.responseid = '';
    this.response = {};
    this.iserror = false;
    this.message = '';
    this.original = ''

    this.read = function(json) {
        this.responseid = json['___smart_responseid___'];
        if (json['errors'] != undefined) {
            this.iserror = true;
            var errs = new errorlist();
            errs.read(json['errors']);
            this.response = errs;
        } else if (json['resultSet'] != undefined) {
            var lstresp = new listallresponse();
            lstresp.read(json['resultSet']);
            this.response = lstresp;
        } else if (json['searchResult'] != undefined) {
            var lstresp = new listallresponse();
            lstresp.read(json['searchResult']);
            this.response = lstresp;
        } else if (json['result'] != undefined) {
            var resp = new listallresponse();
            resp.read(json['result']);
            this.response = resp;
        } else if (json['monitordata'] != undefined) {
            var resp = new listallresponse();
            resp.read(json['monitordata']);
            this.response = resp;
        } else if (json['sessionId'] != undefined) {
            var sessresp = new loginresponse();
            sessresp.read(json);
            this.response = sessresp;
        } else if (json['uploadMap'] != undefined) {
             var uresp = new uploadresponse();
             uresp.read(json);
             this.response = uresp;
        } else {
            console.log(json.length + ":");
            var cnt = 0;
            var one = '';
            for (var val in json)
            {
                if (val != '___smart_responseid___')
                {
                	cnt = cnt + 1;
            		console.log("Got back: " + val + ":" + json[val]);
            		one = json[val];
            	}
            }
            if (cnt == 1)
                this.message = one;
            this.response = json;
        };
    };
};

function loginresponse() {
    this.sessId = '';

    this.read = function(json) {
        this.sessId = json["sessionId"];
    };
};

function listallresponse() {
    this.list = new Array();

    this.read = function(json) {
        for (var i = 0; i < json.length; i++) {
            var res = json[i];
            var obj = new smartobject();
            obj.read(res);
            this.list[i] = obj;
        }
    };
};

function uploadresponse() {
    this.uploadfilename = '';

    this.read = function(json) {
        var obj = json["uploadMap"];
        if (obj["Value-0"] != undefined)
            this.uploadfilename = obj["Value-0"];
    };
};

function errorobject() {
    this.code = '';
    this.message = '';

    this.read = function(json) {
        if (json['code'] != undefined)
            this.code = json['code'];

        if (json['context'] != undefined)
            this.context = json['context'];
    };
};

function errorlist() {
    this.errors = new Array();

    this.read = function(json) {
        for (var i = 0; i < json.length; i++) {
            var err = new errorobject();
            err.read(json[i]);
            this.errors[i] = err;
        }
    };
};

function smartobject() {
    this.smartname = '';
    this.flowid = '';
    this.currentstate = '';
    this.createdOn = '';
    this.lastModifiedOn = '';
    this.values = {};

    this.read = function(json) {
        if (json['___smart_flow___'] != undefined)
            this.flowid = (json['___smart_flow___'])['_id'];

        if (json['___smart_currentState___'] != undefined)
            this.currentstate = (json['___smart_currentState___'])['_stateName'];

        if (json['___smart_legend___'] != undefined) {
            this.createdOn = (json['___smart_legend___'])['_createdOn'];
            this.lastModifiedOn = (json['___smart_legend___'])['_lastModifiedOn'];
        }

        if (json['___smart_name___'] != undefined)
            this.smartname = json['___smart_name___'];

        this.values = json;
    };
};

// form to JSON conversion
function handleForm(formId, smartobj) {
    if (smartobj.formEventName == "upload") {
        smartobj.upload(formId);
    } else {
        jsonResult = {};
        jsonResult = $("#" + formId).serializeObject();
        smartobj[smartobj.formEventName](jsonResult);
    }
}

// convert html form elements to objects
$.fn.serializeObject = function() {
    var arrayData, objectData;
    arrayData = this.serializeArray();
    objectData = {};

    $.each(arrayData, function() {
        var value;

        if (this.value != null) {
            if (this.value >= 0) {
                value = parseInt(this.value, 10);
            } else {
                value = this.value;
            }
        } else {
            value = '';
        }

        if (objectData[this.name] != null) {
            if (!objectData[this.name].push) {

                objectData[this.name] = [objectData[this.name]];
            }

            objectData[this.name].push(value);
        } else {
            objectData[this.name] = value;
        }
    });

    return objectData;
}

String.prototype.startsWith = function(string) {
    if (this.indexOf(string) == 0)
        return true;
    return false;
}

String.prototype.toProperCase = function() {
    return this.toLowerCase().replace(/^(.)|\s(.)/g, function($1) {
        return $1.toUpperCase();
    });
}
