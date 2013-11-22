#!/bin/bash

dirname=`dirname $0`
source $dirname/helperfunctions.sh

#####################
#DECLARE VARIABLES USED TO SETUP
######################

server=$1
port=$2
uploadport=9021
installpath=$3
demodomain='localhost'

smartadm='smartadmin'
smartadmpwd='smartadmin'

datafile=animaldata.txt

######################
#CHANGE FOR NEW FLOWS TO BE ADDED
######################

declare -a deployfile=(
$installpath'/com/smart/blueprints/petstore/petstore/1.0-SNAPSHOT/petstore-1.0-SNAPSHOT.jar'
$installpath'/com/smart/blueprints/cart/cart/1.0-SNAPSHOT/cart-1.0-SNAPSHOT.jar'
$installpath'/org/smart/demo/review/review/1.0-SNAPSHOT/review-1.0-SNAPSHOT.jar'
)

declare -a deploysoa=(
'PetAnimalFlow.soa'
'PetstoreCartFlow.soa'
'ReviewDetailFlow.soa'
)

declare -a demotenants=(
'kennelindia'
'petshoppe'
)

declare -a defenable=(
'PetAnimalFlow'
'PetAnimalFlow'
)

declare -a defenablefeatures=(
'all'
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
petstore='PetAnimalFlow'
uploadevt='UploadEvent'

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

echo "[Deploying PetStore Flows ...]"
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
echo "[Deployed PetStore Flows ...]"
echo ""

echo "[Creating PetStore Tenants ...]"
for tenant in "${!demotenants[@]}"
do
    demot=${demotenants[$tenant]}
    defflow=${defenable[$tenant]}
    efeatures=${defenablefeatures[$tenant]}
    echo "[Creating Tenant "$demot" in domain "$demodomain"...]"
    json=`postjson $smartowner $adminflow $newtenantevt "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'"$smartowner"' },'enableFeatures':[ '"$efeatures"' ],'enableFlow':'"$defflow"','tenant':'"$demot"','domain':'"$demodomain"','clientOf':'SMART'}" $sessid`
    message=`jsonval "$json" $depsrch`
    [ ! -z "$message" ] || die "Cannot create tenant "$demot" with domain "$demodomain" Error "$json
    echo "[Created Tenant "$demot" in domain "$demodomain"...]"
done
echo "[Created PetStore Tenants ...]"
echo ""

############################
# Setting up data for tenant
############################
petenant=${demotenants[0]}

echo  '[Enabling Cart Flow for '$pptenant' ...]'
json=`postjson $smartowner $adminflow $enableevt "{'TenantAdmin':{'___smart_action___':'lookup','___smart_value___':'"$smartowner"'}, 'tenant':'"$petenant"','enableFeatures':[ 'all' ],'enableFlow':'PetstoreCartFlow','links':[{'name':'itemlink', 'flow':'PetAnimalFlow', 'object':'PetAnimal','attribute':'id'}]}" $sessid`
message=`jsonval "$json" $depsrch`
[ ! -z "$message" ] || die "Cannot deploy file CartFlow for $petenant error "$json
echo '[Enabled Flow CartFlow ...]'

echo "[Authenticating as $petenant ...]"
json=`postjson $petenant $secflow $authevt "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'identity':'"$petenant"admin', 'password':'"$petenant"admin', 'type':'custom'}"`
sessid=`jsonval "$json" $sessrch`
[ ! -z "$sessid" ] || die "Cannot authenticate with server"
echo "[Authenticated Got sessionid: "$sessid"]"
echo ""

while IFS='|' read id cate product name cost desc avail file
do
    echo "Uploading data $id:$cate:$product:$name:$cost:$desc:$avail:$file"
    json=`fileupload $petenant $petstore $uploadevt "$file" $sessid`
    uploadfile=`jsonval "$json" "Value-0"`
    [ ! -z "$uploadfile" ] || die "Cannot upload file $file $uploadfile"
    json=`postjson $petenant $petstore $createprime "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'$petstore'},'create':'PetAnimal','data':{'id':'$id','category':'$cate','type':'$product','name':'$name','price':$cost,'description':'$desc','availability':'$avail','imageURL':'$uploadfile'}}" $sessid`
    message=`jsonval "json" $depsrch`
    [ ! -z "$message" ] || die "Cannot create animal error "$json
done < "$datafile"


