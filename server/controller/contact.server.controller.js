/**
 * Created by Raphson on 7/1/16.
 */
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
module.exports = {
    /**
     * Send An Email To The Admin About Enquiries Made By Users
     * @param req
     * @param res
     * @return json
     */
    sendMessage: function(req, res){
        var fullname = req.body.name.toLowerCase();
        let senderEmail = req.body.email.toLowerCase();
        let subject     = 'Enquiry From mernmap by ' + senderEmail;

        let from_email = new helper.Email('admin@mernmap.com');
        let to_email = new helper.Email("nsegun5@gmail.com");
        let content = new helper.Content('text/html', req.body.message);

        let mail = new helper.Mail(from_email, subject, to_email, content);
        let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
            console.log('mail sent!');
            return res.status(200).send({message: "Message Sent Successfully"});
        });

    }
};