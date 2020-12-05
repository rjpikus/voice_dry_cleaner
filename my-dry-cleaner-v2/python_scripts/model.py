import gspread # module needed for accessing googlesheet 
import optparse 
import os
import json
from oauth2client.service_account import ServiceAccountCredentials
from shutil import copyfile
from functions import fileWriter 
from config import sheetId #import individual cleaner google sheet id

# @l4
#   import list of keys without keys from base list
from update import l4   
from app import invocation #import invocation name from app.py 

scope = ['https://spreadsheets.google.com/feeds',
		'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name('google-sheets.json', scope) 
#Get Sheet ID from config.js file
sheetID = sheetId

#create worksheet
gc = gspread.authorize(credentials)
sh = gc.open_by_key(sheetID)
worksheet = sh.worksheet("model")
base_Key_List = ['intents']
base_Values_List = ['phrases']

#get all the keys from google sheet
keys_list = l4
values_list = worksheet.col_values(2)
keys_list = [x for x in keys_list if x not in base_Key_List]
values_list = [x for x in values_list if x not in base_Values_List]
dictionary = dict(zip(keys_list, values_list)) # map of keys and corresponding values

# path to model.json file
fileName ="../models/en-US.json" 

# write the starting portion 
# of model.json file
start = """{
    "invocation": "%s", 
    "intents": [
        {
            "inputs": [
                {
                    "type": {
                        "dialogflow": "@sys.given-name", 
                        "alexa": "AMAZON.US_FIRST_NAME"
                    }, 
                    "name": "name"
                }
            ], 
            "name": "FirstNameIntent", 
            "phrases": [
                "i go by {name}", 
                "call me {name}", 
                "my name is {name}", 
                "{name}"
            ]
        }, 
        {
            "inputs": [
                {
                    "type": {
                        "dialogflow": "@sys.given-name", 
                        "alexa": "AMAZON.US_FIRST_NAME"
                    }, 
                    "name": "name"
                }, 
                {
                    "type": {
                        "dialogflow": "@sys.phone-number", 
                        "alexa": "AMAZON.PhoneNumber"
                    }, 
                    "name": "phoneNumber"
                }, 
                {
                    "type": {
                        "alexa": "AMAZON.Person",
                        "dialogflow": "@sys.person"
                    }, 
                    "name": "fullName"
                }
            ], 
            "name": "NotifyArrivalIntent", 
            "phrases": [
                "on my way", 
                "i am on my way", 
                "on way", 
                "on the way", 
                "i'm on the way", 
                "omw", 
                "i am on the way", 
                "on me way", 
                "in the way", 
                "in my way", 
                "on way", 
                "in way",
                "am on my way", 
                "let them know I am on my way", 
                "I am on my way", 
                "I'm on my way", 
                "tell them mom my wife",
                "angel on my way",
                "I am driving to the store", 
                "I am driving their way now", 
                "I am driving to their location", 
                "let them know I am on my way", 
                "let them know I'm on my way", 
                "let the cleaner know I am on my way", 
                "let the cleaner know I'm on my way", 
                "{name} is on my way", 
                "{fullName} is on my way", 
                "{phoneNumber} is on my way", 
                "{name} is on the way", 
                "{fullName} is on the way", 
                "{phoneNumber} is on the way", 
                "tell the cleaner Im on my way", 
                "tell cleaner {name} is on the way", 
                "my number is {phoneNumber} and I am on the way"
            ]
        }, 
        {
            "phrases": [
                "on demand", 
                "on demand pickup", 
                "on demand pick up",
                "place pickup order", 
                "on demand pickup order", 
                "request on demand", 
                "request pickup",
                "pick up request", 
                "come get it", 
                "come to my house", 
                "get over here", 
                "pickup my laundry", 
                "pickup my dry cleaning",
                "pick up my dry cleaning", 
                "add me to pickup route", 
                "place pickup request", 
                "pickup my clothes", 
                "come to my house",
                "free pick up from my house",
                "free dry cleaning pick up",
                "I want free dry cleaning pick up",
                "free pick up",
                "dry cleaning pick up",
                "free pick",
                "free pickup",
                "pick up",
                "delivery",
                "I demand pick up",
                "unlimited pick up",
                "I on demand"
            ], 
            "name": "PickupRequestIntent"
        },
        {
            "inputs": [
                {
                    "type": {
                        "dialogflow": "@sys.phone-number", 
                        "alexa": "AMAZON.PhoneNumber"
                    }, 
                    "name": "phoneNumber"
                }
            ], 
            "name": "PhoneNumberIntent", 
            "phrases": [
                "it is {phoneNumber}", 
                "phone number is {phoneNumber}", 
                "my phone number is {phoneNumber}", 
                "number is {phoneNumber}",
                "my number is {phoneNumber}", 
                "{phoneNumber}"
            ]
        }, 
        {
            "inputs": [
                {
                    "type": {
                        "dialogflow": "@sys.street-address", 
                        "alexa": "AMAZON.SearchQuery"
                    }, 
                    "name": "addressLine"
                }
            ], 
            "name": "AddressEntryIntent", 
            "phrases": [
                    "my address is {addressLine}",
                    "I live {addressLine}",
                    "I live at {addressLine}",
                    "My street address is {addressLine}",
                    " my address is {addressLine}",
                    "at {addressLine}"
            ]
        },  
        {
            "inputs": [], 
            "name": "NameIsWrong", 
            "phrases": [
                "It was my name", 
                "name", 
                "I need to put it under someone else", 
                "can I give you a different name", 
                "I need to re enter my name", 
                "you got the wrong name", 
                "my name is wrong"
            ]
        }, 
        {
            "inputs": [], 
            "name": "PhoneNumberIsWrong", 
            "phrases": [
                "It was my phone number", 
                "my phone is not right", 
                "my number is wrong", 
                "you got the wrong phone number", 
                "contact information", 
                "phone number"
            ]
        },
        {
            "inputs": [], 
            "name": "AddressIsWrong", 
            "phrases": [
                "incorrect address", 
                "address is wrong", 
                "address", 
                "you heard my address wrong", 
                "My address is wrong"
            ]
        }, 
        {
            "inputs": [], 
            "name": "NoteIsWrong", 
            "phrases": [
                "incorrect note", 
                "special note is wrong", 
                "note is wrong", 
                "special note", 
                "my special note is wrong", 
                "extra note is wrong", 
                "note details are wrong", 
                "note", 
                "my note is wrong", 
                "I need to change my note"
            ]
        },
        {
            "name": "CanYouFindAStoreNearMeIntent",
            "phrases": [
                "can you find a store",
                "find location",
                "find a store",
                "play the store",
                "zip code",
                "city search",
                "locate store by zip code",
                "find dry cleaners by city",
                "find stores by city",
                "find a cleaner",
                "find a dry cleaner",
                "store finder",
                "store locator",
                "locate a dry cleaner",
                "connect me with the dry cleaner",
                "{zip}",
                "find a store in {zip}",
                "locate a store in {zip}",
                "find stores in {zip}",
                "can you find {zip}",
                "{zip} stores",
                "{zip} locations",
                "stores in {zip}",
                "find {zip}",
                "use {zip}",
                "{city}",
                "search {city}",
                "search for {city}",
                "find stores in the city of {city}",
                "search the city of {city}",
                "city of {city}",
                "find a store in {city}",
                "locate a store in {city}",
                "find stores in {city}",
                "can you find {city}",
                "{city} stores",
                "{city} locations",
                "stores in {city}",
                "find {city}",
                "use {city}",
                "{street}",
                "find a store in {street}",
                "locate a store in {street}",
                "find stores in {street}",
                "can you find {street}",
                "{street} stores",
                "{street} locations",
                "stores in {street}",
                "find {street}",
                "use {street}",
                "{street} in {city}",
                "{street} {city}",
                "find {street} in {city}",
                "find dry cleaners near {street} in {city}",
                "find a store on {street} in {city}",
                "find a store on {street} {city}",
                "find a dry cleaner on {street} in {city}",
                "find a dry cleaner on {street} {city}",
                "locate a store on {street} in {city}",
                "find stores near {street} in {city}",
                "can you find {street} in {city}",
                "I want to find {street} in {city}",
                "find dry cleaners on {street} in {city}",
                "{street} {city} stores",
                "{street} {city} locations",
                "stores on {street} in {city}",
                "find {street} in {city}",
                "use {street} in {city}",
                "{businessType}",
                "find a store in {businessType}",
                "locate a store in {businessType}",
                "find stores in {businessType}",
                "can you find {businessType}",
                "{businessType} stores",
                "{businessType} locations",
                "stores in {businessType}",
                "find {businessType}",
                "use {businessType}",
                "{businessType} businesses",
                "find {businessType} businesses",
                "find {businessType} companies",
                "{businessType} companies",
                "{profession}", 
                "find a store for {profession}", 
                "locate a store for {profession}", 
                "find stores for {profession}", 
                "can you find {profession}", 
                "{profession} stores", 
                "{profession} locations", 
                "stores in {profession}", 
                "find {profession}", 
                "use {profession}", 
                "{profession} businesses", 
                "find {profession} businesses", 
                "find {profession} companies", 
                "{profession} companies",
                "find {profession} near me",
                "play the story",
                "yeah find a store",
                "find a story"
            ],
            "inputs": [
                {
                    "name": "zip",
                    "type": {
                        "alexa": "AMAZON.NUMBER",
                        "dialogflow": "@sys.zip-code"
                    }
                },
                {
                    "name": "city",
                    "type": {
                        "alexa": "AMAZON.US_CITY",
                        "dialogflow": "@sys.geo-city"
                    }
                },
                {
                    "name": "street",
                    "type": {
                        "alexa": "AMAZON.StreetName",
                        "dialogflow": "@sys.location"
                    }
                },
                {
                    "name": "businessType",
                    "type": {
                        "alexa": "AMAZON.LocalBusinessType",
                        "dialogflow": "@sys.location"
                    }
                },
                {
                    "type": {
                        "dialogflow": "@sys.location", 
                        "alexa": "AMAZON.ProfessionalType"
                    }, 
                    "name": "profession"
                }
            ]
        },
        {
            "name": "FindMyRealtimeLocationIntent",
            "phrases": [
                "real time",
                "Can you find a store near me",
                "I want to find a store near me",
                "find a store near me",
                "find a dry cleaner near me",
                "find a dry cleaner near my current location",
                "find a cleaner near me",
                "find a store near my real time location",
                "Find my Realtime Location", 
                "use my location", 
                "use my current location",
                "realtime location", 
                "my location",
                "look up my location",
                "current location", 
                "use my realtime location",
                "realtime location permission",
                "grant permission to use realtime location",
                "find stores close to my current location",
                "find stores close to my current location"
            ]
        },"""%(invocation)
fileWriter(fileName,"w+",start)

# write the faq intents 
# of model.json file
for x in keys_list :
    intent = x
    phrases = dictionary.get(intent,"none")
    intent = intent.replace('prompt','')
    intent = intent.replace('.', ' ')
    intent = intent.title()
    intent = intent.replace(' ','') + 'Intent'
    model = """        {
                "name": "%s",
                "phrases": [%s]
            },"""%(intent,phrases)
    fileWriter(fileName,'a+',model)

# write the closing portion 
# of model.json file
closing = """ {
            "name": "HelpIntent",
            "phrases": [
                "help",
                "please help",
                "help me",
                "please help me",
                "can you help me",
                "need help",
                "I need help",
                "assistance",
                "need assistance",
                "I do not know"
            ]
        },
                {
            "phrases": [
                "yes", 
                "yeah", 
                "ok", 
                "sure"
            ], 
            "name": "YesIntent"
        }, 
        {
            "phrases": [
                "no", 
                "nope", 
                "nah"
            ], 
            "name": "NoIntent"
        }, 
        {
            "inputs": [], 
            "name": "DeleteUserIntent", 
            "phrases": [
                "delete my information", 
                "delete all of my information", 
                "delete me from the syste", 
                "delete all of my data", 
                "delete my account information", 
                "delete my account", 
                "delete user information",
                "delete my account from the system", 
                "delete my account from your system", 
                "erase all of my data", 
                "delete all information associated with my account",
                "delete user",
                "delete",
                "delete my info",
                "delete me",
                "delete user info",
                "delete info",
                "delete the",
                "delete my affirmation"
            ]
        },
        {
            "inputs":[
                {
                    "name":"question",
                    "type": {
                        "alexa":"AMAZON.SearchQuery",
                        "dialogflow":"@sys.any"
                    }
                }
            ],
            "name":"CaptureIntent",
            "phrases": [
                " {question}"
            ]
        }
    ],
    "alexa": {
        "prompts": [
            {
                "variations": [
                    {
                        "type": "PlainText", 
                        "value": "I have your address as {address} . Is this correct?"
                    }
                ], 
                "id": "Confirm.Intent.457087248324"
            }, 
            {
                "variations": [
                    {
                        "type": "PlainText", 
                        "value": "I have your address as {address} . Is this correct?"
                    }
                ], 
                "id": "Confirm.Intent.891463556905"
            }
        ], 
        "dialog": {
            "intents": [
                {
                    "slots": [
                        {
                            "type": "AMAZON.StreetName", 
                            "prompts": {}, 
                            "confirmationRequired": false, 
                            "name": "address", 
                            "elicitationRequired": false
                        }
                    ], 
                    "confirmationRequired": true, 
                    "prompts": {
                        "confirmation": "Confirm.Intent.457087248324"
                    }, 
                    "name": "PhoneIntent"
                }, 
                {
                    "slots": [
                        {
                            "type": "AMAZON.US_FIRST_NAME", 
                            "prompts": {}, 
                            "confirmationRequired": false, 
                            "name": "name", 
                            "elicitationRequired": false
                        }, 
                        {
                            "type": "AMAZON.StreetName", 
                            "prompts": {}, 
                            "confirmationRequired": false, 
                            "name": "address", 
                            "elicitationRequired": false
                        }
                    ], 
                    "confirmationRequired": true, 
                    "prompts": {
                        "confirmation": "Confirm.Intent.891463556905"
                    }, 
                    "name": "AddressIntent"
                }
            ]
        }, 
        "interactionModel": {
            "languageModel": {
                "intents": [
                    {
                        "name": "AMAZON.CancelIntent", 
                        "samples": []
                    }, 
                    {
                        "name": "AMAZON.HelpIntent", 
                        "samples": [
                            "learn more", 
                            "i want to learn more", 
                            "tell me more"
                        ]
                    }, 
                    {
                        "name": "AMAZON.StopIntent", 
                        "samples": [
                            "stop"
                        ]
                    }, 
                    {
                        "name": "AMAZON.YesIntent", 
                        "samples": []
                    }, 
                    {
                        "name": "AMAZON.NoIntent", 
                        "samples": []
                    }
                ]
            }
        }
    }, 
    "dialogflow": {
        "intents": [
            {
                "auto": true, 
                "fallbackIntent": true, 
                "name": "Default Fallback Intent", 
                "webhookUsed": true
            }, 
            {
                "auto": true, 
                "webhookUsed": true, 
                "events": [
                    {
                        "name": "WELCOME"
                    }
                ], 
                "name": "Default Welcome Intent"
            }
        ]
    }
}"""
fileWriter(fileName,'a',closing)

