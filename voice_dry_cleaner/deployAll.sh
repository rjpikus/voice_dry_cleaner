#!/usr/bin/env bash

ARRAY=( 'voice dry cleaner dot com' 'my dry cleaner' 'Apthorp Cleaners'
 'Sudsies Cleaners' 'Champion Cleaners' 'The Plaza Cleaners'
 "J's Cleaners" 'Appearance Plus' 'Collins Cleaners' 'NuTone Cleaners'
 'Dublin Cleaners');
ELEMENTS=${#ARRAY[@]}
for ((i=0; i<$ELEMENTS; i++));
do
    sh deploy-prod.sh "${ARRAY[$i]}"
    if [ $1 ]
    then
        echo "Submitting for certification alexaSkill for ${ARRAY[$i]}"
        sh certification.sh 
    fi
done
rm *.zip