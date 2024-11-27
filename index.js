require("dotenv").config(); 
const { rateLimit } = require('express-rate-limit');
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const urlRoutes = require("./Routes/urlRoutes");
const db = require("./Models/db")
const app = express();
const limiter = rateLimit({
    windowMs: 60 * 1000, 
    limit: 100, 
    message : "We have too many request, please try again later.."
})
db.main();
app.use(limiter)
app.use(morgan("dev")); 
app.use(bodyParser.json()); 
app.use(cors()); 
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use("/", urlRoutes);

app.all("*", (req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: "The requested endpoint could not be found. Please check the URL or verify the request method."
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port = ${PORT}`);
});
