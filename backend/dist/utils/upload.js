"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiple = exports.uploadSingle = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storagePublic = multer_1.default.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage: storagePublic,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});
const uploadSingle = (keyname) => {
    return upload.single(keyname);
};
exports.uploadSingle = uploadSingle;
const uploadMultiple = (keyname) => upload.array(keyname);
exports.uploadMultiple = uploadMultiple;
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb("Error: Images Only!");
    }
}
