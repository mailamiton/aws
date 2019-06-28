var awsSQS = {};
var awsSNS = {};
awsSQS.mailQueName = "MailQueue";
awsSQS.mailQueUrl = "https://sqs.ap-south-1.amazonaws.com/419422738327/MailQueue";

awsSNS.url = "arn:aws:sqs:ap-south-1:419422738327:MailQueue";

module.exports ={awsSQS, awsSNS};