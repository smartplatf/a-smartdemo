#!/bin/bash

dirname=`dirname $0`
source $dirname/helperfunctions.sh

#####################
#DECLARE VARIABLES USED TO SETUP
######################

server=$1
port=$2
installpath=$3
demodomain='localhost'

smartadm='smartadmin'
smartadmpwd='smartadmin'

######################
#CHANGE FOR NEW FLOWS TO BE ADDED
######################

declare -a deployfile=(
$installpath'/org/smart/demo/message/message/1.0-SNAPSHOT/message-1.0-SNAPSHOT.jar'
$installpath'/org/smart/demo/contact/contact/1.0-SNAPSHOT/contact-1.0-SNAPSHOT.jar'
$installpath'/org/smart/demo/survey/survey/1.0-SNAPSHOT/survey-1.0-SNAPSHOT.jar'
$installpath'/org/smart/demo/catalogue/catalogue/1.0-SNAPSHOT/catalogue-1.0-SNAPSHOT.jar'
$installpath'/org/smart/demo/review/review/1.0-SNAPSHOT/review-1.0-SNAPSHOT.jar'
$installpath'/org/smart/demo/cart/cart/1.0-SNAPSHOT/cart-1.0-SNAPSHOT.jar'
)

declare -a deploysoa=(
'MessageFlow.soa'
'ContactFlow.soa'
'SurveyFlow.soa'
'CatalogueFlow.soa'
'ReviewDetailFlow.soa'
'CartFlow.soa'
)

declare -a demotenants=(
'BasicDemo'
'RoleDemo'
'SurveyDemo1'
'SurveyDemo2'
'PPDemo'
)

declare -a defenable=(
'MessageFlow'
'ContactFlow'
'SurveyFlow'
'SurveyFlow'
'CatalogueFlow'
)

declare -a defenablefeatures=(
'all'
"all','admin','sales"
'basic'
"basic','advanced"
'all'
)

##############################
# SMART RELATED VARS
###############################

smartowner='SmartOwner'
adminflow='AdminSmartFlow'
secflow='Security'
authevt='Authenticate'
createusr='CreateUser'
addident='AddIdentity'
depevt='DeployEvent'
sessrch='sessionId'
depsrch='success'
newtenantevt='NewTenant'
enableevt='EnableFlow'
createrole='CreateRole'
msgsrch='message'
cfgevt='ConfigFlow'
adminevt='CreateAdminProfile'
chgpwd='ChangePassword'
createprime='CreatePrime'
surveyflow='SurveyFlow'
catalogue='CatalogueFlow'

################################
#CHECK ALL REQUIRED DATA IS PRESENT
################################
echo "[Checking parameters...]"
[ "$#" -ge 3 ] || die "Usage: setupdemo server port installdir"
[ -d "$installpath" ] || die "Install path $dir does not exist"

for deploy in "${!deployfile[@]}"
do
    file=${deployfile[$deploy]}
    [ -e "$file" ] || die "File $file does not exist for deployment "
done
echo "[Checked parameters...]"

##################################
#Authenticate 
###############################

echo ""
echo "[Authenticating as smartadmin...]"
json=`postjson $smartowner $secflow $authevt "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'identity':'"$smartadm"', 'password':'"$smartadmpwd"', 'type':'custom'}"`
sessid=`jsonval "$json" $sessrch`
[ ! -z "$sessid" ] || die "Cannot authenticate with server"

echo "[Authenticated Got sessionid: "$sessid"]"
echo ""

echo "[Deploying Demo Flows ...]"
for deploy in "${!deployfile[@]}"
do
    file=${deployfile[$deploy]}
    soafile=${deploysoa[$deploy]}
    echo  '[Deploying '$soafile' from '$file' ...]'
    json=`postjson $smartowner $adminflow $depevt "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'"$smartowner"'}, 'deployJar':'"$file"','flowsoa':'"$soafile"'}" $sessid `
    message=`jsonval "$json" $depsrch`
    [ ! -z "$message" ] || die "Cannot deploy file "$file" for "$soafile" Error "$json
    echo '[Deployed '$soafile '...]'
done
echo "[Deployed Demo Flows ...]"
echo ""

