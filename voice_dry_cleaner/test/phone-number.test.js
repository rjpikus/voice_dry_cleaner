'use strict';

const {App, Util} = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
//jest.setTimeout(500);

for (const p of[new Alexa(), new GoogleAssistant()]){
  const testSuite = p.makeTestSuite();
  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    const name = "Patrick";
    const number = "ten";
    const address = "Wallaby Way";
    const city = "Sydney";
    const phone = "+15138505895";

    test(`should ask customer if they would like to leave a special note`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});
      conversation.$user.$data.name = name
      conversation.$user.$data.houseNumer = number
      conversation.$user.$data.address = address
      conversation.$user.$data.city = city
      conversation.$user.$data.phone = phone

      // CODE UNDER TEST
      const phoneIntentRequest = await testSuite.requestBuilder.intent('PhoneNumberIntent',{phoneNumber:phone})
      phoneIntentRequest.setSessionAttributes({
        'repeat':false
      })
      phoneIntentRequest.setState('PhoneState')

      const responseToPhoneIntentRequest = await conversation.send(phoneIntentRequest)

      expect(responseToPhoneIntentRequest.getSpeech()).toMatch('special_note.ask.prompt')
      expect(responseToPhoneIntentRequest.getReprompt()).toMatch('special_note.ask.reprompt')

      await conversation.clearDb();
    })

    test(`should ask customer if they want to leave a special note`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});

      const firstNameRequest = await testSuite.requestBuilder.intent('FirstNameIntent', {name:name});
      firstNameRequest.setState('FirstNameState');

      const responseToFirstNameRequest = await conversation.send(firstNameRequest);

      expect(responseToFirstNameRequest.getSpeech()).toMatch('address.entry.prompt')
      expect(responseToFirstNameRequest.getReprompt()).toMatch('address.entry.reprompt')

      const addressEntryRequest = await testSuite.requestBuilder.intent('AddressEntryIntent', {number:number,addressLine: address, city:city})
      addressEntryRequest.setState('AddressState.EntryState')

      const responseToAddressEntryRequest = await conversation.send(addressEntryRequest)

      expect(responseToAddressEntryRequest.getSpeech()).toMatch('phone.prompt')
      expect(responseToAddressEntryRequest.getReprompt()).toMatch('phone.reprompt')


      // CODE UNDER TEST
      const phoneIntentRequest = await testSuite.requestBuilder.intent('PhoneNumberIntent',{phoneNumber:phone})
      const responseToPhoneIntentRequest = await conversation.send(phoneIntentRequest)
            
      expect(responseToPhoneIntentRequest.getSpeech()).toMatch('special_note.ask.prompt')
      expect(responseToPhoneIntentRequest.getReprompt()).toMatch('special_note.ask.reprompt')

      await conversation.clearDb();
    })

    test (`should ask customer for their phone number again`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});

      const firstNameRequest = await testSuite.requestBuilder.intent('FirstNameIntent', {name:name});
      firstNameRequest.setState('FirstNameState');

      const responseToFirstNameRequest = await conversation.send(firstNameRequest);

      expect(responseToFirstNameRequest.getSpeech()).toMatch('address.entry.prompt')
      expect(responseToFirstNameRequest.getReprompt()).toMatch('address.entry.reprompt')

      const addressEntryRequest = await testSuite.requestBuilder.intent('AddressEntryIntent', {number:number,addressLine: address, city:city})
      addressEntryRequest.setState('AddressState.EntryState')

      const responseToAddressEntryRequest = await conversation.send(addressEntryRequest)

      expect(responseToAddressEntryRequest.getSpeech()).toMatch('phone.prompt')
      expect(responseToAddressEntryRequest.getReprompt()).toMatch('phone.reprompt')


      // CODE UNDER TEST
      const unhandledPhoneIntentRequest = await testSuite.requestBuilder.intent('FirstNameIntent')
      unhandledPhoneIntentRequest.setState('PhoneState')
      
      const responseToUnhandledPhoneIntentRequest = await conversation.send(unhandledPhoneIntentRequest)      
      
      expect(responseToUnhandledPhoneIntentRequest.getSpeech()).toMatch('unhandled.phone.invalid_speech.prompt')
      expect(responseToUnhandledPhoneIntentRequest.getReprompt()).toMatch('unhandled.phone.invalid_speech.reprompt')

      await conversation.clearDb();
    })

    test(`should ask customer if they would like to leave a special note`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});
      let name = 'Harrison';

      const firstNameRequest = await testSuite.requestBuilder.intent('FirstNameIntent', {name:name});
      firstNameRequest.setState('FirstNameState');

      const responseToFirstNameRequest = await conversation.send(firstNameRequest);

      expect(responseToFirstNameRequest.getSpeech()).toMatch('address.entry.prompt')
      expect(responseToFirstNameRequest.getReprompt()).toMatch('address.entry.reprompt')

      const addressEntryRequest = await testSuite.requestBuilder.intent('AddressEntryIntent', {number:number,addressLine: address, city:city})
      addressEntryRequest.setState('AddressState.EntryState')

      const responseToAddressEntryRequest = await conversation.send(addressEntryRequest)

      expect(responseToAddressEntryRequest.getSpeech()).toMatch('phone.prompt')
      expect(responseToAddressEntryRequest.getReprompt()).toMatch('phone.reprompt')


      const phoneIntentRequest = await testSuite.requestBuilder.intent('PhoneNumberIntent',{phoneNumber:phone})
      //REQUEST OBJECT -> USE OBJECT SETTERS
      //Set Locale of entire converation
      phoneIntentRequest.setUserId('jovo-debugger-user');
      phoneIntentRequest.setSessionAttributes({
        'repeat':false
      })
      phoneIntentRequest.setState('PhoneState')
      //MOCK DATA FOR NOW INSTEAD OF USER DATA
      //CONVERSATION.$user.$data.city -> future feature

      //CMS 
      // check KEY instead of value from DB
        let formattedPhone = "";
        for (let i=0;i<phone.length;i++){
            formattedPhone += phone.charAt(i);
            if (i === 2 || i === 5){
                formattedPhone += ". ";
            }else{
                formattedPhone += " ";
            }
          }
      const responseToPhoneIntentRequest = await conversation.send(phoneIntentRequest)
      expect(responseToPhoneIntentRequest.getSpeech()).toMatch('special_note.ask.prompt')
      expect(responseToPhoneIntentRequest.getReprompt()).toMatch('special_note.ask.reprompt')

      await conversation.clearDb();
    })
  })
}
