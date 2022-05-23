const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    where: {
        type: String
    },
    geoCoord: 
       { 
        lat: {type: Number},
        long: {type: Number}
        }
    ,
    imgUrl: {
        type: String,
    },
    img: {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const SiteReportDB = mongoose.model("report-db", schema)

module.exports = SiteReportDB