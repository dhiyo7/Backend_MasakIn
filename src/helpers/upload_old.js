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
      next();
    }
  });
};

module.exports = multiUpload;