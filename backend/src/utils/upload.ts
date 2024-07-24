import path from "path";
import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: "./storage/uploads",
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const storagePublic = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const uploadSingle = (keyname: string, isPulic: boolean = false) => {
  return multer({
    storage: isPulic == false ? storage : storagePublic,
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).single(keyname);
};

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
