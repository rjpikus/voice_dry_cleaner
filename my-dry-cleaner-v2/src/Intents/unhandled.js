const { STRINGS } = require('../strings.js');
var display = require('../displayAPL');

module.exports = {
    unhandled : function (that, businessName) {
        let state = that.getSessionAttribute("_JOVO_STATE_");
        let prompt = that.speechBuilder();
        let reprompt = that.speechBuilder();
        switch (state){
            case 'FirstNameState':
                prompt.addText(that.t('unhandled.name.prompt'));
                reprompt.addText(that.t('unhandled.name.reprompt'));
                break;
            case 'PhoneState':
                prompt.addText(that.t('unhandled.phone.invalid_speech.prompt',{businessName:businessName}));
                reprompt.addText(that.t('unhandled.phone.invalid_speech.reprompt'));
                break;
            case 'OrderConfirmationState':
                prompt.addText(that.t('unhandled.order_confirmation.prompt'));
                reprompt.addText(that.t('unhandled.order_confirmation.reprompt'));
                break;
            case 'SpecialNoteState.AskState':
                prompt.addText(that.t('unhandled.special_note.ask.prompt'));
                reprompt.addText(that.t('unhandled.special_note.ask.reprompt'));
                break;
            case 'ReEntryState':
                prompt.addText(that.t('unhandled.reentry.prompt'));
                reprompt.addText(that.t('unhandled.reentry.reprompt'));
                break;
            case 'NotifyArrivalState':
                return that.toStateIntent("NotifyArrivalState", "NotifyArrivalIntent")
            default:
                prompt.addText(that.t('unhandled.generic.prompt'));
                reprompt.addText(that.t('unhandled.generic.reprompt'));
                return that.toStatelessIntent('CaptureIntent')
        }
        display.displayAPL(that,businessName,prompt.toString());
        that.followUpState(state).ask(prompt, reprompt);
    }
}