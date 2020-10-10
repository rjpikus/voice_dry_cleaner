import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://www.googleapis.com/auth/spreadsheets']
credentials = ServiceAccountCredentials.from_json_keyfile_name('google-sheets.json', scope)
gc = gspread.authorize(credentials)
sh = gc.open_by_key('1qK6bTIt7kRJxR1he222fUGnPlPRv3xZinvUZdsR_9fY')
worksheet = sh.worksheet("PublishingInfo")
max_rows = len(worksheet.col_values(2)) #this is a list of list of all data and the length is equal to the number of rows including header row if it exists in data set
print("\n Getting Skill Id of newly created skill")
file = open("hello-world/.ask/config",'r')
content = file.read()
file.close()
crap = content.split("\n")
crap = "".join(crap)
id = crap.replace("{","")
id = id.replace(" ","")
id = id.replace("\"deploy_settings\":","")
id = id.replace("\"default\":","")
id = id.replace("\"","")
id = id.replace("}","")
id = id.replace(":","")
id = id.replace("was_clonedfalse,","")
id = id.replace("merge","")
id = id.replace("resources","")
id = id.replace("manifest","")
id = id.replace("eTaga0e6e0a5f469579b3375c6c92c4c12d2","")
id = id.replace("interactionModel","")
id = id.replace("en-US","")
id = id.replace(",","")
id = id.replace("skill_id","")
id = id.replace("eTagba4513016605e189b35d1916b113167c","")
fullStr = id    
print("Success!!\n")
print("Adding Skill Id to Google Sheet.....\n")
worksheet.update_cell(max_rows+1,2,fullStr)
print("Success!!\n")

