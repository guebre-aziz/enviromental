const SiteReportDB = require("../models/models")
const upload = require("../services/upload")

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
            createdAt: new Date(),
            imgUrl: req.file.path,
            img: {
                data: req.file.filename,
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


// retrive and return a single (if id is there) or all the reports
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
                   .send({ message: err.message || `error retriving user with id ${id}`})
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
    if(!req.body){
        return res.status(400)
                  .send({ message: "Data to update can not be empty"})
    }

    const id = req.query.id

    SiteReportDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
                .then(data => {
                    if(!data){
                        res.status(404)
                        .send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
                    } else {
                        res.send(data)
                    }
                })
                .catch(err =>{
                    res.status(500)
                    .send({ message : "Error Update user information"})
                })
}

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