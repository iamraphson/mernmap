/**
 * Created by Raphson on 7/1/16.
 */
var sendGrid = require('sendgrid-nodejs')("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");
module.exports = {
    /**
     * Send An Email To The Admin About Enquiries Made By Users
     * @param req
     * @param res
     * @return json
     */
    sendMessage: function(req, res){
        var email = new sendGrid.Email();
        var senderEmail = req.body.email.toLowerCase();
        email.addTo("nsegun5@gmail.com");
        email.setFrom(senderEmail);
        email.setSubject('Enquiry From meanmap.com by ' + senderEmail);
        email.setHtml(req.body.message);

        sendgrid.send(email);

        return res.status(200).send({message: "Message Sent Successfully"});
    }
};