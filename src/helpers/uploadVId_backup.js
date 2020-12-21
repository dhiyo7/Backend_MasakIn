const multer = require("multer");
const path = require("path");
const form = require("./form");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/videos");
    },
    filename: function (req, file, cb) {
        const nameFormat = `vid-${Date.now()}${path.extname(
            file.originalname
        )}`;
        cb(null, nameFormat);
    },
});

const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});

const multiUpload = (req, res, next) => {
    const uploadMultiple = upload.array("video", 5);
    uploadMultiple(req, res, (err) => {
        if (err) {
            form.error(res, {
                msg: "Multer Error",
                err,
            });
        } else {
            let filePath = req.files.map((val) => "/videos/" + val.filename)

            req.fileVid = filePath.join(',')
            next();
        }
    });
};



module.exports = multiUpload;