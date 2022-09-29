// Uploading to AWS S3 bucket
require("dotenv").config();
const express = require('express');
const multer = require('multer');
const { s3Uploadv2, s3Uploadv3 } = require("./s3Service");
const app = express();

// Using memory storage for S3
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') {
        // allow to pass
        cb(null, true);
    } else {
        // throw exception  error and don't allow to pass    
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

//middleware name, 
const uploadCustom = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10000000, files: 2 }, // limit file size and max number of files allowed for upload
});

// field name = "file";
// upload to s3 using v2
// app.post('/upload', uploadCustom.array("file"), async (req, res) => {
//     try {
//         // add s3 v2 upload function
//         const results = await s3Uploadv2(req.files);
//         console.log("upload results ==========================")
//         console.log(results);
//         return res.json({ status: 'success', });
//     } catch (err) {
//         console.log(err);
//     }
// });

// upload to s3 using v3, for single upload
// app.post('/upload', uploadCustom.array("file"), async (req, res) => {
//     try {
//         // add s3 v3 upload function
//         const file = req.files[0];
//         const result = await s3Uploadv3(file);
//         console.log("upload result ==========================")
//         console.log(result);
//         // you will have to manually create image url on sucsss
//         return res.json({ status: 'success', });
//     } catch (err) {
//         console.log(err);
//     }
// });

// upload to s3 using v3, for multiple upload
app.post('/upload', uploadCustom.array("file"), async (req, res) => {
    try {
        // add s3 v3 upload function
        const results = await s3Uploadv3(req.files);
        console.log("upload results ==========================")
        console.log(results);
        return res.json({ status: 'success', });
    } catch (err) {
        console.log(err);
    }
});

// error handling
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "file is too large",
            });
        }
        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                message: "file limit reached",
            });
        }
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                message: "file must be an image",
            });
        }
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));