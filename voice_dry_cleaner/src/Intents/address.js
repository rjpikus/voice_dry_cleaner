const { STRINGS } = require('../strings.js');
var display = require('../displayAPL');

module.exports = {
    address : function (that, businessName) {
        let addressVal = that.$inputs.addressLine ? that.$inputs.addressLine.value : undefined;
        let captureAddress = that.$inputs.question ? that.$inputs.question.value : undefined;
        if (!addressVal && captureAddress) { 
            addressVal = captureAddress
        }
        if (!addressVal) {
            that.$speech.addText(that.t('unhandled.address.entry.prompt'))
            that.$reprompt.addText(that.t('unhandled.address.entry.reprompt'))
            that.followUpState('AddressState.EntryState').ask(that.$speech, that.$reprompt);
        }
        if (!addressVal) {
            that.$speech.addText(that.t('address.entry.prompt', {name: that.$user.$data.name}));
            that.$reprompt.addText(that.t('address.entry.reprompt'));
            display.displayAPL(that,businessName,that.$speech.toString());
            that.followUpState('AddressState.EntryState').ask(that.$speech, that.$reprompt);
        } else {
            that.$user.$data.address = addressVal;
            if (that.getSessionAttribute('repeat') === true) {
                that.toStatelessIntent('PickupRequestIntent');
            } else {
                that.$speech.addText(that.t('phone.prompt'));
                that.$reprompt.addText(that.t('phone.reprompt'));
                display.displayAPL(that,businessName,that.$speech.toString());
                that.followUpState("PhoneState").ask(that.$speech,that.$reprompt);
            }
        } 
    },
    help : function (that, businessName) {
        that.$speech.addText(that.t('utility.help_address'));
        that.$reprompt.addText(that.t('utility.help_address'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.ask(that.$speech, that.$reprompt);
    },
    unhandled: function(that,businessName) {
        that.$speech.addText(that.t('unhandled.address.entry.prompt'))
        that.$reprompt.addText(that.t('unhandled.address.entry.reprompt'))
        display.displayAPL(that,businessName,that.$speech.toString())
        that.followUpState("AddressState.EntryState").ask(that.$speech, that.$reprompt)
    }
}
