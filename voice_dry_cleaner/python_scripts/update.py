import gspread
import optparse
import os
import json
from oauth2client.service_account import ServiceAccountCredentials
from config import sheetId
from functions import fileWriter
scope = ['https://spreadsheets.google.com/feeds',
		'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name('google-sheets.json', scope)
#Get Sheet ID from config.js file
sheetID = sheetId

#create worksheet
gc = gspread.authorize(credentials)
sh = gc.open_by_key(sheetID)
worksheet = sh.worksheet("faq")
worksheet2 = sh.worksheet("model")
reponse_list = worksheet2.col_values(1)
updateRow = len(reponse_list)
#get all the keys from google sheet
values_list = worksheet.col_values(1)
reprompt = 'answer.reprompt'

# creating a list of values in every base template
baseList = ['key','answer.reprompt']

# create a new list that has all the keys in our sheet minus those from baseList
l4 = [x for x in values_list if x not in baseList]
count = updateRow + 1
for each in l4 :
    if "?" in each or "prompt" not in each :
        cell = worksheet.find(each)
        row = cell.row
        key = each.replace("?","")
        phrase = "\""+key+"\""
        worksheet2.update_cell(count,2,phrase)
        key = key.lower()
        key = key.replace(" ",".")
        key = key + '.prompt'
        worksheet.update_cell(row,1,key)
        worksheet2.update_cell(count,1,key)
        count = count + 1
