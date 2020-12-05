'use strict';

const {db} = require('../src/db');
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
//jest.setTimeout(500);


for (const p of [new Alexa(), new GoogleAssistant()]){
  const testSuite = p.makeTestSuite();

  describe (`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    const businessName = `voice dry cleaner dot com`;
    test (`should welcome the customer to My Drycleaner`, async () => {

      const conversation = testSuite.conversation(
                          {
                            locale: 'keys-only'
                          }
                          );

      const launchRequest = await testSuite.requestBuilder.launch();
      launchRequest.setNewSession(true);
      const responseToLaunchRequest = await conversation.send(launchRequest);
     // Speech Variables
     const actualSpeech = responseToLaunchRequest.getSpeech();
     const actualReprompt = responseToLaunchRequest.getReprompt();
     let expectedSpeech = 'name.welcome.prompt'
     let expectedReprompt = 'name.welcome.reprompt'

    
     //Results
     expect(actualReprompt.includes(expectedReprompt)).toBe(true);
     expect(actualSpeech.includes(expectedSpeech)).toBe(true);

     await conversation.clearDb();
    })
    test (`should welcome Existing customer to My Drycleaner`, async () => {

      const conversation = testSuite.conversation(
                                    {
                                      locale: 'keys-only'
                                    }
                                    );

      conversation.$user.$data.name = 'Pat';
      const launchRequest = await testSuite.requestBuilder.launch();
      launchRequest.setNewSession(true);

      const responseToLaunchRequest = await conversation.send(launchRequest);

      // Speech Variables
      const actualSpeech = responseToLaunchRequest.getSpeech();
      const actualReprompt = responseToLaunchRequest.getReprompt();
      let expectedSpeech = 'name.welcome.existing.prompt'
      let expectedReprompt = 'name.welcome.existing.reprompt'

  
      //Results
      expect(actualReprompt.includes(expectedReprompt)).toBe(true);
      expect(actualSpeech.includes(expectedSpeech)).toBe(true);

      await conversation.clearDb();
    })
  })
}