echo "[Creating Demo Tenants ...]"
for tenant in "${!demotenants[@]}"
do
    demot=${demotenants[$tenant]}
    defflow=${defenable[$tenant]}
    efeatures=${defenablefeatures[$tenant]}
    echo "[Creating Tenant "$demot" in domain "$demodomain"...]"
    json=`postjson $smartowner $adminflow $newtenantevt "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'"$smartowner"' },'enableFeatures':[ '"$efeatures"' ],'enableFlow':'"$defflow"','tenant':'"$demot"','domain':'"$demodomain"','clientOf':'SMART','controlsAdmin':'YES'}" $sessid`
    message=`jsonval "$json" $depsrch`
    [ ! -z "$message" ] || die "Cannot create tenant "$demot" with domain "$demodomain" Error "$json
    echo "[Created Tenant "$demot" in domain "$demodomain"...]"
done
echo "[Created Demo Tenants ...]"
echo ""

################################################
# Plug and Play setup
################################################
pptenant=${demotenants[4]}
echo  '[Enabling Review Flow for '$pptenant' ...]'
json=`postjson $smartowner $adminflow $enableevt "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'"$smartowner"'}, 'tenant':'"$pptenant"','enableFeatures':[ 'all' ],'enableFlow':'ReviewDetailFlow','links':[{'name':'objlink', 'flow':'CatalogueFlow', 'object':'Catalogue','attribute':'skuId'},{'name':'Reviewneedslink','object':'Catalogue'}]}" $sessid`
message=`jsonval "$json" $depsrch`
[ ! -z "$message" ] || die "Cannot deploy file ReviewDetailFlow for $pptenant error "$json
echo '[Enabled Flow ReviewDetailFlow...]'
echo  '[Enabling Cart Flow for '$pptenant' ...]'
json=`postjson $smartowner $adminflow $enableevt "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'"$smartowner"'}, 'tenant':'"$pptenant"','enableFeatures':[ 'all' ],'enableFlow':'CartFlow','links':[{'name':'itemlink', 'flow':'CatalogueFlow', 'object':'Catalogue','attribute':'skuId'}]}" $sessid`
message=`jsonval "$json" $depsrch`
[ ! -z "$message" ] || die "Cannot deploy file CartFlow for $pptenant error "$json
echo '[Enabled Flow CartFlow ...]'

echo "[Authenticating as $pptenant ...]"
json=`postjson $pptenant $secflow $authevt "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'identity':'"$pptenant"admin', 'password':'"$pptenant"admin', 'type':'custom'}"`
sessid=`jsonval "$json" $sessrch`
[ ! -z "$sessid" ] || die "Cannot authenticate with server"
echo "[Authenticated Got sessionid: "$sessid"]"
echo ""

echo "[Configuring catalogue items for $pptenant ...]"
for i in {1..5}
do
json=`postjson $pptenant $catalogue $createprime "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'"$catalogue"'},'create':'Catalogue','data':{'skuId':'12"$i"','productName':'Product"$i"','cost':10,'available':10}}" $sessid`
message=`jsonval "json" $depsrch`
[ ! -z "$message" ] || die "Cannot create newsletter error "$json
done
echo "[Configured catalogue items for $pptenant ...]"
echo ""


##################################################
# Basic Usage setup
##################################################


##################################################
# Role Demo setup
##################################################
roletenant=${demotenants[1]}
echo "[Authenticating as $roletenant ...]"
json=`postjson $roletenant $secflow $authevt "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'identity':'"$roletenant"admin', 'password':'"$roletenant"admin', 'type':'custom'}"`
sessid=`jsonval "$json" $sessrch`
[ ! -z "$sessid" ] || die "Cannot authenticate with server"
echo "[Authenticated Got sessionid: "$sessid"]"
echo ""

echo "[Creating roles for $roletenant ...]"
json=`postjson $roletenant $secflow $createrole "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'roleName':'adminrole','permits':{'/ContactFlow/admin':'execute','AllFlows/all':'execute','/Security/all':'execute'}}" $sessid`
message=`jsonval "$json" $msgsrch`
[ ! -z "$message" ] || die "Cannot create role for admin "$json
json=`postjson $roletenant $secflow $createrole "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'roleName':'salesrole','permits':{'/ContactFlow/sales':'execute','/ContactFlow/admin':'read','AllFlows/all':'execute','/Security/all':'execute'}}" $sessid`
message=`jsonval "$json" $msgsrch`
[ ! -z "$message" ] || die "Cannot create role for sales "$json
echo "[Created roles for $roletenant ...]"
echo ""

