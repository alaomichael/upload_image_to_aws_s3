const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({dest:"uploads/"});
// single file upload
// app.post('/upload',upload.single("file"), function(req, res) {
// res.json({status: 'success'});
// });

// multiple file uploads, with max number of upload
app.post('/upload',upload.array("file", 4), function(req, res) {
res.json({status: 'success'});
});


const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));