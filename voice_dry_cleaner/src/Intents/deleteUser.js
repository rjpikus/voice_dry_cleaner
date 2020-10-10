var display = require('../displayAPL');

module.exports = {
    delete: async function (that, businessName) {
        // Delete User
        console.log("DeleteItem succeeded:");
        // DELIVER RESULTS
        if (that.isAlexaSkill()) {
            that.$alexaSkill.progressiveResponse('Deleting')
                .then(() => that.$alexaSkill.progressiveResponse('Still deleting'));
        }
        await that.$user.delete(that.tell(that.$speech));
        that.$speech.addText(that.t('delete.user.prompt',{businessName:businessName}));
    }
}
