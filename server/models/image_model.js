const mongoose = require("mongoose")
const schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const ImageDB = mongoose.model("image-db", schema)

module.exports = ImageDB