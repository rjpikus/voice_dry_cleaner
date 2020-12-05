const {STRINGS} = require('../src/strings');
const {App, Util} = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(5000);

for (const p of[ new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();
  
    describe(`PLATFORM: ${p.constructor.name} NOTIFY ARRIVAL INTENTS`, () => {
      const name = 'Patrick';
      const phone = '+15138505895';
      const businessName = 'voice dry cleaner dot com';
      const fullName = "Barack Obama";

      test('should ask the customer for name is it is missing in NOTIFYARRIVALINTENT', async () => {
        const conversation = testSuite.conversation({locale:'keys-only'});
        // SEND REQUEST
        const notifyArrivalRequest = await testSuite.requestBuilder.intent('NotifyArrivalIntent');
        const responseToNotifyArrivalRequest = await conversation.send(notifyArrivalRequest);
  
        // VERIFY RESULTS
        expect(responseToNotifyArrivalRequest.getSpeech()).toMatch('notify.arrival.no_name.prompt')
        expect(responseToNotifyArrivalRequest.getReprompt()).toMatch('notify.arrival.no_name.reprompt')

        // CLEAR DB
        await conversation.clearDb();
      })

      test('should ask the customer for phone is it is missing in NOTIFYARRIVALINTENT', async () => {
        const conversation = testSuite.conversation({locale:'keys-only'});
        
        // SEND REQUEST
        const notifyArrivalRequest = await testSuite.requestBuilder.intent('NotifyArrivalIntent', {name: name});
        const responseToNotifyArrivalRequest = await conversation.send(notifyArrivalRequest);
        
        // VERIFY RESULTS
        expect(responseToNotifyArrivalRequest.getSpeech()).toMatch('notify.arrival.no_phone.prompt')
        expect(responseToNotifyArrivalRequest.getReprompt()).toMatch('notify.arrival.no_phone.reprompt')

        // CLEAR DB
        await conversation.clearDb();
      })

      test('Can UNHANDLED send to NOTIFYARRIVALINTENT', async () => {
        const conversation = testSuite.conversation({locale:'keys-only'});
        conversation.$user.$data.name = name;
        
        // SEND REQUEST
        const unhandledRequest = await testSuite.requestBuilder.intent('Unhandled');
        unhandledRequest.setState("NotifyArrivalState")
        const responseToUnhandledRequest = await conversation.send(unhandledRequest);
        
        // VERIFY RESULTS
        expect(responseToUnhandledRequest.getSpeech()).toMatch('notify.arrival.no_phone.prompt')
        expect(responseToUnhandledRequest.getReprompt()).toMatch('notify.arrival.no_phone.reprompt')
        // CLEAR DB
        await conversation.clearDb();
      })
  
    })
  }
