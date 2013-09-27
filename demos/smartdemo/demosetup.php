<?php
class demosetup
{
    private $setup = array(
        "BasicDemo" => array(
            "dirpath" => "message-code",
            "tenant" => "BasicDemo",
            "setsession" => true,
            "title" => "Message - Basic Usage",
            "description" => "This demo demonstrates the 'Hello World' application in SMART platform. It contains a single data class called Message that can be saved and retrieved. It can be deactivated using the Deactivate Message. All other features such as creating the message and listing the message is provided out of box from SMART. The Demo is running on a tenant BasicDemo for which this Message flow is enabled."
        ),
        "RoleDemo" => array(
            "dirpath" => "role-code",
            "tenant" => "RoleDemo",
            "setsession" => true,
            "title" => "Contact - Role Based Access",
            "description" => "This demo demonstrates the Role-Based Security available in SMART. This contact application has three major functionalities. An admin creates the Contacts, potential customers send enquiries to contacts, and sales users view these enquiries and close them."
        ),
        "SurveyDemo" => array(
            "dirpath" => "survey-code",
            "tenant" => "SurveyDemo1",
            "setsession" => true,
            "title" => "Survey - Multi-Tenant Access",
            "description" => "This demo demonstrates zero-coding effort required for multi-tenancy. The demo also demonstrates how customizations can be done easily for different tenants without much effort. The survey application has two features basic and advanced. The basic just records the answers, while the advanced allows a question to be specified to accept an email. SurveyDemo1 tenant has only the basic feature enabled, while SurveyDemo2 has the advanced feature enabled. Answer an yes for the last question in SurveyDemo2 and you will be forced to enter an email address."
        ),
        "PlugPlay" => array(
            "dirpath" => "pp-code",
            "tenant" => "PPDemo",
            "setsession" => true,
            "title" => "Catalogue, Review, Cart - Mashed up",
            "description" => "In this demo we have created three flows, product catalogue, review and cart. We have mashed up review and cart with the product catalogue during runtime."
        )
    );

