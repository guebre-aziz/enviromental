const express = require('express');
const route = express.Router()
const controller = require("../controllers/controller")
const services = require("../services/render")
const upload = require("../services/upload")

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoute)


// API
route.post("/api/reports", controller.create)
route.get("/api/reports", controller.find)
route.put("/api/reports/", controller.update)
route.delete("/api/reports/:id", controller.delete)

module.exports = route