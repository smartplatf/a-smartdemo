#!/bin/bash

dirname=`dirname $0`
source $dirname/helperfunctions.sh

input=animaldata.txt

while IFS='|' read id cate product name cost desc avail file
do
    echo "Uploading data $id:$cate:$product:$name:$cost:$desc:$avail:$file"
done < "$input"
