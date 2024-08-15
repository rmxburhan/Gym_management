import path from "path";
import multer from "multer";

const storagePublic = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storagePublic,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

export const uploadSingle = (keyname: string) => {
  return upload.single(keyname);
};

export const uploadMultiple = (keyname: string) => upload.array(keyname);

function checkFileType(file: Express.Multer.File, cb: any) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
