const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: "uploads/" });
// single file upload
// app.post('/upload',upload.single("file"), function(req, res) {
// res.json({status: 'success'});
// });

// multiple file uploads, with max number of upload
// app.post('/upload',upload.array("file", 4), function(req, res) {
// res.json({status: 'success'});
// });

// allows multiple files to be uploaded with different field name
const multiUpload = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
]);

app.post('/upload', multiUpload, (req, res) => {
    res.json({ status: 'success' });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));