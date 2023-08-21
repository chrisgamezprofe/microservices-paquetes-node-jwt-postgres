const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const paqueteRoute = require("./routes/paqueteRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", paqueteRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});


