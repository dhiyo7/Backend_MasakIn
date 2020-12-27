// Punya mas Moko

// const multer = require("multer");
// const path = require("path");
// const form = require("./form");

// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/images");
//     },
//     filename: function (req, file, cb) {
//         const nameFormat = `image-${Date.now()}${path.extname(
//             file.originalname
//         )}`;
//         cb(null, nameFormat);
//     },
// });

// const upload = multer({
//     storage: multerStorage,
//     limits: {fileSize: 2 * 1000 * 1000,}  // 2 MB
// });

// const multiUpload = (req, res, next) => {
//     const uploadMultiple = upload.array("img", 5);
//     uploadMultiple(req, res, (err) => {
//         if (err) {
//             form.error(res, {
//                 msg: "Multer Error",
//                 err,
//             });
//         } else {
//             let filePath = req.files.map((val) =>
//                 "/images/" + val.filename
//             )
//             req.filePath = filePath.join(',')
//             next();
//         }
//     });
// };

// module.exports = multiUpload;

const multer = require("multer");
const path = require("path");
const form = require("./form");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, "./public/images");
    } else if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/3gp" ||
      file.mimetype === "video/mkv" ||
      file.mimetype === "video/mpeg"
    ) {
      cb(null, "./public/videos");
    }
  },
  filename: function (req, file, cb) {
    const nameImage = `image-${Date.now()}${path.extname(file.originalname)}`;

    const nameVideo = `video-${Date.now()}${path.extname(file.originalname)}`;
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, nameImage);
    } else if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/3gp" ||
      file.mimetype === "video/mkv" ||
      file.mimetype === "video/mpeg"
    ) {
      cb(null, nameVideo);
    }
  },
});

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 200 * 1000 * 1000 }, // 200 MB
});

const multiUpload = (req, res, next) => {
  // const uploadMultiple = upload.single("img");
  const uploadMultiple = upload.fields([
    { name: "img", maxCount: 1 },
    { name: "videos", maxCount: 10 },
  ]);
  uploadMultiple(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "Multer Error",
        err,
      });
    } else {
        console.log('next controller')
      next();
    }
  });
};

module.exports = multiUpload;
