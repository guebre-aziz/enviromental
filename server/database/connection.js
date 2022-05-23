const mongoose = require("mongoose")

const connectionDB = async()=>{
    try {
        const connt = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${connt.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectionDB