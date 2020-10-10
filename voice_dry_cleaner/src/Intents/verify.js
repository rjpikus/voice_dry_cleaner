var display = require('../displayAPL');
var formatPhoneNumber = require('../formatPhone');

module.exports = {
    verify : function (that,businessName) {
        let name = that.$user.$data.name;
        let address = that.$user.$data.address;
        let phone = that.$user.$data.phone;
        let specialNote = that.$user.$data.specialNote;
        if(name === undefined) {
          that.toStatelessIntent('LaunchAlexa');
        }else if(!address || address === " missing from our records") {
          that.toStateIntent('ReEntryState','AddressIsWrong');
        }else if (!phone || phone === " missing from our records "){
         that.toStateIntent('ReEntryState','PhoneNumberIsWrong');
        } else if(!specialNote){
          that.toStateIntent('ReEntryState','NoteIsWrong')
        }else{
          // formattedPhone will contain the same phone number, but formatted for Alexa reading
          let formattedPhone = formatPhoneNumber.format(phone);
          if(specialNote === "No Extra Notes" && that.getSessionAttribute('noNote') === true) {
            that.$speech.addText(that.t('order_confirmation.prompt_no_note', {name:name,addressLine1:address, phone:formattedPhone}))
            that.$reprompt.addText(that.t('order_confirmation.reprompt'));
            
            display.displayAPL(that,businessName,that.$speech.toString());
            that.followUpState('OrderConfirmationState').ask(that.$speech, that.$reprompt); 
          } else {
            that.$speech.addText(that.t('order_confirmation.prompt', {name:name,addressLine1:address, phone:formattedPhone, specialNote:specialNote}));
            that.$reprompt.addText(that.t('order_confirmation.reprompt'));
            
            display.displayAPL(that,businessName,that.$speech.toString());
            that.followUpState('OrderConfirmationState').ask(that.$speech, that.$reprompt); 
          }           
        }
    }
}

