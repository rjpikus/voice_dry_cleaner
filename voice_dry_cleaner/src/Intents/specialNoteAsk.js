const { STRINGS } = require('../strings.js');
var display = require('../displayAPL');

module.exports = {
    yes : function (that,businessName) {
        that.$speech.addText(that.t('special_note.entry.prompt'));
        that.$reprompt.addText(that.t('special_note.entry.reprompt'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.followUpState('SpecialNoteState.EntryState').ask(that.$speech, that.$reprompt);
    },

    no : function (that) {
        that.$user.$data.specialNote = "No Extra Notes"
        that.setSessionAttribute('noNote',true)
        that.toStatelessIntent('PickupRequestIntent');
    },

    help : function (that, businessName) {
        that.$speech.addText(that.t('utility.help_special_note_boolean'));
        that.$reprompt.addText(that.t('utility.help_special_note_boolean'));
        display.displayAPL(that,businessName,that.$speech.toString());;
        that.ask(that.$speech, that.$reprompt);
    }

}