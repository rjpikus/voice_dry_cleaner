var display = require('../displayAPL');
module.exports = {
    launch : function (that) {
        that.setSessionAttribute('platform', that.getType());
        that.setSessionAttribute('repeat', false);
        that.setSessionAttribute ('noNote', false);
        that.toIntent("WelcomeIntent");
    },
    alexa: function (that,businessName) {
        that.setSessionAttribute("NeedsWelcomed", false);
        that.$speech.addText(that.t('name.prompt',{businessName:businessName}));
        that.$reprompt.addText(that.t('name.reprompt'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.followUpState('FirstNameState').ask(that.$speech, that.$reprompt);
    },
    welcome: function (that,businessName) {
        if (that.$user.$data.name === undefined) { // New Customer
            that.$speech.addText(that.t('name.welcome.prompt',{businessName:businessName}));
            that.$reprompt.addText(that.t('name.welcome.reprompt'));
        } else { // Existing Customer
            that.$speech.addText(that.t('name.welcome.existing.prompt',{businessName:businessName}));
            that.$reprompt.addText(that.t('name.welcome.existing.reprompt'));
        }
        display.displayAPL(that,businessName,that.$speech.toString());
        that.ask(that.$speech, that.$reprompt);
    }
}

