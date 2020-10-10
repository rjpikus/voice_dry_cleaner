'use strict';

const {db} = require('../src/db');
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');

for (const p of [new Alexa(), new GoogleAssistant()]){
  const testSuite = p.makeTestSuite();
  describe (`PLATFORM: ${p.constructor.name} NEW SESSION INTENTS`, () => {
    test (`should have orderComplete session attribute in NEW_SESSION`, async () => {
      const conversation = testSuite.conversation();
      const launchRequest = await testSuite.requestBuilder.launch();
      launchRequest.setNewSession(true);
      const responseToLaunchRequest = await conversation.send(launchRequest);
      //Results
      expect(responseToLaunchRequest.getSessionData().orderComplete).toBe(false);
      await conversation.clearDb();
    })
  })
}
