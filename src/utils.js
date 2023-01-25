const multer = require('multer');

// Multer configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/public/img');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploader = multer({storage});

module.exports = uploader;