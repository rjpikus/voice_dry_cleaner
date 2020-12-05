var display = require('../displayAPL');

module.exports = {

    name : function (that, businessName) {
        that.setSessionAttribute('repeat', true);
        that.$speech.addText(that.t('re_entry.name.prompt'));
        that.$reprompt.addText(that.t('re_entry.name.reprompt'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.followUpState('FirstNameState').ask(that.$speech, that.$reprompt);
    },

    phone : function (that,businessName) {
        that.setSessionAttribute('repeat', true);
        let NeedsWelcomed = that.getSessionAttribute('NeedsWelcomed')
        let prompt = that.speechBuilder()
        let reprompt = that.speechBuilder()
        if (NeedsWelcomed === true) {
          prompt.addText(that.t('re_entry.pre_welcome',{businessName:businessName}))
          that.setSessionAttribute('NeedsWelcomed', false)
        }
        prompt.addText(that.t('re_entry.phone.prompt'));
        reprompt.addText(that.t('re_entry.phone.reprompt'));
        display.displayAPL(that,businessName,prompt.toString());
        that.followUpState('PhoneState').ask(prompt, reprompt);
    },

    address : function (that,businessName) {
        that.setSessionAttribute('repeat', true);
        let prompt = that.speechBuilder()
            .addText(that.t('re_entry.address.prompt',{name:that.$user.$data.name}));
        let reprompt = that.speechBuilder()
            .addText(that.t('re_entry.address.reprompt'));
        display.displayAPL(that,businessName,prompt.toString());
        that.followUpState('AddressState.EntryState').ask(prompt, reprompt);
    },
    note : function (that,businessName) {
        that.setSessionAttribute('repeat', true);
        that.$speech.addText(that.t('re_entry.note.prompt'));
        that.$reprompt.addText(that.t('re_entry.note.reprompt'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.followUpState('SpecialNoteState.EntryState').ask(that.$speech, that.$reprompt)
    }
}