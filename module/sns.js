var config = require('config');
var appConst = require(process.cwd() + '/utils/appConstants');
var aws      = require('aws-sdk');

aws.config.loadFromPath('./config/config.json');

// Instantiate SQS.
var sns = new aws.SNS();

function publishTropic(message ) {
    // Create publish parameters
    var params = {
      Message: message,
      TopicArn: appConst.awsSNS.url
    };
    return new Promise(function (resolve, reject) {
        sns.publish(params,
           function (err, data) {
           console.log("Data rcvd:: ", data);
               if (err) return reject(err);
               else return resolve(null,data);
           })
        });
}
module.exports ={publishTropic};