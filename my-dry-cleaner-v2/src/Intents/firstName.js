const { STRINGS } = require('../strings.js');
var display = require('../displayAPL');

module.exports = {
    name: function (that,businessName) {
        const nameVal = that.$inputs.name.value;
        that.$user.$data.name = nameVal;
        if (that.getSessionAttribute('repeat') === true) {
            that.toStatelessIntent('PickupRequestIntent');
        }else{
            that.$speech.addText(that.t('address.entry.prompt',{name:nameVal}));
            that.$reprompt.addText(that.t('address.entry.reprompt'));
            display.displayAPL(that,businessName,that.$speech.toString());
            that.followUpState('AddressState.EntryState').ask(that.$speech,that.$reprompt)
        }
    },
    help: function(that,businessName) {
        that.$speech.addText(that.t('utility.help_first_name'));
        that.$reprompt.addText(that.t('utility.help_first_name'));
        display.displayAPL(that,businessName,that.$speech.toString());
        that.ask(that.$speech, that.$reprompt);
    }
}
