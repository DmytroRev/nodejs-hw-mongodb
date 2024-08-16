// import multer from 'multer';
// import path from 'node:path';
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve('src', 'tmp')); // Исправленный вызов cb
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, `${uniquePrefix}_${file.originalname}`);
//   },
// });

// export const upload = multer({ storage });

import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
