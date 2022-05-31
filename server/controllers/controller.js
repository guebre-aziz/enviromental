const SiteReportDB = require("../models/models")
const upload = require("../services/upload")
const fs = require("fs")

// create new report
exports.create = (req, res) => {
    upload(req, res, (err)=>{

        // check
        if(!req.body){
        res.status(400)
            .send({message: "Body cannot be empty"})
            return
        }

        // new report
        const report = new SiteReportDB({
            title: req.body.title,
            description: req.body.description,
            where: req.body.where,
            geoCoord: JSON.parse(req.body.geoCoord),
            imgUrl: req.file.path,
            img: {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            }
        })

        // save report in the database
        report
            .save()
            .then(data => {
                console.log(data)
                res.status(201)
                    .send(`Report created successfully with id: ${report._id}`)
            })
            .catch(err => {
                res.status(500)
                    .send({
                    message: err.message || "Some error occurred while creating report"
                })
            })
})}


// retrive and return a single (if id is provided) or all the reports
exports.find = (req, res) => {

    // return single report
    if(req.query.id){
        const id = req.query.id

        SiteReportDB.findById(id)
            .then(data => {
                if(!data){
                    res.status(404)
                        .send({ message: ` report with id ${id} not found`})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500)
                   .send({ message: err.message || `error retriving report with id ${id}`})
            })
    } else {
        SiteReportDB.find()
            .then(reports => {
                res.send(reports)
            })
            .catch(err => {
                res.status(500)
                   .send({ message: err.message || "error occurred while retriving reports informations"})
            })
    }
}

// update a report with given an id
exports.update = (req, res) => {
    upload(req, res, (err)=>{
    if(!req.body){
        return res.status(400)
                  .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    const image = fs.readFileSync(req.file.path)

    SiteReportDB.findByIdAndUpdate({_id: id}, {
        title: req.body.title,
        description: req.body.description,
        where: req.body.where,
        geoCoord: JSON.parse(req.body.geoCoord),
        imgUrl: req.file.path,
        img: {
            data: image,
            contentType: req.file.mimetype
        }
       
        },
        { returnOriginal: false }
    ).then(data => {
        console.log(data.img)
        var thumb = new Buffer(data.img.data).toString('base64');

        res.status(200)
           .send(req.file)
    }).catch(err => {
        console.log(err)
    })
})}

// delete report
exports.delete = (req, res) => {
    if(!req.params.id){
        return res.status(400)
                  .send({ message: "id needed in params"})
    }

    const id = req.params.id
    console.log(id)

    SiteReportDB.findByIdAndDelete(id)
                .then(data => {
                    if(!data) {
                        res.status(404)
                           .send({ message:`Error while deleting report with id: ${id}`})
                    } else {
                        res.status(200)
                           .send({ message: "report deleted successfully"})
                    }
                })
                .catch(err => {
                    res.status(500)
                       .send({ message: err.message || `Error while deleting report`})
                })
}