# import module 
import gspread
import optparse
import numpy as np
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://www.googleapis.com/auth/spreadsheets.readonly']

credentials = ServiceAccountCredentials.from_json_keyfile_name('google-sheets.json', scope)

gc = gspread.authorize(credentials)

sh = gc.open_by_key('1qK6bTIt7kRJxR1he222fUGnPlPRv3xZinvUZdsR_9fY')
worksheet = sh.worksheet("PublishingInfo")

values_list = worksheet.col_values(1)
values_list = np.array(values_list)
values_list = np.delete(values_list,0)
str1 = str(values_list).replace('[','').replace(']','')

sheet = """#!/bin/bash

ARRAY=( %s);
ELEMENTS=${#ARRAY[@]}
for ((i=0; i<$ELEMENTS; i++));
do
    python sheets.py -b "${ARRAY[$i]}"
    if [ $1 ]
    then
        echo "Building alexaSkill for ${ARRAY[$i]}"
        jovo build -p alexaSkill --stage dev
    else
        echo "Building alexaSkill for ${ARRAY[$i]}"
        jovo deploy -p alexaSkill --stage prod
        sh certification.sh 
    fi
done
rm *.zip"""%(str1)
f = open("deployAll.sh","w")
f.write(sheet)
f.close()
