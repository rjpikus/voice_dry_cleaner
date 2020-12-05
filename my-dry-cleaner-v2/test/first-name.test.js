'use strict';

const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
//jest.setTimeout(500);

for (const p of[new Alexa(), new GoogleAssistant()]) {
  const testSuite = p.makeTestSuite();

  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    const name = 'Patrick';
    const businessName = 'voice dry cleaner dot com';
    
    test('should ask the customer for address', async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});

      const firstNameRequest = await testSuite.requestBuilder.intent('FirstNameIntent', {name});
      firstNameRequest.setState('FirstNameState');

      const responseToFirstNameRequest = await conversation.send(firstNameRequest);


      expect(responseToFirstNameRequest.getSpeech()).toMatch('address.entry.prompt')
      expect(responseToFirstNameRequest.getReprompt()).toMatch('address.entry.reprompt')
  
      await conversation.clearDb();
    })

    test (`should ask the customer to try again (unhandled)`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});

      const unhandledFirstNameRequest = await testSuite.requestBuilder.intent('UNHANDLED')
      unhandledFirstNameRequest.setState('FirstNameState');

      const responseToUnhandledFirstNameRequest = await conversation.send(unhandledFirstNameRequest);      
      
      expect(responseToUnhandledFirstNameRequest.getSpeech()).toMatch('unhandled.name.prompt')
      expect(responseToUnhandledFirstNameRequest.getReprompt()).toMatch('unhandled.name.reprompt')
      
      await conversation.clearDb();
    })
  })

  describe(`PLATFORM: ${p.constructor.name} CONVERSATIONS`, () => {
    const name = 'Patrick';
    const businessName = 'voice dry cleaner dot com'
    
    test (`should ask the customer to try again (unhandled) then provide an accurate first name`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});

      const unhandledFirstNameRequest = await testSuite.requestBuilder.intent('UNHANDLED')
      unhandledFirstNameRequest.setState('FirstNameState');

      const responseToUnhandledFirstNameRequest = await conversation.send(unhandledFirstNameRequest);

      expect(responseToUnhandledFirstNameRequest.getSpeech()).toMatch('unhandled.name.prompt')
      expect(responseToUnhandledFirstNameRequest.getReprompt()).toMatch('unhandled.name.reprompt')

      const intentRequest = await testSuite.requestBuilder.intent('FirstNameIntent',{name});
      intentRequest.setState('FirstNameState');
      const responseIntentRequest = await conversation.send(intentRequest);


      expect(responseIntentRequest.getSpeech()).toMatch('address.entry.prompt')
      expect(responseIntentRequest.getReprompt()).toMatch('address.entry.reprompt')
      
      await conversation.clearDb();
    })
  })
}
