'use strict';

const {App, Util} = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
//jest.setTimeout(500);

for (const p of[new Alexa(), new GoogleAssistant()]) {
  const testSuite = p.makeTestSuite();
  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    const name = "Patrick";
    const address = "42 Wallaby Way";
    const city = "Sydney";
    const phone = "5138505895";
    const specialNote = "No Extra Notes";
    let sessionAttributes = {
      'NeedsWelcomed': true,
      'extraNote': true
    }
    test (`it should ask user to leave a special note`, async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});

      const specialNoteRequest = await testSuite.requestBuilder.intent('YesIntent')
      specialNoteRequest.setState('SpecialNoteState.AskState');

      const responseToSpecialNoteRequest = await conversation.send(specialNoteRequest);

      expect(responseToSpecialNoteRequest.getSpeech()).toMatch('special_note.entry.prompt')
      expect(responseToSpecialNoteRequest.getReprompt()).toMatch('special_note.entry.reprompt')

      await conversation.clearDb();
    }),
    test(`should send customer to verify information if they say no to special note`,async () => {
      const conversation = testSuite.conversation({locale: 'keys-only'});
      conversation.$user.$data.name = name;
      conversation.$user.$data.city = city;
      conversation.$user.$data.address = address;
      conversation.$user.$data.phone = "+1" + phone;
      conversation.$user.$data.businessName = 'voice dry cleaner dot com';
      conversation.$user.$data.specialNote = specialNote
      sessionAttributes = {
        'NeedsWelcomed': false,
        'noNote': true,
        'extraNote':false
      }

      // CODE UNDER TEST
      const noSpecialNoteRequest = await testSuite.requestBuilder.intent('NoIntent');
      noSpecialNoteRequest.setSessionAttributes(sessionAttributes)
      noSpecialNoteRequest.setState('SpecialNoteState.AskState');
      const responseToNoSpecialNoteRequest = await conversation.send(noSpecialNoteRequest);

      // VERIFY RESPONSE
      expect(responseToNoSpecialNoteRequest.getSpeech()).toMatch('order_confirmation.prompt_no_note')
      expect(responseToNoSpecialNoteRequest.getReprompt()).toMatch('order_confirmation.reprompt')

      await conversation.clearDb();
    })
  })
}
