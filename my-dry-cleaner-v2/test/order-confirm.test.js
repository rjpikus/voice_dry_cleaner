'use strict';

const {App, Util} = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
//jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant]) {
  const testSuite = p.makeTestSuite();
  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {

    test(`should ask for what data is wrong if order details are not confirmed`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});

      const orderConfirmationRequest = await testSuite.requestBuilder.intent('NoIntent')
      orderConfirmationRequest.setState('OrderConfirmationState');

      const responseToOrderConfirmationRequest = await conversation.send(orderConfirmationRequest);

      expect(responseToOrderConfirmationRequest.getSpeech()).toMatch('re_entry.prompt')
      expect(responseToOrderConfirmationRequest.getReprompt()).toMatch('re_entry.reprompt')
    
      await conversation.clearDb();
    })

    test(`should repeat order confirmation message`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});

      const unhandledOrderConfirmationRequest = await testSuite.requestBuilder.intent('Unhandled')
      unhandledOrderConfirmationRequest.setState('OrderConfirmationState')

      const responseToUnhandledOrderConfirmationRequest = await conversation.send(unhandledOrderConfirmationRequest);

      expect(responseToUnhandledOrderConfirmationRequest.getSpeech()).toMatch('unhandled.order_confirmation.prompt')
      expect(responseToUnhandledOrderConfirmationRequest.getReprompt()).toMatch('unhandled.order_confirmation.reprompt')
      
      await conversation.clearDb();
    })
  })
}
