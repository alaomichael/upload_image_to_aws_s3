// Uploading to AWS S3 bucket
require("dotenv").config();
const express = require('express');
const multer = require('multer');
const { s3Uploadv2 } = require("./s3Service");
const uuid = require('uuid').v4;
const app = express();

// const upload = multer({ dest: "uploads/" });

// single file upload
// app.post('/upload',upload.single("file"),  async (req, res) {
// res.json({status: 'success'});
// });

// multiple file uploads, with max number of upload
// app.post('/upload',upload.array("file", 4),  async (req, res) {
// res.json({status: 'success'});
// });

// allows multiple files to be uploaded with different field name
// const multiUpload = upload.fields([
//     { name: 'avatar', maxCount: 1 },
//     { name: 'resume', maxCount: 1 },
// ]);

// app.post('/upload', multiUpload, async (req, res) => {
//     console.log(req.files);
//     res.json({ status: 'success' });
// });

// custom file name and restriction on file type
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         const { originalname } = file;
//         cb(null, `${uuid()}-${originalname}`);
//     },
// });

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
app.post('/upload', uploadCustom.array("file"), async (req, res) => {
    // add s3 upload function
    const result = await s3Uploadv2(req.files);
    console.log("upload result ==========================")
    console.log(result);
    res.json({ status: 'success', });
});

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