echo "[Configuring admin user ...]"
json=`postjson $roletenant $secflow $createusr "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'"$secflow"'},'id':'contactadmin','name':'Contact Admin','roles':['adminrole']}" $sessid`
message=`jsonval "json" $msgsrch`
[ ! -z "$message" ] || die "Cannot create admin profile error "$json
json=`postjson $roletenant $secflow $addident "{'SmartUser':{'___smart_action___':'lookup','___smart_value___':'contactadmin'},'identity':'contactadmin','credentialKey':'welcome','type':'custom'}" $sessid`
message=`jsonval "json" $msgsrch`
[ ! -z "$message" ] || die "Cannot create admin profile error "$json
echo "[Configured admin user ...]"

echo "[Configuring sales user ...]"
json=`postjson $roletenant $secflow $createusr "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'"$secflow"'},'id':'salesuser','name':'Contact Sales','roles':['salesrole']}" $sessid`
message=`jsonval "json" $msgsrch`
[ ! -z "$message" ] || die "Cannot create admin profile error "$json
json=`postjson $roletenant $secflow $addident "{'SmartUser':{'___smart_action___':'lookup','___smart_value___':'salesuser'},'identity':'salesuser','credentialKey':'welcome','type':'custom'}" $sessid`
message=`jsonval "json" $msgsrch`
[ ! -z "$message" ] || die "Cannot create admin profile error "$json
echo "[Configured sales user ...]"

##################################################
# Multi-Tenant Demo setup
##################################################
tenant1=${demotenants[2]}
tenant2=${demotenants[3]}
echo "[Authenticating as $tenant1 ...]"
json=`postjson $tenant1 $secflow $authevt "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'identity':'"$tenant1"admin', 'password':'"$tenant1"admin', 'type':'custom'}"`
sessid=`jsonval "$json" $sessrch`
[ ! -z "$sessid" ] || die "Cannot authenticate with server"
echo "[Authenticated Got sessionid: "$sessid"]"
echo ""

echo "[Configuring questionaire for $tenant1 ...]"
json=`postjson $tenant1 $surveyflow $createprime "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'"$surveyflow"'},'create':'Questionaire','data':{'questionaireFor':'demo1questions','questions':[{'question':'Do you develop products', 'recordEmail':0}, {'question':'Does your product service mutiple customers', 'recordEmail':0}, {'question':'If yes, do you customize for your customers', 'recordEmail':0},{'question':'SMART provides Plug and Play architecture where you can assemble services. Can you see an application of this in your product', 'recordEmail':0}, {'question':'FixChg is a market place for reusable services. Would you contribute in the marketplace', 'recordEmail':0}, {'question':'Would you contribute to the effort of developing SMART, in the open source model', 'recordEmail':1}]}}" $sessid`
message=`jsonval "json" $depsrch`
[ ! -z "$message" ] || die "Cannot create newsletter error "$json
echo "[Configured questionaire for $tenant1 ...]"

echo "[Authenticating as $tenant2 ...]"
json=`postjson $tenant2 $secflow $authevt "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'identity':'"$tenant2"admin', 'password':'"$tenant2"admin', 'type':'custom'}"`
sessid=`jsonval "$json" $sessrch`
[ ! -z "$sessid" ] || die "Cannot authenticate with server"
echo "[Authenticated Got sessionid: "$sessid"]"
echo ""

echo "[Configuring questionaire for $tenant2 ...]"
json=`postjson $tenant2 $surveyflow $createprime "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'"$surveyflow"'},'create':'Questionaire','data':{'questionaireFor':'demo1questions','questions':[{'question':'Do you develop mobile products', 'recordEmail':0}, {'question':'Does your application have a server component', 'recordEmail':0},{'question':'If yes, what do you use for the server side components', 'recordEmail':0}, {'question':'FixChg is a market place for reusable services. Would you these reusable services in your mobile app', 'recordEmail':0}, {'question':'Would you like to subscribe to SMARTQuest, a newsletter about SMART Provide Email.','recordEmail':1}]}}" $sessid`
message=`jsonval "json" $depsrch`
[ ! -z "$message" ] || die "Cannot create newsletter error "$json
echo "[Configured questionaire for $tenant2 ...]"



