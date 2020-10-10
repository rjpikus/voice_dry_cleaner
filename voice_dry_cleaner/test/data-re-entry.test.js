const {STRINGS} = require('../src/strings');
const {App, Util} = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
//jest.setTimeout(500);

for (const p of[new Alexa(), new GoogleAssistant()]) {
  const testSuite = p.makeTestSuite();

  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    let name = "Gerald";
    let number = "ten";
    let address = "Wallaby Way";
    const city = "Sydney";
    const phone = "+15138505895";
    let specialNote = "I have a stain";
    let sessionAttributes = {
        'NeedsWelcomed': false,
        'repeat': true
    };
    let formattedPhone = "";
    for (let i=2;i<phone.length;i++){
        formattedPhone += phone.charAt(i);
        if (i === 4 || i === 7){
            formattedPhone += ". ";
        }else{
            formattedPhone += " ";
        }
    }
   
    test(`should update phone number and repeat order summary`, async() => {
        const conversation = testSuite.conversation({locale:'keys-only'});
        conversation.$user.$data.name = name;
        conversation.$user.$data.city = city;
        conversation.$user.$data.houseNumber = number;
        conversation.$user.$data.address = address;
        conversation.$user.$data.phone = phone;
        conversation.$user.$data.specialNote = specialNote;
        conversation.$user.$data.businessName = 'voice dry cleaner dot com';

        const phoneReEntryRequest = await testSuite.requestBuilder.intent('PhoneNumberIsWrong')
        phoneReEntryRequest.setSessionData(sessionAttributes)
        phoneReEntryRequest.setState('ReEntryState');
        // CODE UNDER TEST
        const phoneRequest = await testSuite.requestBuilder.intent('PhoneNumberIntent', {phoneNumber: phone})
        phoneRequest.setSessionData(sessionAttributes)
        phoneRequest.setState('PhoneState')

        const responseToPhoneRequest = await conversation.send(phoneRequest)
        expect(responseToPhoneRequest.getSpeech()).toMatch('order_confirmation.prompt')
        expect(responseToPhoneRequest.getReprompt()).toMatch('order_confirmation.reprompt')

        await conversation.clearDb();
    })

    test (`should update address and repeat order summary`, async () => {  
        const conversation = testSuite.conversation({locale: 'keys-only'});
        conversation.$user.$data.name = name;
        conversation.$user.$data.city = city;
        conversation.$user.$data.address = address;
        conversation.$user.$data.phone = phone;
        conversation.$user.$data.specialNote = specialNote;
        conversation.$user.$data.businessName = 'voice dry cleaner dot com';
  
        //CODE TO TEST  
        const addressReEntryRequest = await testSuite.requestBuilder.intent('AddressIsWrong')
        addressReEntryRequest.setSessionData(sessionAttributes)
        addressReEntryRequest.setState('ReEntryState');
        const responseToAddressReEntryRequest= await conversation.send(addressReEntryRequest)

        expect(responseToAddressReEntryRequest.getSpeech()).toMatch('re_entry.address.prompt')
        expect(responseToAddressReEntryRequest.getReprompt()).toMatch('re_entry.address.reprompt')
        
        const addressConfirmRequest = await testSuite.requestBuilder.intent('AddressEntryIntent',{number:number,addressLine: "10 Lane Ave", city: city})
        addressConfirmRequest.setSessionAttributes(sessionAttributes)
        addressConfirmRequest.setState("AddressState.EntryState")
        const responseToAddressConfirmRequest = await conversation.send(addressConfirmRequest)

        // VERIFY RESPONSE
        expect(responseToAddressConfirmRequest.getSpeech()).toMatch('order_confirmation.prompt')
        expect(responseToAddressConfirmRequest.getReprompt()).toMatch('order_confirmation.reprompt')

        await conversation.clearDb();
    })
    
    test (`should update name and repeat order summary`, async () => {
        const conversation = testSuite.conversation({locale: 'keys-only'});
        conversation.$user.$data.name = name;
        conversation.$user.$data.address = address;
        conversation.$user.$data.city = city;
        conversation.$user.$data.phone = phone;
        conversation.$user.$data.specialNote = specialNote;
        conversation.$user.$data.businessName = 'voice dry cleaner dot com';        

        //CODE TO TEST
        const nameReEntryRequest = await testSuite.requestBuilder.intent('NameIsWrong')
        nameReEntryRequest.setSessionData(sessionAttributes)
        nameReEntryRequest.setState("ReEntryState")
        
        const responseToNameReEntryRequest = await conversation.send(nameReEntryRequest)

        expect(responseToNameReEntryRequest.getSpeech()).toMatch('re_entry.name.prompt')
        expect(responseToNameReEntryRequest.getReprompt()).toMatch('re_entry.name.reprompt')

        const nameRequest = await testSuite.requestBuilder.intent('FirstNameIntent',{name: "Zach"})
        nameRequest.setSessionAttributes(sessionAttributes)
        nameRequest.setState("FirstNameState")
        const responseToNameEntryRequest = await conversation.send(nameRequest)

        expect(responseToNameEntryRequest.getSpeech()).toMatch('order_confirmation.prompt')
        expect(responseToNameEntryRequest.getReprompt()).toMatch('order_confirmation.reprompt')
    
        await conversation.clearDb();
    })
    test (`should update note and repeat order summary`, async () => {
        const conversation = testSuite.conversation({locale: 'keys-only'});
        conversation.$user.$data.name = name;
        conversation.$user.$data.city = city;
        conversation.$user.$data.address = address;
        conversation.$user.$data.phone = phone;
        conversation.$user.$data.specialNote = specialNote;
        conversation.$user.$data.businessName = 'voice dry cleaner dot com';

        // CODE UNDER TEST      
        const orderConfirmRequest = await testSuite.requestBuilder.intent('NoIntent');
        orderConfirmRequest.setState('OrderConfirmationState');
        await conversation.send(orderConfirmRequest);
        

        //CODE TO TEST
        const noteReEntryRequest = await testSuite.requestBuilder.intent('NoteIsWrong')
        noteReEntryRequest.setSessionData(sessionAttributes);
        noteReEntryRequest.setState("ReEntryState")
        
        const responseToNoteReEntryRequest = await conversation.send(noteReEntryRequest)
        
        expect(responseToNoteReEntryRequest.getSpeech()).toMatch('re_entry.note.prompt')
        expect(responseToNoteReEntryRequest.getReprompt()).toMatch('re_entry.note.reprompt')
        
        specialNote = "Please don't wash socks";
        const noteRequest = await testSuite.requestBuilder.intent('CaptureIntent',{question: specialNote})
        noteRequest.setSessionData(sessionAttributes)
        noteRequest.setState("SpecialNoteState.EntryState")
        const responseToNoteEntryRequest = await conversation.send(noteRequest)
        
        expect(responseToNoteEntryRequest.getSpeech()).toMatch('order_confirmation.prompt')
        expect(responseToNoteEntryRequest.getReprompt()).toMatch('order_confirmation.reprompt')
      
        await conversation.clearDb();
  })

    test('if phone number is missing from records, should welcome the user and then ask for phone number', async () => {
        const conversation = testSuite.conversation({locale: 'keys-only'});
        
        conversation.$user.$data.name = 'Pat';
        conversation.$user.$data.address = "10 lane avenue";
        conversation.$user.$data.city = "columbus";
        conversation.$user.$data.phone = " missing from our records ";
        conversation.$user.$data.specialNote = "this is a test";
        conversation.$user.$data.businessName = 'voice dry cleaner dot com';
        let sessionAttributes = {
            'NeedsWelcomed': true,
            'repeat': true
        };

        const welcomePhoneRequest = await testSuite.requestBuilder.intent('PickupRequestIntent');
        welcomePhoneRequest.setSessionAttributes(sessionAttributes)
        const responseToWelcomePhoneRequest = await conversation.send(welcomePhoneRequest);
        let businessName = "voice dry cleaner dot com";
        
        expect(responseToWelcomePhoneRequest.getSpeech()).toMatch('re_entry.pre_welcome'+ " " +'re_entry.phone.prompt')
        expect(responseToWelcomePhoneRequest.getReprompt()).toMatch('re_entry.phone.reprompt')

        await conversation.clearDb();
    })

    test('should ask the customer to state their phone number if it is wrong', async () => {
        const conversation = testSuite.conversation({locale: 'keys-only'});
        conversation.$user.$data.name = 'Pat';
        conversation.$user.$data.address = "10 lane avenue";
        conversation.$user.$data.city = "columbus";
        conversation.$user.$data.phone = "7187612675";
        conversation.$user.$data.specialNote = "this is a test";
        conversation.$user.$data.businessName = 'voice dry cleaner dot com';
        conversation.$user.$data.NeedsWelcomed = false;
        conversation.$user.$data.repeat = true;

        const phoneRequest = await testSuite.requestBuilder.intent('PhoneNumberIsWrong');
        phoneRequest.setState('ReEntryState');
        const responseToPhoneRequest = await conversation.send(phoneRequest);
        
        expect(responseToPhoneRequest.getSpeech()).toMatch('re_entry.phone.prompt')
        expect(responseToPhoneRequest.getReprompt()).toMatch('re_entry.phone.reprompt')

        await conversation.clearDb();
    })

})
}

