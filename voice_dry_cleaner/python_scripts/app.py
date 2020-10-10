import optparse
import os
import json
from functions import fileWriter
from update import l4
from config import sheetId
import gspread
from oauth2client.service_account import ServiceAccountCredentials

parser = optparse.OptionParser('usage%prog'+'--name<name>')
parser.add_option('-b',dest='name', help='name of the dry cleaner')
(options,args) = parser.parse_args()
name = options.name

scope = ['https://spreadsheets.google.com/feeds',
		'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name('google-sheets.json', scope)

gc = gspread.authorize(credentials)
sh = gc.open_by_key('1qK6bTIt7kRJxR1he222fUGnPlPRv3xZinvUZdsR_9fY')
worksheet = sh.worksheet("PublishingInfo")
keysList_temp = worksheet.col_values(1)
skillIdList_temp = worksheet.col_values(2)
smallUrlList_temp = worksheet.col_values(3)
largeUrlList_temp = worksheet.col_values(4)
invocationList_temp = worksheet.col_values(5)
profileList_temp = worksheet.col_values(6)
lambdaList_temp = worksheet.col_values(7)
sheetLinkList_temp = worksheet.col_values(8)
phoneList_temp = worksheet.col_values(9)
baseList = ['company','skillId','smallUrl','largeUrl','invocation','profile','lambdaARN','sheetLink','phone']
keysList = [x for x in keysList_temp if x not in baseList]
skillIdList = [x for x in skillIdList_temp if x not in baseList]
smallUrlList = [x for x in smallUrlList_temp if x not in baseList]
largeUrlList = [x for x in largeUrlList_temp if x not in baseList]
invocationList = [x for x in invocationList_temp if x not in baseList]
profileList = [x for x in profileList_temp if x not in baseList]
lambdaList = [x for x in lambdaList_temp if x not in baseList]
sheetLinkList = [x for x in sheetLinkList_temp if x not in baseList]
phoneList = [x for x in phoneList_temp if x not in baseList]
skillId_dictionary = dict(zip(keysList,skillIdList))
smallUrl_dictionary = dict(zip(keysList,smallUrlList))
largeUrl_dictionary = dict(zip(keysList,largeUrlList))
invocation_dictionary = dict(zip(keysList,invocationList))
profile_dictionary = dict(zip(keysList,profileList))
lambda_dictionary = dict(zip(keysList,lambdaList))
sheetLink_dictionary = dict(zip(keysList,sheetLinkList))
phone_dictionary = dict(zip(keysList,phoneList))

print()
print("Getting information for " + name + ".......\n")
businessName = name
skillId = skillId_dictionary.get(name,"none")
smallUrl = smallUrl_dictionary.get(name,"none")
largeUrl = largeUrl_dictionary.get(name,"none")
invocation = invocation_dictionary.get(name,"none")  
profile = profile_dictionary.get(name,"none")
lambdaARN = lambda_dictionary.get(name,"none")
phone = phone_dictionary.get(name,"none")
sheetID = sheetId
filePath = "../src/app.js"
write = "w+"
appendPlus = "a+"
append = "a"

#get all the keys from google sheet
values_list = l4

reprompt = 'answer.reprompt'

# creating a list of values in every base template
baseList = ['key','answer.reprompt']

# create a new list that has all the keys in our sheet minus those from baseList
l3 = [x for x in values_list if x not in baseList]

# write the starting portion of app.js file

header = """'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { db } = require('./db.js');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { GoogleSheetsCMS } = require('jovo-cms-googlesheets');
//DYNAMO DB INIT
const { DynamoDb } = require('jovo-db-dynamodb');

const GeoSpatial = require('./Selina/spatial-analysis.js')

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb(),
    new GoogleSheetsCMS(),
    new DynamoDb()
);

//Import Functions
var display = require('./displayAPL');

//End of FIREBASE INITIALIZATION

const accountSid = 'AC63637242234d8751ba63f2edbf18c2d5';
const authToken = 'c486e9aa265cdf033087be0b016be063'
const client = require('twilio')(accountSid, authToken);
var businessName;

//GoogleSheet Init
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./credentials/google-sheets.json');
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('%s');

//Import indvidual intent files
const launch = require('./Intents/launch');
const firstName = require('./Intents/firstName');
const address = require('./Intents/address');
const verify = require('./Intents/verify');
const orderConfirmation = require('./Intents/orderConfirmation');
const specialNoteAsk = require('./Intents/specialNoteAsk');
const specialNoteEntry = require('./Intents/specialNoteEntry');
const reEntry = require('./Intents/ReEntry');
const endConversation = require('./Intents/endConversation');
const unhandle = require('./Intents/unhandled');
const notifyArrival = require('./Intents/notifyArrival');
const deleteUser = require('./Intents/deleteUser');

//Import Functions
var display = require('./displayAPL');


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({

    /**
     * NEW_SESSION - Triggered when a user opens your app, no matter the query (new session)
     */
    NEW_SESSION() {
        this.$speech.addAudio("https://s3.amazonaws.com/sonic-branding/launch.mp3");
        // Complete / Incomplete Order
        this.setSessionAttribute("orderComplete",false);
    },

    /**
     * ON_REQUEST - Triggered with every request
     */
    ON_REQUEST() {
        businessName = "%s"
    },

    /**
     * ON_EVENT - Triggered with Special Events from AMAZON ALEXA
     */
    ON_EVENT: {
        'AlexaSkillEvent.SkillEnabled'() {
            console.log('AlexaSkillEvent.SkillEnabled');        
        },
        'AlexaSkillEvent.SkillDisabled'() {
            console.log('AlexaSkillEvent.SkillDisabled');
            console.log(`UserId: ${this.getUserId()}`);
        },
        'AlexaSkillEvent.SkillPermissionAccepted'() {
            console.log('AlexaSkillEvent.SkillPermissionAccepted');
            console.log(`UserId: ${this.getUserId()}`);     
            console.log(`Permissions: ${JSON.stringify(this.$alexaSkill.getSkillEventBody().acceptedPermissions)}`);    
        },
        'AlexaSkillEvent.SkillPermissionChanged'() {
            console.log('AlexaSkillEvent.SkillPermissionChanged');
            console.log(`UserId: ${this.$user.Id()}`);      
            console.log(`Permissions: ${JSON.stringify(this.$alexaSkill.getSkillEventBody().acceptedPermissions)}`);    
        },
    },

    /**
     * CAN_FULFILL_INTENT - Triggered with Alexa CanFulfillIntentRequest
     */
    CAN_FULFILL_INTENT() {
        // first step - check if the incoming intent is one that our skill can handle.
        let intentName = this.getIntentName()
        let intentsWeCanFulfill = [ "WelcomeIntent", "SpecialNoteIntent", "NotifyArrivalIntent"]
        if (intentsWeCanFulfill.includes(intentName)) {
            this.canFulfillRequest();
        } else {
            this.cannotFulfillRequest();
        }
    },

    /**
     * LAUNCH - App entry point
     */
    async LAUNCH () { launch.launch( this ); },

    /**
     * LaunchAlexa - Launch Permission Weclome from Alexa
     *
     * @return {type}  Welcome customer
     */
    LaunchAlexa () { launch.alexa( this , businessName ); },

    /**
     * WelcomeIntent - Launch Permission Weclome from Google Assistant
     *
     * @return {type}   Welcome customer
     */
    WelcomeIntent () { launch.welcome( this , businessName ); },
/**
     * NotifyArrivalIntent - customer wants to inform dry cleaner that they are on their way
     */
    NotifyArrivalIntent() { notifyArrival.notifyArrival(this, businessName); },

    NotifyArrivalState : {
        /**
         * NotifyArrivalIntent - customer wants to inform dry cleaner that they are on their way
         */
        NotifyArrivalIntent() { notifyArrival.notifyArrival(this, businessName); },

        /**
         * PhoneNumberIntent - captures customer phone number
         *
         * @param phoneNumber - user entered phone number
         */
        PhoneNumberIntent() {
            notifyArrival.notifyArrival(this, businessName);
        },
    },

    /**
     * FirstNameState - state for name entry
    */
    FirstNameState : {
        /** FirstNameIntent - takes in name, and moves to order Type state
         *
         * @param name - user input name
        */
        FirstNameIntent () { firstName.name( this, businessName ); },

        /**
        * HelpIntent - provides a help message if the user says "help"
        */
        HelpIntent () { firstName.help( this, businessName ); },
    },

    /**
     * AddressState - state for address retrieval, through permission grant, or manual entry
    */
    'AddressState' : {
        /**
         * EntryState - state for manually entering an address if the user denies access, or re-entry is needed
         */
        'EntryState' : {
            /**
             * AddressEntryIntent - intent for manually entering an address
             */
            AddressEntryIntent () { address.address( this, businessName ); },

            /**
            * HelpIntent - provides a help message if the user says "help"
            */
            HelpIntent () { address.help( this, businessName ); },
            /**
            * UnhandledIntent
            */
            Unhandled() {address.address(this,businessName)},
            /**
            * END - Triggered when a session ends abrupty or with AMAZON.StopIntent
            */
            END() { this.toStatelessIntent("StopIntent") }
        }

    },

    /**
     * PhoneState - state for phone number entry
    */
    'PhoneState' : {

        /**
         * PhoneNumberIntent - captures customer phone number
         *
         * @param phoneNumber - user entered phone number
         */
        PhoneNumberIntent() {
            let phoneNum = this.$inputs.phoneNumber.key;
            // use the twilio lookup API to verify the provided phone number is valid
            return client.lookups.phoneNumbers(phoneNum)
                .fetch({countryCode: 'US'})
                .then((phone_number) => {
                    phoneNum = phone_number.phoneNumber;
                    this.$user.$data.phone = phoneNum;
                    if(this.$session.$data.repeat === true) {
                        this.toStatelessIntent('PickupRequestIntent')
                    }else{
                        this.$speech.addText(this.t('special_note.ask.prompt'));
                        this.$reprompt.addText(this.t('special_note.ask.reprompt'));
                        display.displayAPL(this,businessName,this.$speech.toString());
                        this.followUpState('SpecialNoteState.AskState').ask(this.$speech, this.$reprompt)
                    }                    
                })
                .catch((error) => {
                    this.$speech.addText(that.t('unhandled.phone.invalid_number.prompt'));
                    this.$reprompt.addText(that.t('unhandled.phone.invalid_number.reprompt'));
                    display.displayAPL(this,businessName,this.$speech.toString());
                    this.followUpState('PhoneState').ask(this.$speech, this.$reprompt);
                });
        },

        /**
        * HelpIntent - provides a help message if the user says "help"
        */
        HelpIntent () {
            this.$speech.addText(this.t('utility.help_phone'));
            this.$reprompt.addText(this.t('utility.help_phone'));
            display.displayAPL(this,this.$speech.toString());
            this.ask( this.$speech, this.$reprompt );
        },
    },

    /**
     * SpecialNoteState - state for special note handling
     */
    'SpecialNoteState' : {

        /**
         * AskState - state to handle whether the user wants to leave a note or not
         */
        'AskState' : {
            /**
             * The user wants to leave a note
             */
            YesIntent () { specialNoteAsk.yes( this, businessName ); },

            /**
             * The user does not want to leave a note
             */
            NoIntent () { specialNoteAsk.no( this ); },

            /**
            * HelpIntent - provides a help message if the user says "help"
            */
            HelpIntent () { specialNoteAsk.help( this, businessName ); },

            /**
             * NotifyArrivalIntent - customer wants to inform dry cleaner that they are on their way
             */
            NotifyArrivalIntent() { notifyArrival.notifyArrival(this, businessName); }
        },

        /**
         * EntryState - State for entering the note
         */
        'EntryState' : {

            /**
            * Intent for note entry
            */
            CaptureIntent () { specialNoteEntry.entry( this, businessName ); },

            /**
            * HelpIntent - provides a help message if the user says "help"
            */
            HelpIntent () { specialNoteEntry.help( this, businessName ); },
            /**
            * Unhandled Intent 
            */
            Unhandled () { specialNoteEntry.unhandled(this,businessName)},
            /**
            * END - Triggered when a session ends abrupty or with AMAZON.StopIntent
            */
            END() { this.toStatelessIntent("StopIntent") },
        }
    },
    
    /**
     * PickupRequestIntent - final intent in the conversation flow, reads back all user input
     */
    PickupRequestIntent () { verify.verify(this, businessName); },

    /**
     * OrderConfirmationState - state for cofirmation of order entry
     */
    'OrderConfirmationState' : {

        /**
        * OrderConfirmationState:YesIntent - user confirms that order details are correct
        */
        YesIntent () { orderConfirmation.yes( this ); },

        /**
        * OrderConfirmationState:YesIntent - user confirms that order details are NOT correct
        */
        NoIntent() { orderConfirmation.no( this, businessName ); },

        /**
        * HelpIntent - provides a help message if the user says "help"
        */
        HelpIntent () { orderConfirmation.help( this, businessName ); }
    },

    /**
     * ReEntryState - state for re-entry of information
    */
    'ReEntryState' : {

        /**
         * NameIsWrong - The user has declared that their name has been heard wrong
         */
        NameIsWrong () { reEntry.name( this, businessName ); },

         /**
         * PhoneNumberIsWrong - The user has declared that their phone number has been heard wrong
         */
        PhoneNumberIsWrong () { reEntry.phone( this , businessName ); },

        /**
         * AddressIsWrong - The user has declared that their address has been heard wrong
         */
        AddressIsWrong () { reEntry.address( this, businessName ); },

        /**
         * NoteIsWrong - the user has declared that their special note has been heard wrong
         */
        NoteIsWrong () { reEntry.note( this, businessName ); }
    },

    async CanYouFindAStoreNearMeIntent() { await GeoSpatial.CanYouFindAStoreNearMeIntent(this) },
    async FindMyRealtimeLocationIntent() { await GeoSpatial.FindMyRealtimeLocationIntent(this) },
    /**
     * END - Triggered when a session ends abrupty or with AMAZON.StopIntent
     */
    END() { this.toIntent("EndConversation") },
    
    /**
     * EndConversation - Ending message from voicedrycleaner.com
     */
    async EndConversation () { endConversation.end( this ,db, businessName ); },

    /**
     * HelpIntent - provides a help message if the user says "help"
     */
    HelpIntent () {
  
        this.$speech.addText(this.t('utility.help_message.prompt',{businessName:businessName}));
        this.$reprompt.addText( this.t('utility.help_message.prompt',{businessName:businessName}));
        display.displayAPL(this,businessName,this.$speech.toString());
        this.ask( this.$speech , this.$reprompt );

    },

    /**
     * CancelIntent: Gracefully handles an abrubt end
     */
    CancelIntent () {
        
        this.$speech.addText(this.t('utility.cancel_message'));
        display.displayAPL( this ,businessName, this.$speech.toString() );
        this.tell( this.$speech );

    },

    /**
     * StopIntent - Gracefully handles an abrubt end
     */
    StopIntent () {
        
        this.$speech.addText(this.t('utility.cancel_message'));
        display.displayAPL( this ,businessName, this.$speech.toString() );
        this.tell( this.$speech );

    },"""%(sheetID,businessName)

fileWriter(filePath,write,header)
#for loop to iterate over list containing user defined intents
for x in l3 :
    intent = x
    prompt = x
    intent = intent.replace('prompt','')
    intent = intent.replace('.', ' ')
    intent = intent.title()
    intent = intent.replace(' ','') + 'Intent'
    #appIntent-string containing intents with variables filled in
    appIntent = """\n\t%s() {
    \t\tthis.$speech.addText(this.t('%s'))
    \t\tthis.$reprompt.addText(this.t('answer.reprompt')) 
    \t\tdisplay.displayAPL(this,businessName,this.$speech.toString());
    \t\tthis.ask(this.$speech,this.$reprompt)
    \t},"""%(intent,prompt)
    #append each intent to the app.js file
    fileWriter(filePath,appendPlus,appIntent)


#closing- ending portion of app.js file
closing = """
    /*
    * CaptureIntent - Any question not in database is added to google sheet
    */
    CaptureIntent() {
        let questionVal = this.$inputs.question ? this.$inputs.question.value: undefined;
        doc.useServiceAccountAuth(creds, function (err) {
            doc.addRow(4,{questions:questionVal},function(err) {
                if(err) {
                    console.log(err)
                }
            })
        })
        this.$speech.addText(this.$cms.t('unhandled.generic.prompt'))
        this.$reprompt.addText(this.$cms.t('unhandled.generic.reprompt'))
        display.displayAPL( this ,businessName, this.$speech.toString() );
        this.ask(this.$speech, this.$reprompt)
    },
    
    /**
     * Unhandled - reads the unhandled message for whatever state the user is in
     */
    Unhandled () { unhandle.unhandled( this,businessName ); },

    /**
     * DeleteUserIntent - Deletes User Attributes from database
     */
    DeleteUserIntent () { deleteUser.delete(this, businessName); },
});

// Example: Wrap Alexa Skill output in a Polly voice SSML tag
// before the response JSON is created in the platform.output middleware
app.hook('before.platform.output', (error, host, jovo) => {
    const pollyName = 'Amy';

    if (jovo.isAlexaSkill()) {
        if (jovo.$output.tell) {
            jovo.$output.tell.speech = `<voice name="${pollyName}">${jovo.$output.tell.speech}</voice>`;
        }

        if (jovo.$output.ask) {
            jovo.$output.ask.speech = `<voice name="${pollyName}">${jovo.$output.ask.speech}</voice>`;
            jovo.$output.ask.reprompt = `<voice name="${pollyName}">${jovo.$output.ask.reprompt}</voice>`;
        }
    }
});

module.exports.app = app;"""
fileWriter(filePath,appendPlus,closing)