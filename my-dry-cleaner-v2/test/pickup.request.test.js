'use strict';

const {db} = require('../src/db');
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
//jest.setTimeout(500);

const name = "Gerald";
const address = "42 Wallaby Way";
const city = "Sydney";
const phone = "5138505895";
const specialNote = "No Extra Notes";

for (const p of [new Alexa(), new GoogleAssistant()]){
  const testSuite = p.makeTestSuite();

  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    
    test('LAUNCH should welcome EXISTING customer who needs to provide name.', async () => {
      let sessionAttributes = {
        'NeedsWelcomed': true
      }

      const conversation = testSuite.conversation({locale: 'keys-only'});

      const pickupRequest = await testSuite.requestBuilder.intent('PickupRequestIntent');
      pickupRequest.setSessionAttributes(sessionAttributes);
      pickupRequest.setNewSession(true)

      const responseToPickupRequest = await conversation.send(pickupRequest)

      // Speech Variables
      expect(responseToPickupRequest.getSpeech()).toMatch('name.prompt')
      expect(responseToPickupRequest.getReprompt()).toMatch('name.reprompt')
      
      await conversation.clearDb();
    })

    test('PickupRequestIntent should confirm customer order if customer doesnt want to leave a special note.', async () => {
      let sessionAttributes = {
        'NeedsWelcomed': false,
        'noNote': true
            }
      const conversation = testSuite.conversation({locale: 'keys-only'});
      conversation.$user.$data.name = name
      conversation.$user.$data.address = address
      conversation.$user.$data.city = city
      conversation.$user.$data.phone = phone
      conversation.$user.$data.specialNote = specialNote;
    
      //   CODE UNDER TEST
      const pickupRequest = await testSuite.requestBuilder.intent('PickupRequestIntent');
      pickupRequest.setSessionAttributes(sessionAttributes)
      pickupRequest.setNewSession(true)

      const responseToPickupRequest = await conversation.send(pickupRequest)
      
      expect(responseToPickupRequest.getSpeech()).toMatch('order_confirmation.prompt_no_note')
      expect(responseToPickupRequest.getReprompt()).toMatch('order_confirmation.reprompt')


      await conversation.clearDb();
    })

    test('END should not send order confirmation at PickupRequestIntent.', async () => {
      let sessionAttributes = {
        'NeedsWelcomed': false,
        'noNote': true
            }
      const conversation = testSuite.conversation({locale: 'keys-only'});
      conversation.$user.$data.name = name
      conversation.$user.$data.address = address
      conversation.$user.$data.city = city
      conversation.$user.$data.phone = phone
      conversation.$user.$data.specialNote = specialNote;
    
      //   CODE UNDER TEST
      const pickupRequest = await testSuite.requestBuilder.intent('PickupRequestIntent');
      pickupRequest.setSessionAttributes(sessionAttributes)
      pickupRequest.setNewSession(true)

      const responseToPickupRequest = await conversation.send(pickupRequest)
      
      expect(responseToPickupRequest.getSpeech()).toMatch('order_confirmation.prompt_no_note')
      expect(responseToPickupRequest.getReprompt()).toMatch('order_confirmation.reprompt')


      await conversation.clearDb();
    })
  })
}
