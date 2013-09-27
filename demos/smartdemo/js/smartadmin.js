var DEPLOY_EVENT = 'DeployEvent', NEW_TENANT_EVENT = 'NewTenant', ENABLE_FLOW_EVENT = 'EnableFlow', LIST_DEPLOYMENTS_EVENT = 'ListDeployments';
var LIST_ENABLED_FLOWS_EVENT = "ListEnabledFlows", CONFIG_EVENT = 'Configure', UPLOAD_EVENT = 'UploadEvent';

var MULTIPART_FORM_NOT_SUPPORTED = "Your Browser incompatible to upload forms.Try using latest browser."
smartadmin.prototype = new smart();

function smartadmin() {
    this.deploy = function(jarFilePath, soaFileName) {
        var deployObj = {};
        deployObj['deployJar'] = jarFilePath;
        deployObj['flowsoa'] = soaFileName;
        validateAndPost(deployObj, this, "DeployEvent", ["deployJar", "flowsoa"], SMART_OWNER, ADMIN_SMART_FLOW, TENANT_ADMIN, SMART_OWNER);
    };

    this.newTenant = function(newTenantName, featuresToEnable, flowsToEnable) {
        var newTenantObj = {};
        newTenantObj['tenant'] = newTenantName;
        newTenantObj['enableFeatures'] = featuresToEnable;
        if (flowsToEnable != "" && flowsToEnable != null && flowsToEnable != undefined) {
            newTenantObj['enableFlow'] = flowsToEnable;
            validateAndPost(newTenantObj, this, "NewTenant", ["tenant", "enableFlow", "enableFeatures"], SMART_OWNER, ADMIN_SMART_FLOW, TENANT_ADMIN, SMART_OWNER);
        } else {
            validateAndPost(newTenantObj, this, "NewTenant", ["tenant", "enableFeatures"], SMART_OWNER, ADMIN_SMART_FLOW, TENANT_ADMIN, SMART_OWNER);
        }
    };

    this.enableFlow = function(newTenantName, flowsToEnable, featuresToEnable, links) {
        var enableFlowObj = {};
        enableFlowObj['tenant'] = newTenantName;
        enableFlowObj['enableFlow'] = flowsToEnable;
        enableFlowObj['enableFeatures'] = featuresToEnable;
        if (links != undefined)
            enableFlowObj['links'] = links;
        else
            enableFlowObj['links'] = [];
        validateAndPost(enableFlowObj, this, "EnableFlow", ["tenant", "enableFlow", "enableFeatures", "links"], SMART_OWNER, ADMIN_SMART_FLOW, TENANT_ADMIN, SMART_OWNER);
    };

    this.listLinks = function(flowName) {
        var listDeploymentObject = {};
        listDeploymentObject['dType'] = 'links';
        listDeploymentObject['flow'] = flowName;
        validateAndPost(listDeploymentObject, this, "ListDeployments", ["dType", "flow"], SMART_OWNER, ADMIN_SMART_FLOW, FLOW_ADMIN, ADMIN_SMART_FLOW);
    };

    //list all flows enabled for a user
    this.listEnabledFlows = function() {
        var enabledFlowsObj = {};
        validateAndPost(enabledFlowsObj, this, "ListEnabledFlows", [], SMART_OWNER, ADMIN_SMART_FLOW, TENANT_ADMIN, smartconfig.tenant);
    };

    //list all flows enabled for a user
    this.listEnabledFlows = function(tenant) {
        var enabledFlowsObj = {};
        validateAndPost(enabledFlowsObj, this, "ListDeployments", [], tenant, ADMIN_SMART_FLOW, FLOW_ADMIN, ADMIN_SMART_FLOW);
    };

    this.listDeployments = function(deploymentType, flowName) {
        var listDeploymentObject = {};
        listDeploymentObject['dType'] = deploymentType;
        listDeploymentObject['flow'] = flowName;
        validateAndPost(listDeploymentObject, this, "ListDeployments", ["dType", "flow"], smartconfig.tenant, ADMIN_SMART_FLOW, FLOW_ADMIN, ADMIN_SMART_FLOW);
    };

    this.config = function(configObj) {
        validateAndPost(configObj, this, "ConfigEvent", ["configName", "configFor", "configValues"], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    this.getJavaScript = function(flowName, tenantID) {
        var jsObject = {};
        jsObject["flowName"] = flowName;
        jsObject["tenantID"] = tenantID;
        validateAndPost(jsObject, this, "GetJavascript", ["flowName", "tenantID"], smartconfig.tenant, this.flowName, FLOW_ADMIN, this.flowName);
    };

    this.checkFlowExistence = function(classToLookIn, lookForKey) {
        var checkExistenceObj = {};
        checkExistenceObj['group'] = classToLookIn;
        checkExistenceObj['key'] = lookForKey;
        validateAndPost(checkExistenceObj, this, "CheckExistence", ["group", "key"], SMART_OWNER, ADMIN_SMART_FLOW, FLOW_ADMIN, this.flowName);
    };

    this.checkTenantExistence = function() {
        var checkExistenceObj = {};
        checkExistenceObj['group'] = "TenantAdmin";
        checkExistenceObj['key'] = smartconfig.tenant;
        validateAndPost(checkExistenceObj, this, "CheckExistence", ["group", "key"], SMART_OWNER, ADMIN_SMART_FLOW, FLOW_ADMIN, ADMIN_SMART_FLOW);
    };

    /*
     this.upload = function(FormData) {
     smartUpload(FormData, this);
     };*/

}

//upload file event
function smartUpload(formData, smartobj) {
    var multiPartFormAvailable = false;
    if (window.FormData) {
        multiPartFormAvailable = true;
        var newData = new FormData();
        $.each($('#file').prop("files"), function(i, file) {
            newData.append('file', file);
        });

        if (multiPartFormAvailable) {
            // upload file
            uploadToSmart("multiparttest.php", newData);
        } else {
            // browser not compatible
            console.log("multi part forms not supported by your browser");
            alert("multi part forms not supported by your browser");
        }
    }

}

// upload multipart form to smart
function uploadToSmart(posturl, submitData) {
    $.ajax({
        url : posturl,
        type : "post",
        data : submitData,
        contentType : 'multipart/form-data',
        processData : false,

        success : function(data) {
            alert("Upload Success  " + data);
        },
        error : function(err) {
            alert("Upload Failed" + err);
        }
    });
}