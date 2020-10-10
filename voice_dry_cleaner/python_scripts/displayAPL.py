from functions import fileWriter
from app import largeUrl,phone

phoneNumber = phone
logo = largeUrl
displayAPL = """var apl = require('./datasource');
module.exports = {
    displayAPL : function (that,businessName, text) {
        if (that.isAlexaSkill() && that.$alexaSkill.hasAPLInterface()) {
            that.$alexaSkill.addDirective(
                apl.datasource(businessName,"%s","%s",text)
            )       
        } 
    }
}"""%(phoneNumber,logo)

fileWriter("../src/displayAPL.js","w+",displayAPL)