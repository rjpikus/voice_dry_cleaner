const { STRINGS } = require('../strings.js');
var display = require('../displayAPL');

module.exports = {
    entry : function (that, businessName) {
        if (!that.getInput('question').value) {
            that.$speech.addText(that.t('special_note.entry.prompt'));
            that.$reprompt.addText(that.t('special_note.entry.reprompt'));
            display.displayAPL(that,businessName,that.$speech.toString());
            that.followUpState('SpecialNoteState.EntryState').ask(that.$speech, that.$reprompt);
        } else {
            that.$user.$data.specialNote = that.getInput('question').value;
            that.toStatelessIntent('PickupRequestIntent');
        }
    },
    help : function (that, businessName) {
        that.$speech.addText(that.t('utility.help_special_note_entry'));
        that.$reprompt.addText(that.t('utility.help_special_note_entry'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.ask(that.$speech, that.$reprompt);
    },
    unhandled : function (that, businessName) {
        that.$speech.addText(that.t('unhandled.special_note.entry.prompt'))
        that.$reprompt.addText(that.t('unhandled.special_note.entry.reprompt'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.followUpState('SpecialNoteState.EntryState').ask(that.$speech, that.$reprompt);
    }
}