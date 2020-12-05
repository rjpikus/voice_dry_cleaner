import gspread
import optparse
import os
import json
from oauth2client.service_account import ServiceAccountCredentials
from functions import getGoogleSheetId
from update import l4
from config import sheetId
scope = ['https://spreadsheets.google.com/feeds',
		'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name('google-sheets.json', scope)
#Get Sheet ID from config.js file
sheetID = sheetId

#create worksheet
gc = gspread.authorize(credentials)
sh = gc.open_by_key(sheetID)
worksheet = sh.worksheet("responses")

#get all the keys from google sheet
values_list = l4

reprompt = 'answer.reprompt'

# creating a list of values in every base template
baseList = ['key','welcome.speech','welcome.reprompt','greeting.speech',
            'end.speech','help.global.speech','help.global.reprompt','unhandled.global.speech',
            'unhandled.global.reprompt','answer.reprompt']

# create a new list that has all the keys in our sheet minus those from baseList
l3 = [x for x in values_list if x not in baseList]

for x in l3 :
    intent = x
    prompt = x
    intent = intent.replace('prompt','')
    test = intent
    test = test + 'test.js'
    testFile = './test/'+test
    intent = intent.replace('.', ' ')
    intent = intent.title()
    description = intent
    intent = intent.replace(' ','') + 'Intent'
    f = open (testFile,"w+")
    tests = """const {App,Util} = require('jovo-framework');
            const { GoogleAssistant } = require('jovo-platform-googleassistant');
            const { Alexa } = require('jovo-platform-alexa');
            
            for (const p of[ new Alexa(), new GoogleAssistant()]){
            const testSuite = p.makeTestSuite();
            describe(`PLATFORM: ${p.constructor.name} %s`, () => {

                test('description', async () => {

                const conversation = testSuite.conversation({locale:'keys-only'})

                const intentRequest = await testSuite.requestBuilder.intent('%s')
                const responseToIntentRequest = await conversation.send(intentRequest)

                expect(responseToIntentRequest.getSpeech()).toMatch('%s')
                expect(responseToIntentRequest.getReprompt()).toMatch('%s')

                })
            })
            }"""%(description,intent,prompt,reprompt)
    f.write(tests)
    f.close()