max_skill_rows = len(worksheet.col_values(2))
max_name_rows = len(worksheet.col_values(1))
if max_name_rows >= max_skill_rows :
	print("Getting project information....\n")
	cell = worksheet.find(fullStr)
	businessName = worksheet.cell(cell.row,1).value
	name = businessName
	skillId = worksheet.cell(cell.row,2).value
	smallUrl = worksheet.cell(cell.row,3).value
	largeUrl = worksheet.cell(cell.row,4).value
	invocation = worksheet.cell(cell.row,5).value
	profile = worksheet.cell(cell.row,6).value
	print("Success!!\n")
	project = """// ------------------------------------------------------------------
	// JOVO PROJECT CONFIGURATION
	// ------------------------------------------------------------------
	var skillId = "%s";
	var prodLambda = "https://6gihers8kl.execute-api.us-east-1.amazonaws.com/skillCreation";
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
								endpoint: {
									sslCertificateType: "Trusted",
									uri: 'https://webhook.jovo.cloud/6cf661d2-b784-42f3-8b91-8143b940a1aa'
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
								uri: 'https://webhook.jovo.cloud/68cd49d6-004c-4021-ae9d-6f68baf3d8c8' // Simply place your Jovo Webhook URL here
							},
						}
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
	};"""%(skillId,businessName,smallUrl,largeUrl)
	f = open("project.js","w")
	f.write(project)
	f.close()
	print("Success\n")
	print ("Creating language model for " + name + "......\n")
	model = """{
	"invocation": "%s",
	"intents": [
		{
			"name": "FirstNameIntent",
			"inputs": [
				{
					"name": "name",
					"type": {
						"alexa": "AMAZON.US_FIRST_NAME",
						"dialogflow": "@sys.given-name"
					}
				}
			],
			"phrases": [
				"i go by {name}",
				"call me {name}",
				"my name is {name}",
				"{name}"
			]
		},
		{
			"name": "NotifyArrivalIntent",
			"inputs": [
				{
					"name": "name",
					"type": {
						"alexa": "AMAZON.US_FIRST_NAME",
						"dialogflow": "@sys.given-name"
					}
				},
				{
					"name": "phoneNumber",
					"type": {
						"alexa": "AMAZON.PhoneNumber",
						"dialogflow": "@sys.phone-number"
					}
				},
				{
					"name": "fullName",
					"type": {
						"alexa": "AMAZON.Person"
					}
				}
			],
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
				"let them know I am on my way",
				"I am on my way",
				"I'm on my way",
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
			"name": "PickupRequestIntent",
			"phrases": [
				"on demand",
				"on demand pickup",
				"place pickup order",
				"on demand pickup order",
				"request on demand",
				"request pickup",
				"come get it",
				"come to my house",
				"get over here",
				"pickup my laundry",
				"add me to pickup route",
				"place pickup request",
				"pickup my clothes",
				"come to my house"
			]
		},
		{
			"name": "PhoneNumberIntent",
			"inputs": [
				{
					"name": "phoneNumber",
					"type": {
						"alexa": "AMAZON.PhoneNumber",
						"dialogflow": "@sys.phone-number"
					}
				}
			],
			"phrases": [
				"it is {phoneNumber}",
				"my phone number is {phoneNumber}",
				"my number is {phoneNumber}",
				"{phoneNumber}"
			]
		},
		{
			"name": "AddressEntryIntent",
			"inputs": [
				{
					"name": "addressLine",
					"type": {
						"alexa": "AMAZON.PostalAddress",
						"dialogflow": "@sys.street-address"
					}
				},
				{
					"name": "city",
					"type": {
						"alexa": "AMAZON.US_CITY",
						"dialogflow": "@sys.geo-city-us"
					}
				}
			],
			"phrases": [
				"My street address is {addressLine} and I live in {city}",
				"I live in {city} and my address is {addressLine}",
				"My address is {addressLine} in {city}",
				"{city} {addressLine}",
				"at {addressLine} {city}",
				"{addressLine} {city}",
				"I live at {addressLine} in {city}",
				"{addressLine} in {city}",
				"I'm at {addressLine} in {city}",
				"in {city} at {addressLine}",
				"in {city} I'm at {addressLine}"
			]
		},
		{
			"name": "SpecialNoteIntent",
			"inputs": [
				{
					"name": "note",
					"type": {
						"alexa": "AMAZON.SearchQuery",
						"dialogflow": "@sys.any"
					}
				}
			],
			"phrases": [
				"Let the driver know {note}",
				"I need {note}",
				"I want them to know {note}",
				"please tell them {note}",
				"my note is {note}",
				"my {note}",
				"um {note}",
				"hmm {note}",
				"i have {note}",
				"there is {note}",
				"can you {note}",
				"please remember {note}",
				"ok {note}",
				"Let them know {note}",
				"please {note}",
				"need to {note}"
			]
		},
		{
			"name": "NameIsWrong",
			"inputs": [],
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
			"name": "PhoneNumberIsWrong",
			"inputs": [],
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
			"name": "AddressIsWrong",
			"inputs": [],
			"phrases": [
				"incorrect address",
				"address is wrong",
				"address",
				"you heard my address wrong",
				"My address is wrong"
			]
		},
		{
			"name": "NoteIsWrong",
			"inputs": [],
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
			"name": "YesIntent",
			"phrases": [
				"yes",
				"yeah",
				"ok",
				"sure"
			]
		},
		{
			"name": "NoIntent",
			"phrases": [
				"no",
				"nope",
				"nah"
			]
		}
	],
	"dialogflow": {
		"intents": [
			{
				"name": "Default Fallback Intent",
				"auto": true,
				"webhookUsed": true,
				"fallbackIntent": true
			},
			{
				"name": "Default Welcome Intent",
				"auto": true,
				"webhookUsed": true,
				"events": [
					{
						"name": "WELCOME"
					}
				]
			}
		]
	},
	"alexa": {
		"interactionModel": {
			"languageModel": {
				"intents": [
					{
						"name": "AMAZON.CancelIntent",
						"samples": []
					},
					{
						"name": "AMAZON.HelpIntent",
						"samples": []
					},
					{
						"name": "AMAZON.StopIntent",
						"samples": []
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
		},
		"dialog": {
			"intents": [
				{
					"name": "PhoneIntent",
					"confirmationRequired": true,
					"prompts": {
						"confirmation": "Confirm.Intent.457087248324"
					},
					"slots": [
						{
							"name": "address",
							"type": "AMAZON.StreetAddress",
							"confirmationRequired": false,
							"elicitationRequired": false,
							"prompts": {}
						}
					]
				},
				{
					"name": "AddressIntent",
					"confirmationRequired": true,
					"prompts": {
						"confirmation": "Confirm.Intent.891463556905"
					},
					"slots": [
						{
							"name": "name",
							"type": "AMAZON.US_FIRST_NAME",
							"confirmationRequired": false,
							"elicitationRequired": false,
							"prompts": {}
						},
						{
							"name": "address",
							"type": "AMAZON.StreetAddress",
							"confirmationRequired": false,
							"elicitationRequired": false,
							"prompts": {}
						}
					]
				}
			]
		},
		"prompts": [
			{
				"id": "Confirm.Intent.457087248324",
				"variations": [
					{
						"type": "PlainText",
						"value": "I have your address as {address} . Is this correct?"
					}
				]
			},
			{
				"id": "Confirm.Intent.891463556905",
				"variations": [
					{
						"type": "PlainText",
						"value": "I have your address as {address} . Is this correct?"
					}
				]
			}
		]
	}
	}
	"""%(invocation)
	s = open("./models/en-US.json", "w")
	s.write(model)
	f.close()
	print("Success\n")
	print("writing bash script with skill id for " + name + " to submit for skill certifcation\n")
	certification = """#!/bin/bash
	ask api submit -s %s -p %s
	"""%(skillId,profile)
	w = open("./certification.sh", "w")
	w.write(certification)
	w.close()
	print("Success")



