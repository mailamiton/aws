var bucket = require('./module/s3.js');
var mail = require('./module/mail.js');
var sqs = require('./module/sqs.js');
var fs = require('fs');

exports.handler = function (event, context, callback) {
   // getFileAndSendMail();
    //sqs.rcvMsgFromQue();
    //sqs.sendMsgToQue();

      var fileStream = fs.createReadStream("all.pdf");
      bucket.pushFile('shopsleek.in', 'all.pdf', fileStream).then(function (fileData) {
        console.log("fileData :::: ", fileData);
        }).catch(function (error) {
          console.log(error);
          callback(err);
      });

};


function getFileAndSendMail() {
bucket.getFile('shopsleek.in', 'attachment.pdf')
        .then(function (fileData) {
            console.log("fileData :::: ", fileData);
            var mailOptions = {
                from: 'shopsleek.in@gmail.com',
                subject: 'This is an email sent from a Lambda function!',
                html: `<p>You got a contact message from: `,
                to: 'shopsleek.in@gmail.com',
                //html: `<p>You got a contact message from: <b>${event.emailAddress}</b></p>`,
                // bcc: Any BCC address you want here in an array,
                attachments: [
                    {
                        filename: "An Attachment.pdf",
                        content: fileData.Body
                    }
                ]
            };

            mail.sendSES(mailOptions);
        })
        .catch(function (error) {
            console.log(error);
            console.log('Error getting attachment from S3');
            callback(err);
        });
}