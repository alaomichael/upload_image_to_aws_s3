const { S3 } = require('aws-sdk');
const { S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const uuid = require('uuid').v4;

// using version 2 for single upload
exports.s3Uploadv2 = async (file) => {
    const s3 = new S3();
    // for single file upload
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuid()}-${file.originalname}`,
        Body: file.buffer,
    };
    return await s3.upload(param).promise();
};
// using version 2 for multiple files upload
exports.s3Uploadv2 = async (files) => {
    const s3 = new S3();
    // for multiple files uploads
    const params = files.map(file => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer,
        };
    });

    // use promise.all to send and wait for all files to be uploaded 
    return await Promise.all(
        params.map((param) => s3.upload(param).promise())
    );
};

// using version 3 for single upload
exports.s3Uploadv3 = async (file) => {
const s3Client = new S3Client();

const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${uuid()}-${file.originalname}`,
    Body: file.buffer,
};
return s3Client.send(new PutObjectCommand(param));
};


// using version 3 for multiple files upload
exports.s3Uploadv3 = async (files) => {
    const s3Client = new S3Client();
    // for multiple files uploads
    const params = files.map(file => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer,
        };
    });

    // use promise.all to send and wait for all files to be uploaded 
    return await Promise.all(
        params.map((param) => s3Client.send(new PutObjectCommand(param)))
    );
};