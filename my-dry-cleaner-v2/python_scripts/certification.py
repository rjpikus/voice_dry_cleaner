import optparse
import os
import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from functions import fileWriter

scope = ['https://spreadsheets.google.com/feeds',
		'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name('google-sheets.json', scope)
gc = gspread.authorize(credentials)
sh = gc.open_by_key('1qK6bTIt7kRJxR1he222fUGnPlPRv3xZinvUZdsR_9fY')
worksheet = sh.worksheet("PublishingInfo")
keysList_temp = worksheet.col_values(1)
skillIdList_temp = worksheet.col_values(2)
profileList_temp = worksheet.col_values(6)
baseList = ['company','skillId','smallUrl','largeUrl','invocation','profile','lambdaARN','sheetLink','phone']
keysList = [x for x in keysList_temp if x not in baseList]
#keysList = np.array(keysList)
keys = str(keysList).replace('[','').replace(']','').replace(',','')
skillIdList = [x for x in skillIdList_temp if x not in baseList]
#skillIdList = np.array(skillIdList)
skillId = str(skillIdList).replace('[','').replace(']','').replace(',','')
profileList = [x for x in profileList_temp if x not in baseList]
#profileList = np.array(profileList)
profile = str(profileList).replace('[','').replace(']','').replace(',','')
print("writing bash script with skill id for all cleaners to submit for skill certifcation\n")
certification = """#!/usr/bin/env bash
ARRAY=( %s);
SKILL=( %s);
PROFILE=( %s);
ELEMENTS=${#ARRAY[@]}
for ((i=0; i<$ELEMENTS; i++));
do
    echo "Submitting for certification alexaSkill for ${ARRAY[$i]}"
    ask api submit -s ${SKILL[$i]} -p ${PROFILE[$i]}
done
"""%(keys,skillId,profile)
fileWriter("../certifyAll.sh", "w",certification)
print("Success")