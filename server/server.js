const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

// Create and Assign the folder path for exported Json files from eclipse system.
const folderPath = './EclipseExports';

// Define express app instance.
const app = express();

// Apply middleware to app instance.
app.use(cors());
app.use(bodyParser.json());

// Create web server on port 4000.
app.listen(4000, function () {
  console.log('Web server listening on port 4000')
})

// Get list of available files in exports folder
app.get('/', function (req, res, next) {
    console.log('File List Requested!')
    fs.readdir(folderPath, function(err, files) {
        if (err) {
            return console.error(err);
        }
        res.json(files);
    });
})

// Post back requested file json.
app.post('/dvh', function (req, res) {   
    console.log("Somebody wants the file called " + req.body.fileSelect)
    res.sendfile(folderPath + "/" + req.body.fileSelect);    
})
