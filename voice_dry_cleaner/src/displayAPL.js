var apl = require('./datasource');
module.exports = {
    displayAPL : function (that,businessName, text) {
        if (that.isAlexaSkill() && that.$alexaSkill.hasAPLInterface()) {
            that.$alexaSkill.addDirective(
                apl.datasource(businessName,"6146381102","https://firebasestorage.googleapis.com/v0/b/mydrycleaner-be879.appspot.com/o/dry-cleaners%2Fdublin_cleaners%2F512x512.png?alt=media",text)
            )       
        } 
    }
}