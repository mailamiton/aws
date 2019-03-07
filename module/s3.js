var aws = require('aws-sdk');
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


function pushFile(bucket, key) {
    return new Promise(function (resolve, reject) {
        var params = {Bucket: bucket, Key: 'file_name1', Body: 'Hello!'};
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log("Error uploading data: ", err);
                reject(err);
            } else {
                res.writeHead(200, {'Content-Type':'text/plain'});
                res.write("Successfully uploaded data to bucket/sub-bucket/");
                res.end()
                resolve(null, res);
            }
        });
    })
}

module.exports = {getFile, pushFile};

