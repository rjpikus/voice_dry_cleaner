const { STRINGS } = require('../strings.js');
var display = require('../displayAPL');
module.exports = {
    yes : function (that) {
        that.setSessionAttribute('orderComplete', true)
        that.toStatelessIntent('EndConversation') 
    },
    no : function (that,businessName) {
        that.$speech.addText(that.t('re_entry.prompt'));
        that.$reprompt.addText(that.t('re_entry.reprompt'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.followUpState('ReEntryState').ask(that.$speech, that.$reprompt);
    },
    help : function (that,businessName) {
        that.$speech.addText(that.t('utility.help_verify'));
        that.$reprompt.addText(that.t('utility.help_verify'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.followUpState('OrderConfirmationState').ask(that.$speech, that.$reprompt);
    }
}

