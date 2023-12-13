
const mongoose = require('mongoose');
require("dotenv").config();

const connect = () => {

    mongoose
    .connect(process.env.DB_URL)
    .then( ()=> {
        console.log("connection established with MongoDB");
    })
    .catch( (err) => {
        console.log("error in connection to MongoDB: " + err);
    });

}

module.exports = connect;