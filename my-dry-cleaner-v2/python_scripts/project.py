import optparse
import os
import json
from functions import fileWriter
# Import variables skillId, LambdaARN, invocation, smallUrl, largeUrl from app.py
from app import skillId,lambdaARN,invocation,smallUrl,largeUrl,businessName,profile

# import name of company from app.py
name = businessName

# @project
#   string representation of project.js with variables skillId, LambdaARN, invocation, smallUrl, largeUrl retrieved from app.py
print("Creating project.js file for " +  name + "......\n")
project ="""// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------
var skillId = "%s";
var prodLambda = "%s";
const devLambda = "arn:aws:lambda:us-east-1:604715680480:function:TEST-Dry-Cleaner"
var business = "%s";
var smallLogo = "%s"
var largeLogo = "%s"
 
module.exports = {
    endpoint: '${JOVO_WEBHOOK_URL}',
    stages: {
        local: {
            alexaSkill: {
                nlu: 'alexa',
                skillId: skillId, // voice dry cleaner dot com Skill ID
                endpoint: 'arn:aws:lambda:us-east-1:604715680480:function:TEST-Dry-Cleaner', // Dev Lambda ARN
                manifest: {
					publishingInformation: {
                        locales: {
                            "en-US":{
                                summary: "Dry Cleaning & Laundry Pickup and Delivery Service",
								description: "Dry Cleaning and Laundry becomes easier with pickup and delivery dry cleaning and laundry services. Just say 'Alexa, talk to " + business + "' to get started! Now you can tell " + business + " you are on your way so they can have your clothes ready by the time you get there! Just say, 'Alexa, tell " + business + " I am on my way' to let " + business + " know you are on your way!",
                                examplePhrases: [
                                    "Alexa open " + business + " ",
                                    "pickup my dry cleaning",
                                    "create a new dry cleaning pickup request"
                                ],
                                keywords: [
                                    "Dry Cleaning",
                                    "Drycleaning",
                                    "Cleaning",
                                    "Cleaner",
                                    "Laundry",
                                    "Delivery",
                                    "my dry cleaners",
                                    "my cleaner",
                                    "USA",
                                    "ohio",
                                    "Service",
                                    "dry clean",
                                    "voice",
                                    business,
                                    "voice dry cleaner",
                                    "voice first",
                                    "Dry"
                                ],
                                smallIconUri: smallLogo,
                                largeIconUri: largeLogo,
                                name: business
                            },
                        },
                        isAvailableWorldwide: true,
                        testingInstructions: "1) say Alexa, " + business+ " ",
                        category: "SMART_HOME",
                        distributionCountries: []
                    },
                     apis: {
                         custom: {
                            interfaces: [
                                {
                                    type: 'CAN_FULFILL_INTENT_REQUEST',
                                },
                                {
                                    type: 'ALEXA_PRESENTATION_APL'
                                }
                            ]
                         }
                     },
                     permissions: [
                        {
                            name: 'alexa::devices:all:notifications:write'
                        },
                        {
                            name: 'alexa::devices:all:geolocation:read'
                        },
                        {
                            name: 'alexa::devices:all:address:full:read'
                        }
                     ],
                 },
             },
            googleAction: {
                nlu: 'dialogflow',
                dialogflow: {
                    projectId: 'voicedrycleanerdotcom',
                    keyFile: './src/dialogflowServiceAccountKey-DEV.json',
                    endpoint: 'https://7pb4nzyo64.execute-api.us-east-1.amazonaws.com/DEV',
                },
            },
        },
        dev: {
            alexaSkill: {
                nlu: {
                    name: 'alexa',
                },
                skillId: skillId, // voice dry cleaner dot com Skill ID
                endpoint: devLambda, // Dev Lambda ARN
                manifest: {
                    publishingInformation: {
                        locales: {
                            "en-US":{
                                summary: "Dry Cleaning & Laundry Pickup and Delivery Service",
								description: "Dry Cleaning and Laundry becomes easier with pickup and delivery dry cleaning and laundry services. Just say 'Alexa, talk to " + business + "' to get started! Now you can tell " + business + " you are on your way so they can have your clothes ready by the time you get there! Just say, 'Alexa, tell " + business + " I am on my way' to let " + business + " know you are on your way!",
                                examplePhrases: [
                                    "Alexa open " + business + " ",
                                    "pickup my dry cleaning",
                                    "create a new dry cleaning pickup request"
                                ],
                                keywords: [
                                    "Dry Cleaning",
                                    "Drycleaning",
                                    "Cleaning",
                                    "Cleaner",
                                    "Laundry",
                                    "Delivery",
                                    "my dry cleaners",
                                    "my cleaner",
                                    "USA",
                                    "ohio",
                                    "Service",
                                    "dry clean",
                                    "voice",
                                    business,
                                    "voice dry cleaner",
                                    "voice first",
                                    "Dry"
                                ],
                                smallIconUri: smallLogo,
                                largeIconUri: largeLogo,
                                name: business,
                                description: "Dry Cleaning and Laundry becomes easier with pickup and delivery dry cleaning and laundry services. Just say 'Alexa, talk to " + business + "' to get started!"
                            },
                        },
                        isAvailableWorldwide: true,
                        testingInstructions: "1) say Alexa, " + business+ " ",
                        category: "SMART_HOME",
                        distributionCountries: []
                    },
                    apis: {
                        custom: {
                            endpoint: {
                                "uri": devLambda
                            },
                            interfaces: [
                                {
                                    type: 'CAN_FULFILL_INTENT_REQUEST',
                                },
                                {
                                    type: 'ALEXA_PRESENTATION_APL'
                                }
                            ]
                        }
                    },
                    permissions: [
                        {
                            name: 'alexa::devices:all:notifications:write'
                        },
                        {
                            name: 'alexa::devices:all:geolocation:read'
                        },
                        {
                            name: 'alexa::devices:all:address:full:read'
                        }
                    ],
                    "privacyAndCompliance": {
                        "allowsPurchases": false,
                        "usesPersonalInfo": false,
                        "isChildDirected": false,
                        "isExportCompliant": true,
                        "containsAds": false,
                        "locales": {
                            "en-US": {
                                "privacyPolicyUrl": "http://voicefirsttech.com/my-dry-cleaner/privacy-policy.pdf",
                                "termsOfUseUrl": "https://voicefirsttech.com/my-dry-cleaner/terms-of-use.pdf"
                            }
                        }
                    },
                },
             },
            googleAction: {
                nlu: 'dialogflow',
                dialogflow: {
                    projectId: 'voicedrycleanerdotcom',
                    keyFile: './src/dialogflowServiceAccountKey-DEV.json',
                    endpoint: 'https://7pb4nzyo64.execute-api.us-east-1.amazonaws.com/DEV',
                },
            },
        },
        prod: {
            alexaSkill: {
                nlu: {
                    name: 'alexa',
                },
                skillId: skillId, // voice dry cleaner dot com Skill ID
                endpoint: prodLambda, // Prod Lambda ARN
                manifest: {
                    publishingInformation: {
                        locales: {
                            "en-US":{
                                summary: "Dry Cleaning & Laundry Pickup and Delivery Service",
								description: "Dry Cleaning and Laundry becomes easier with pickup and delivery dry cleaning and laundry services. Just say 'Alexa, open " + business + "' to get started! Now you can tell " + business + " you are on your way so they can have your clothes ready by the time you get there! Just say, 'Alexa, tell " + business + " I am on my way' to let " + business + " know you are on your way!",
                                examplePhrases: [
                                    "Alexa open " + business + " ",
									"I am on my way",
                                    "pickup my dry cleaning",
                                ],
                                keywords: [
                                    "Dry Cleaning",
                                    "Drycleaning",
                                    "Cleaning",
                                    "Cleaner",
                                    "Laundry",
                                    "Delivery",
                                    "my dry cleaners",
                                    "my cleaner",
                                    "USA",
                                    "ohio",
                                    "Service",
                                    "dry clean",
                                    "voice",
                                    business,
                                    "voice dry cleaner",
                                    "voice first",
                                    "Dry"
                                ],
                                smallIconUri: smallLogo,
                                largeIconUri: largeLogo,
                                name: business
                            },
                        },
                        isAvailableWorldwide: true,
                        testingInstructions: "1) say Alexa, launch " + business+ " 2) say On Demand Pickup 3) use Amazon for name 4) Complete information 5) set Special Note to: 'test from Amazon' * PLEASE SET SPECIAL NOTE TO 'test from Amazon' to prevent alerting our customers. ",
                        category: "SMART_HOME",
                        distributionCountries: []
                    },
                    apis: {
                        custom: {
                            endpoint: {
                                uri: prodLambda
                            },
                            interfaces: [
                                {
                                    type: 'CAN_FULFILL_INTENT_REQUEST',
                                },
                                {
                                    type: 'ALEXA_PRESENTATION_APL'
                                }
    
                            ]
                        }
                    },
                    permissions: [
                        {
                            name: 'alexa::devices:all:notifications:write'
                        },
                        {
                            name: 'alexa::devices:all:geolocation:read'
                        },
                        {
                            name: 'alexa::devices:all:address:full:read'
                        }
                    ],
                    "privacyAndCompliance": {
                        "allowsPurchases": false,
                        "usesPersonalInfo": false,
                        "isChildDirected": false,
                        "isExportCompliant": true,
                        "containsAds": false,
                        "locales": {
                            "en-US": {
                                "privacyPolicyUrl": "http://voicefirsttech.com/my-dry-cleaner/privacy-policy.pdf",
                                "termsOfUseUrl": "https://voicefirsttech.com/my-dry-cleaner/terms-of-use.pdf"
                            }
                        }
                    },
                },
             },
            googleAction: {
                nlu: 'dialogflow',
                dialogflow: {
                    projectId: 'voicedrycleanerdotcom',
                    keyFile: './src/dialogflowServiceAccountKey-DEV.json',
                    endpoint: 'https://90dhlrqxs6.execute-api.us-east-1.amazonaws.com/google-publish',
                },
            },
        },
    }
};"""%(skillId,lambdaARN,name,smallUrl,largeUrl) 
fileWriter("../project.js","w+",project)
print("Success\n")

print("writing bash script with skill id for " + name + " to submit for skill certifcation\n")
certification = """#!/bin/bash
ask api submit -s %s -p %s
"""%(skillId,profile)
fileWriter("../certification.sh", "w",certification)
print("Success")

