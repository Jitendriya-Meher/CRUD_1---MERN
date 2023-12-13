const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> {
    console.log(`Server listening on port number ${PORT}`);
}); 

const connect = require("./config/database");
connect();

const userRoute = require("./routes/userRoute");

app.use(userRoute);



