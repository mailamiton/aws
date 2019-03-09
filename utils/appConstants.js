var awsSQS = {};
var awsSNS = {};
awsSQS.mailQueName = "MailQueue";
awsSQS.mailQueUrl = "https://sqs.ap-south-1.amazonaws.com/747553984264/MailQueue";

awsSNS.url = "arn:aws:sns:ap-south-1:747553984264:fileUpload";

module.exports ={awsSQS, awsSNS};