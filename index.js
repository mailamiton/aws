var bucket = require('./module/s3.js');
var mail = require('./module/mail.js');
var sqs = require('./module/sqs.js');
var sns = require('./module/sns.js');
var fs = require('fs');

exports.handler = function (event, context, callback) {
   // getFileAndSendMail();

    //sqs.sendMsgToQue();
    //sqs.rcvMsgFromQue();
    //sqs.delMsgFromQue("AQEBLFZ3TKk0/em4cxcD0YkrMgqiRs7ydP4gNVN2MUq8OFJdNVltsvDDS/DRNzq0tSOMkUAYMw7KXOLHi3D1rucGL/9xeqUFWQRedsCckFAj5ar2kk7P4PLdr5NEiNzAknLZBnnuAmNB9DzwA7V0OwHkUEp2wvIBGV+dmXP+AVj3apZqZPqiVF/2IqeCjGRaOAh2n8qsS9CO48CDLhJY8kowDXtXP4XQQkmMFIlyo8ohu6Ik7ap71AE02JZLLSxY8hZe6n95ds9JmhhgMfZ5G+PFPsrhKufbNaoVvP77+mc1Xl8vtrC0S23SPqqB8KZ5VkAe3/MD4sKbd1DfRzlBEYrD3bFHlfyGMBpxUJ1S1hKTefIoGST0gqaGdoLU9yjMXtxZkd74A7C7QWnhdWa6YDUe6Q==");
      /*var fileStream = fs.createReadStream("all.pdf");
      bucket.pushFile('shopsleek.in', 'all.pdf', fileStream).then(function (fileData) {
        console.log("fileData :::: ", fileData);
        }).catch(function (error) {
          console.log(error);
          callback(err);
      });*/
    // sns.publishTropic("This is Sample Test");

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