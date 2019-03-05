var aws = require('aws-sdk');
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');


//var ses = new aws.SES();
var s3 = new aws.S3();

// configure AWS SDK
//aws.config.loadFromPath('./config.json');

function getS3File(bucket, key) {
    return new Promise(function (resolve, reject) {
        s3.getObject(
            {
                Bucket: bucket,
                Key: key
            },
            function (err, data) {
                if (err) return reject(err);
                else return resolve(data);
            }
        );
    })
}

exports.handler = function (event, context, callback) {


    getS3File('shopsleek.in', 'attachment.pdf')
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

            console.log('Creating SES transporter');
            // create Nodemailer SES transporter
            /*var transporter = nodemailer.createTransport({
                SES: ses
            });*/

            var transporter = nodemailer.createTransport(ses({
                accessKeyId: 'AKIAJZO5M6ZUUVJ66ZDA',
                secretAccessKey: '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'
            }));

            /*var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                       user: 'shopsleek.in@gmail.com',
                       pass: 'amit@123'
                   }
               });*/

               /*var transporter = nodemailer.createTransport({
                host: 'smtp.office365.com', // Office 365 server
                port: 587,     // secure SMTP
                secure: false, // false for TLS - as a boolean not string - but the default is false so can remove this completely
                auth: {
                    user: '',
                    pass: 'login1234!'
                },
                tls: {
                    ciphers: 'SSLv3'
                }
            });*/
            // send email
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    console.log('Error sending email');
                    //callback(err);
                } else {
                    console.log('Email sent successfully', info);
                    //callback(null, "SUCCESS");
                }
            });
        })
        .catch(function (error) {
            console.log(error);
            console.log('Error getting attachment from S3');
            callback(err);
        });
};
