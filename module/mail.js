var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var config = require('config');

function sendSES(mailOptions){

            var transporter = nodemailer.createTransport(ses({
                accessKeyId: config.get('aws.userid'),
                secretAccessKey: config.get('aws.key'),
            }));

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    console.log('Error sending email');
                } else {
                    console.log('Email sent successfully', info);
                }
            });

}

module.exports = {sendSES};