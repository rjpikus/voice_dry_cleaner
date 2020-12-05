'use strict';

const {App, Util} = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
//jest.setTimeout(500);


for (const p of [new Alexa(), new GoogleAssistant()]) {
  const testSuite = p.makeTestSuite();
  describe(`PLATFORM: ${p.constructor.name} CONVERSATIONS`, () => {
    let name = 'Harrison';     
    test(`should get manual entry address`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});
      conversation.$user.$data.name = name

      const addressEntryRequest = await testSuite.requestBuilder.intent('AddressEntryIntent', {number: 'ten',addressLine: 'east Maynard ave', city:'columbus'})
      addressEntryRequest.setState('AddressState.EntryState')

      const responseToAddressEntryRequest = await conversation.send(addressEntryRequest)

      expect(responseToAddressEntryRequest.getSpeech()).toMatch('phone.prompt')

      await conversation.clearDb();
    })

    test(`Should get manual entry address full conversation`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});
      const firstNameRequest = await testSuite.requestBuilder.intent('FirstNameIntent', {name:name})
   
      firstNameRequest.setState('FirstNameState');

      const responseToFirstNameRequest = await conversation.send(firstNameRequest);

      expect(responseToFirstNameRequest.getSpeech()).toMatch('address.entry.prompt')
      expect(responseToFirstNameRequest.getReprompt()).toMatch('address.entry.reprompt')

      const addressEntryRequest = await testSuite.requestBuilder.intent('AddressEntryIntent', {number: 'ten',addressLine: '30 east Maynard ave', city:'columbus'})
      addressEntryRequest.setState('AddressState.EntryState')

      const responseToAddressEntryRequest = await conversation.send(addressEntryRequest)

      expect(responseToAddressEntryRequest.getSpeech()).toMatch('phone.prompt')
      expect(responseToAddressEntryRequest.getReprompt()).toMatch('phone.reprompt')

      await conversation.clearDb();
    })

    test(`should reply unhandled address response`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});
      let name = 'Harrison';

      const firstNameRequest = await testSuite.requestBuilder.intent('FirstNameIntent', {name:name});
      firstNameRequest.setState('FirstNameState');

      const responseToFirstNameRequest = await conversation.send(firstNameRequest);

      expect(responseToFirstNameRequest.getSpeech()).toMatch('address.entry.prompt')
      expect(responseToFirstNameRequest.getReprompt()).toMatch('address.entry.reprompt')

      const addressEntryRequest = await testSuite.requestBuilder.intent('FirstNameIntent')
      addressEntryRequest.setState('AddressState.EntryState')

      const responseToAddressEntryRequest = await conversation.send(addressEntryRequest)

      console.log(responseToAddressEntryRequest.getSpeech())
      expect(responseToAddressEntryRequest.getSpeech()).toMatch('unhandled.address.entry.prompt')
      expect(responseToAddressEntryRequest.getReprompt()).toMatch('unhandled.address.entry.reprompt')

      await conversation.clearDb();
    })
  })
}
