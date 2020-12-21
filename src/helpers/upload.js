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
//             console.log('upload gambar sukses')
//             next();
//         }
//     });
// };

// module.exports = multiUpload;

const multer = require("multer");
const path = require("path");
const form = require("./form");

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images')
    },
    filename: function(req, file, cb) {
        const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
            file.originalname
        )}`
        cb(null, nameFormat)
    }
})

const upload = multer({
    storage: multerStorage,
    limits: 2 * 1000 * 1000,
})

const multiUpload = (req, res, next) => {
    const uploadMulti = upload.array("img", 10)
    uploadMulti(req, res, (err) => {
        if(err) {
            form.error(res, {
                msg: "Multer Error",
                err,
            })
        } else {
            next();
        }
    })
}

module.exports = multiUpload;