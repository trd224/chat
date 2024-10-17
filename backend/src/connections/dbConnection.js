const mongoose = require("mongoose");

async function connectTOMongoDB(url){
    return await mongoose.connect(url);
}

module.exports = connectTOMongoDB;