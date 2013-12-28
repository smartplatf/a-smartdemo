#!/bin/bash

dirname=`dirname $0`
source $dirname/helperfunctions.sh

#####################
#DECLARE VARIABLES USED TO SETUP
######################

server=$1
port=$2
uploadport=9021

smartadm='smartadmin'
smartadmpwd='smartadmin'

datafile=$dirname/animaldata.txt

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

############################
# Setting up data for tenant
############################
petenant=$3

echo "[Authenticating as $petenant ...]"
json=`postjson $petenant $secflow $authevt "{'FlowAdmin':{'___smart_action___':'lookup', '___smart_value___':'"$secflow"'},'identity':'"$petenant"admin', 'password':'"$petenant"admin', 'type':'custom'}"`
sessid=`jsonval "$json" $sessrch`
[ ! -z "$sessid" ] || die "Cannot authenticate with server"
echo "[Authenticated Got sessionid: "$sessid"]"
echo ""

while IFS='|' read id cate product name cost desc avail file
do
    echo "Uploading data $id:$cate:$product:$name:$cost:$desc:$avail:$file"
    json=`fileupload $petenant $petstore $uploadevt "$dirname/$file" $sessid`
    uploadfile=`jsonval "$json" "Value-0"`
    [ ! -z "$uploadfile" ] || die "Cannot upload file $file $uploadfile"
    json=`postjson $petenant $petstore $createprime "{'FlowAdmin':{'___smart_action___':'lookup','___smart_value___':'$petstore'},'create':'PetAnimal','data':{'id':'$id','category':'$cate','type':'$product','name':'$name','price':$cost,'description':'$desc','availability':'$avail','imageURL':'$uploadfile'}}" $sessid`
    message=`jsonval "json" $depsrch`
    [ ! -z "$message" ] || die "Cannot create animal error "$json
done < "$datafile"

