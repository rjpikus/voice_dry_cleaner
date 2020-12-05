module.exports = {
    format : function (phone){
        let formattedPhone = "";
        // start at i=2 to skip the '+1' prefix
        for (let i=2; i<phone.length; i++){
            formattedPhone += phone.charAt(i);
            if (i === 4 || i === 7){
                formattedPhone += ". ";
            }else{
                formattedPhone += " ";
            }
        }
        return formattedPhone;
    }
}