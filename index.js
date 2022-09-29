const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({dest:"uploads/"});
app.post('/upload',upload.single("file"), function(req, res) {  
res.json({status: 'success'});
});

const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));