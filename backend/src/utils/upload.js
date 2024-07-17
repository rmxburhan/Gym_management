const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './storage/uploads',
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

const storagePublic = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

const uploadSingle = (keyname, public = false) => {
    return multer({
        storage: public == false ? storage : storagePublic,
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        },
    }).single(keyname);
};

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = {
    uploadSingle,
};
