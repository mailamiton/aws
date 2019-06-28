var config = require('config');
var appConst = require(process.cwd() + '/utils/appConstants');
var aws      = require('aws-sdk');

aws.config.loadFromPath('./config/config.json');

// Instantiate SQS.
var sqs = new aws.SQS();

function createQue() {
    var params = {
        QueueName: appConst.awsSQS.mailQueName
    };

    sqs.createQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        }
        else {
            console.log("DATA :: ", data);
        }
    });
}

function listQue() {
 sqs.listQueues(function(err, data) {
        if(err) {
            res.send(err);
        }
        else {
             console.log("DATA :: ", data);
        }
    });
}

function sendMsgToQue() {
console.log("config.get(aws.mailQueUrl)", config.get('aws.mailQueUrl'));
var params = {
        MessageBody: 'Hello world!',
        QueueUrl: appConst.awsSQS.mailQueUrl,
        DelaySeconds: 0
    };

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        }
        else {
             console.log("DATA :: ", data);
        }
    });
}


function rcvMsgFromQue() {
 var params = {
        QueueUrl: appConst.awsSQS.mailQueUrl,
        VisibilityTimeout: 600 // 10 min wait time for anyone else to process.
    };

    sqs.receiveMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        }
        else {
            console.log("DATA :: ", data);
        }
    });
}


function delMsgFromQue(receipt) {
 var params = {
        QueueUrl: appConst.awsSQS.mailQueUrl,
        ReceiptHandle: receipt
    };

    sqs.deleteMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        }
        else {
             console.log("DATA :: ", data);
        }
    });
}

function prgMsgFromQue() {
 var params = {
        QueueUrl: appConst.awsSQS.mailQueUrl
    };

    sqs.purgeQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        }
        else {
            console.log("DATA :: ", data);
        }
    });
}



module.exports ={createQue, listQue, sendMsgToQue, rcvMsgFromQue, delMsgFromQue};