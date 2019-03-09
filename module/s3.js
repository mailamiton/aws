var aws = require('aws-sdk');
aws.config.loadFromPath(process.cwd() + '/config/config.json');
var s3 = new aws.S3();

function getFile(bucket, key) {
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


function pushFile(bucket, fileName, bytes) {
    return new Promise(function (resolve, reject) {
        var params = {Bucket: bucket, Key: fileName, Body: bytes};
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log("Error uploading data: ", err);
                reject(err);
            } else {
                resolve(null,"SUCCESS" );
            }
        });
    })
}


module.exports = {getFile, pushFile};