    private $setupscript = array(
        "BasicDemo" => array(
            array(
            "title" => "Authenticate as SMART Administrator",
            "uri" => "/SmartOwner/Security/Authenticate",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'smartadmin', 'password':'replace with password for smartadmin', 'type':'custom'}",
            "comments" => "From the response, parse and store sessionid"
            ),
            array(
            "title" => "Deploy Message Jar",
            "uri" => "/SmartOwner/AdminSmartFlow/DeployEvent",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner'}, 'deployJar':'replace with full path to the jar file','flowsoa':'MessageFlow.soa'}",
            "comments" => "Provide the session-Id in the post as the sessionid parsed before."
            ),
            array(
            "title" => "Create Tenant and Enable Message",
            "uri" => "/SmartOwner/AdminSmartFlow/NewTenant",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner' },'enableFeatures':[ 'all' ],'enableFlow':'MessageFlow','tenant':'BasicDemo','domain':'replace with the domain name if required, else do not provide this','clientOf':'SMART'}",
            "comments" => "Provide the session-id in the header of the post. The domain and clientOf are optional fields."
            )
        ),
        "RoleDemo" => array(
            array(
            "title" => "Authenticate as SMART Administrator",
            "uri" => "/SmartOwner/Security/Authenticate",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'smartadmin', 'password':'replace with password for smartadmin', 'type':'custom'}",
            "comments" => "From the response, parse and store sessionid"
            ),
            array(
            "title" => "Deploy Contact Jar",
            "uri" => "/SmartOwner/AdminSmartFlow/DeployEvent",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner'}, 'deployJar':'replace with full path to the jar file','flowsoa':'ContactFlow.soa'}",
            "comments" => "Provide the session-Id in the post as the sessionid parsed before."
            ),
            array(
            "title" => "Create Tenant and Enable Contact",
            "uri" => "/SmartOwner/AdminSmartFlow/NewTenant",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner' },'enableFeatures':[ 'all','admin','sales' ],'enableFlow':'ContactFlow','tenant':'RoleDemo','domain':'replace with the domain name if required, else do not provide this','clientOf':'SMART'}",
            "comments" => "We will enabled all the features for the same tenant."
            ),
            array(
            "title" => "Authenticate as RoleDemo user",
            "uri" => "/RoleDemo/Security/Authenticate",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'RoleDemoadmin', 'password':'RoleDemoadmin', 'type':'custom'}",
            "comments" => "From the response, parse and store sessionid."
            ),
            array(
            "title" => "Create admin role",
            "uri" => "/RoleDemo/Security/CreateRole",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'roleName':'adminrole','permits':{'/ContactFlow/admin':'execute','/AllFlows/all':'execute','/Security/all':'execute'}}",
            "comments" => "In the ContactFlow.soa, we created two feature buckets, admin and sales. In this role we will grant to admin an execute access so that Contacts can be created."
            ),
            array(
            "title" => "Create sales role",
            "uri" => "/RoleDemo/Security/CreateRole",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'roleName':'salesrole','permits':{'/ContactFlow/sales':'execute','/ContactFlow/admin':'read','/AllFlows/all':'execute','/Security/all':'execute'}}",
            "comments" => "In the ContactFlow.soa, we created two feature buckets, admin and sales. In this role we will grant to admin read access so that Contacts can be read, and an execute access to the sales features."
            ),
            array(
            "title" => "Create an admin user",
            "uri" => "/RoleDemo/Security/CreateUser",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'Security'},'id':'contactadmin','name':'Contact Admin','roles':['adminrole']}",
            "comments" => "Here we just create a user with adminrole we created in the earlier step. We will create an identity in the next step. This allows us to link any type of identity to the same user and helps in SSO integration."
            ),
            array(
            "title" => "Add an identity to admin user",
            "uri" => "/RoleDemo/Security/AddIdentity",
            "data" => "{'SmartUser': {'___smart_action___':'lookup','___smart_value___':'contactadmin'},'identity':'contactadmin','credentialKey':'welcome','type':'custom'}",
            "comments" => "Here we use the custom user setup which creates and authenticates in SMART."
            ),
            array(
            "title" => "Create an sales user",
            "uri" => "/RoleDemo/Security/CreateUser",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'Security'},'id':'salesuser','name':'Contact Sales','roles':['salesrole']}",
            "comments" => "Here we just create a user with salesrole we created in the earlier step. We will create an identity in the next step. This allows us to link any type of identity to the same user and helps in SSO integration."
            ),
            array(
            "title" => "Add an identity to sales user",
            "uri" => "/RoleDemo/Security/AddIdentity",
            "data" => "{'SmartUser':{'___smart_action___':'lookup','___smart_value___':'salesuser'},'identity':'salesuser','credentialKey':'welcome','type':'custom'}",
            "comments" => "Here we use the custom user setup which creates and authenticates in SMART."
            )
        ),
        "SurveyDemo" => array(
            array(
            "title" => "Authenticate as SMART Administrator",
            "uri" => "/SmartOwner/Security/Authenticate",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'smartadmin', 'password':'replace with password for smartadmin', 'type':'custom'}",
            "comments" => "From the response, parse and store sessionid"
            ),
            array(
            "title" => "Deploy Survey Jar",
            "uri" => "/SmartOwner/AdminSmartFlow/DeployEvent",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner'}, 'deployJar':'replace with full path to the jar file','flowsoa':'SurveyFlow.soa'}",
            "comments" => "Provide the session-Id in the post as the sessionid parsed before."
            ),
            array(
            "title" => "Create SurveyDemo1 Tenant and Enable basic features",
            "uri" => "/SmartOwner/AdminSmartFlow/NewTenant",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner' },'enableFeatures':[ 'basic' ],'enableFlow':'SurveyFlow','tenant':'SurveyDemo1','domain':'replace with the domain name if required, else do not provide this','clientOf':'SMART'}",
            "comments" => "We will just enable the basic feature for the SurveyDemo1 tenant."
            ),
            array(
            "title" => "Create SurveyDemo2 and Enable basic and advanced features",
            "uri" => "/SmartOwner/AdminSmartFlow/NewTenant",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner' },'enableFeatures':[ 'basic','advanced' ],'enableFlow':'SurveyFlow','tenant':'SurveyDemo2','domain':'replace with the domain name if required, else do not provide this','clientOf':'SMART'}",
            "comments" => "We will enable the basic and advanced features for the SurveyDemo2 tenant."
            ),
            array(
            "title" => "Authenticate as SurveyDemo1",
            "uri" => "/SurveyDemo1/Security/Authenticate",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'SurveyDemo1admin', 'password':'SurveyDemo1admin', 'type':'custom'}",
            "comments" => "Login as SurveyDemo1 and create the questionaire for SurveyDemo1."
            ),
            array(
            "title" => "Create Questionaire for SurveyDemo1",
            "uri" => "/SurveyDemo1/SurveyFlow/CreatePrime",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'SurveyFlow'},'create':'Questionaire','data':{'questionaireFor':'demo1questions','questions':[{'question':'Do you develop products', 'recordEmail':0}, {'question':'Does your product service mutiple customers', 'recordEmail':0}, {'question':'If yes, do you customize for your customers', 'recordEmail':0},{'question':'SMART provides Plug and Play architecture where you can assemble services. Can you see an application of this in your product', 'recordEmail':0}, {'question':'FixChg is a market place for reusable services. Would you contribute in the marketplace', 'recordEmail':0}, {'question':'Would you contribute to the effort of developing SMART, in the open source model', 'recordEmail':1}]}}",
            "comments" => "When we create the Questionaire we go ahead and setup the data to record email. Since this feature is not enabled even though the questionaire is setup the email will not be validated."
            ),
            array(
            "title" => "Authenticate as SurveyDemo2",
            "uri" => "/SurveyDemo2/Security/Authenticate",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'SurveyDemo2admin', 'password':'SurveyDemo2admin', 'type':'custom'}",
            "comments" => "Login as SurveyDemo2 and create the questionaire for SurveyDemo2."
            ),
            array(
            "title" => "Create Questionaire for SurveyDemo2",
            "uri" => "/SurveyDemo2/SurveyFlow/CreatePrime",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'SurveyFlow'},'create':'Questionaire','data':{'questionaireFor':'demo1questions','questions':[{'question':'Do you develop mobile products', 'recordEmail':0}, {'question':'Does your application have a server component', 'recordEmail':0},{'question':'If yes, what do you use for the server side components', 'recordEmail':0}, {'question':'FixChg is a market place for reusable services. Would you these reusable services in your mobile app', 'recordEmail':0}, {'question':'Would you like to subscribe to SMARTQuest, a newsletter about SMART Provide Email.','recordEmail':1}]}}",
            "comments" => "We have setup the last question to ask for an email. Since the advanced feature is enabled in this tenant, the survey will not record the answer if email is not provided."
            )
        ),
        "PlugPlay" => array(
            array(
            "title" => "Authenticate as SMART Administrator",
            "uri" => "/SmartOwner/Security/Authenticate",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'smartadmin', 'password':'replace with password for smartadmin', 'type':'custom'}",
            "comments" => "From the response, parse and store sessionid"
            ),
            array(
            "title" => "Deploy Catalogue Jar",
            "uri" => "/SmartOwner/AdminSmartFlow/DeployEvent",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner'}, 'deployJar':'replace with full path to the jar file','flowsoa':'CatalogueFlow.soa'}",
            "comments" => "Provide the session-Id in the post as the sessionid parsed before."
            ),
            array(
            "title" => "Deploy ReviewDetail Jar",
            "uri" => "/SmartOwner/AdminSmartFlow/DeployEvent",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner'}, 'deployJar':'replace with full path to the jar file','flowsoa':'ReviewDetailFlow.soa'}",
            "comments" => "Provide the session-Id in the post as the sessionid parsed before."
            ),
            array(
            "title" => "Deploy Cart Jar",
            "uri" => "/SmartOwner/AdminSmartFlow/DeployEvent",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner'}, 'deployJar':'replace with full path to the jar file','flowsoa':'CartFlow.soa'}",
            "comments" => "Provide the session-Id in the post as the sessionid parsed before."
            ),
            array(
            "title" => "Create PPDemo Tenant and Enable Catalogue",
            "uri" => "/SmartOwner/AdminSmartFlow/NewTenant",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner' },'enableFeatures':[ 'all' ],'enableFlow':'CatalogueFlow','tenant':'PPDemo','domain':'replace with the domain name if required, else do not provide this','clientOf':'SMART'}",
            "comments" => "Provide the session-id in the header of the post. The domain and clientOf are optional fields."
            ),
            array(
            "title" => "Mash up ReviewDetail flow with Catalogue for PPDemo",
            "uri" => "/SmartOwner/AdminSmartFlow/EnableFlow",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner'}, 'tenant':'PPDemo','enableFeatures':[ 'all' ],'enableFlow':'ReviewDetailFlow','links':[{'name':'objlink', 'flow':'CatalogueFlow', 'object':'Catalogue','attribute':'skuId'},{'name':'Reviewneedslink','object':'Catalogue'}]}",
            "comments" => "Mashup is done when enabling a flow for a tenant. This allows mashup to be done differently for different tenants. The Review flow had two points of linking. The Object linked to the review detail object, identified by the name objlink. We link it to CatalogueFlow.Catalogue.skuId. The WriteReview event also could be raised on different objects. We link this again to Catalogue object. This can be a comma separated list of objects."
            ),
            array(
            "title" => "Mash up CartFlow with Catalogue for PPDemo",
            "uri" => "/SmartOwner/AdminSmartFlow/EnableFlow",
            "data" => "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'SmartOwner'}, 'tenant':'PPDemo','enableFeatures':[ 'all' ],'enableFlow':'CartFlow','links':[{'name':'itemlink', 'flow':'CatalogueFlow', 'object':'Catalogue','attribute':'skuId'}]}",
            "comments" => "Mashup is done when enabling a flow for a tenant. This allows mashup to be done differently for different tenants. The cart flow had one link point where the object added to the cart can be varied. Here we have linked this identified by name itemlink to CatalogueFlow.Catalogue.skuId"
            ),
            array(
            "title" => "Authenticate as PPDemo",
            "uri" => "/PPDemo/Security/Authenticate",
            "data" => "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'Security'},'identity':'PPDemoadmin', 'password':'PPDemoadmin', 'type':'custom'}",
            "comments" => "Login as PPDemo and create the catalogue items for PPDemo to use in the demo."
            ),
            array(
            "title" => "Create Catalogue items for PPDemo",
            "uri" => "/SmartOwner/Security/Authenticate",
            "data" => "{'FlowAdmin': {'___smart_action___':'lookup','___smart_value___':'CatalogueFlow'},'create':'Catalogue','data':{'skuId':'replace with skuid','productName':'replace with product name','cost':10,'available':10}}",
            "comments" => "Run this as many times as required with different skuId and productName."
            )
        )
    );

    private $documentation = array (
        "BasicDemo" => array(
            "BasicDemo",
            "Authenticate",
            "DeployEvent",
            "NewTenant",
            "ListDeployments",
            "CreatePrime",
            "ListAllEvent",
            "DeActivateMessage"
        ),
        "RoleDemo" => array(
            "RoleDemo",
            "Authenticate",
            "DeployEvent",
            "NewTenant",
            "ListDeployments",
            "CreateRole",
            "CreateUser",
            "AddIdentity",
            "CreatePrime",
            "ListAllEvent",
            "Enquire",
            "CloseEnquiry"
        ),
        "SurveyDemo" => array(
            "SurveyDemo",
            "Authenticate",
            "DeployEvent",
            "NewTenant",
            "ListDeployments",
            "LookupEvent",
            "CreatePrime",
            "RecordAnswer"
        ),
        "PlugPlay" => array(
            "PPDemo",
            "Authenticate",
            "DeployEvent",
            "NewTenant",
            "ListDeployments",
            "EnableFlow",
            "CreatePrime",
            "AddToCart",
            "GetCartItems",
            "WriteReview"
        )
    );


    function getRequestDemoDetails()
    {
        global $_GET;
        return $this->setup[$_GET['demo']];
    }

    function getRequestDemoSetup()
    {
        global $_GET;
        return $this->setupscript[$_GET['demo']];
    }

    function getRequestDocumentation()
    {
        global $_GET;
        return $this->documentation[$_GET['demo']];
    }
}
?>
