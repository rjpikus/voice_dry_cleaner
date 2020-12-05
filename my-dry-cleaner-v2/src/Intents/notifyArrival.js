const { STRINGS } = require('../strings.js');
var display = require('../displayAPL');
const accountSid = STRINGS.TWILIO.SID;
const authToken = STRINGS.TWILIO.AUTH;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    notifyArrival: function (that, businessName) {
        //Get Inputs
        const nameVal = that.$inputs.name ? that.$inputs.name.value : undefined;
        const phoneVal = that.$inputs.phoneNumber ? that.$inputs.phoneNumber.key : undefined;
        const fullName = that.$inputs.fullName ? that.$inputs.fullName.value : undefined;
        that.$user.$data.name = nameVal ? nameVal : that.$user.$data.name;
        that.$user.$data.fullName = fullName ? fullName : that.$user.$data.fullName;
        
        // Check Inputs & User Attributes
        if (!nameVal && !that.$user.$data.name){// Check for name input OR user attribute
            that.$speech.addText(that.t('notify.arrival.no_name.prompt',{businessName:businessName}))
            that.$reprompt.addText(that.t('notify.arrival.no_name.reprompt'));
            display.displayAPL(that,businessName,that.$speech.toString());
            return that.followUpState('NotifyArrivalState')
                        .ask(that.$speech,that.$reprompt);
        } else if (!phoneVal && !that.$user.$data.phone){ // Check for phone input OR user attribute
            that.$speech.addText(that.t('notify.arrival.no_phone.prompt',{businessName:businessName, name: that.$user.$data.name}));
            that.$reprompt.addText(that.t('notify.arrival.no_phone.reprompt'));
            display.displayAPL(that,businessName,that.$speech.toString());
            return that.followUpState('NotifyArrivalState')
                        .ask(that.$speech,that.$reprompt);
        } else {
            that.setSessionAttribute("notifyCleaner", true);
            that.toStatelessIntent("END");
        }   
    }
}
