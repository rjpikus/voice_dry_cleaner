const { STRINGS } = require('../strings.js');
var display = require('../displayAPL');
var formatPhoneNumber = require('../formatPhone');

module.exports = {
    end : function (that,db,businessName) {
        let name = that.$user.$data.name;
        let addressLine1 = that.$user.$data.address ? that.$user.$data.address : "";
        let address = addressLine1;
        let customerPhoneNumber = that.$user.$data.phone ? that.$user.$data.phone : "";
        let specialNote = that.$user.$data.specialNote ? that.$user.$data.specialNote : "";
        let noteString = specialNote ? specialNote : "No Extra Notes."
        let fullName = that.getSessionAttribute('fullName');
        let platform = that.getSessionAttribute('platform');
        //Sends the order data to Firebase.
        let time = new Date();
        let millisec = time.valueOf();
        let seconds = time.getSeconds().toString();
        let minutes = time.getMinutes().toString();
        let hours = time.getHours().toString();
        let day = time.getDate().toString();
        let month = time.getMonth().toString();
        let year = time.getFullYear().toString();
        let docRef
        let orderComplete = that.getSessionAttribute("orderComplete")
        let notifyArrival = that.getSessionAttribute("notifyCleaner")
        if (orderComplete) { // Order is Complete
            docRef = db.collection('dry-cleaners')
                     .doc(businessName)
                     .collection('newOrders')
                     .doc();
                     that.$speech.addText(that.t('end_conversation.prompt', {businessName:businessName}))
        } else if (notifyArrival) { // Order is INCOMPLETE
            docRef = db.collection('dry-cleaners')
                     .doc(businessName)
                     .collection('customersOnTheWay')
                     .doc();
            if(fullName) {// Full Name received            
                that.$speech.addText("Success! " + businessName + " is expecting " + fullName + " to arrive in the next 30 minutes. See you soon!")
            } else { // Only First Name
                that.$speech.addText("Success! " + businessName + " is expecting you to arrive in the next 30 minutes. See you soon " + name + "!")
            }  
        } else {
            docRef = db.collection('dry-cleaners')
                     .doc(businessName)
                     .collection('incompleteOrders')
                     .doc();
                     that.$speech.addText(that.t('end_conversation.prompt', {businessName:businessName}))
        }
        let setData = docRef.set({
            timeStamp: millisec,
            platform: platform,
            name: fullName ? fullName : name,
            addressLine: addressLine1,
            address: address,
            phoneNumber: customerPhoneNumber,
            specialNote: noteString,
            year: year,
            month: month,
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
        //End of Firebase code.
        display.displayAPL(that,businessName,that.$speech.toString());       
        that.tell(that.$speech);
    }
}