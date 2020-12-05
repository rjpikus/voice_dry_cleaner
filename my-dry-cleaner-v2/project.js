// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------
var skillId = "amzn1.ask.skill.95a83517-5356-4d5d-858e-d361c83e746e";
var prodLambda = "arn:aws:lambda:us-east-1:604715680480:function:Dublin-Cleaners-V5-FAQ";
const devLambda = "arn:aws:lambda:us-east-1:604715680480:function:TEST-Dry-Cleaner"
var business = "Dublin Cleaners";
var smallLogo = "https://firebasestorage.googleapis.com/v0/b/mydrycleaner-be879.appspot.com/o/dry-cleaners%2Fdublin_cleaners%2F108x108.png?alt=media"
var largeLogo = "https://firebasestorage.googleapis.com/v0/b/mydrycleaner-be879.appspot.com/o/dry-cleaners%2Fdublin_cleaners%2F512x512.png?alt=media"
 
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
                                sslCertificateType: "Trusted",
                                "uri": "arn:aws:lambda:us-east-1:604715680480:function:TEST-Dry-Cleaner"
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
                        }
                    ],
                    events: {
                        endpoint: {
                            uri: prodLambda // Simply place your Lambda ARN to prevent SSLCertificate Errors
                        },
                    },
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
};