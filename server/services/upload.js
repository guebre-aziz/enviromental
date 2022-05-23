const path = require("path")
const multer = require("multer")

const Storage = multer.diskStorage({
    destination: "upload/images",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single("image")

module.exports = upload