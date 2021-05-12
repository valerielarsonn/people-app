// DEPENDENCIES

// Get .env variables
require("dotenv").config();

// Pull PORT from .env, give default value of 3000
const { PORT = 3000, MONGODB_URL } = process.env;

// Import express
const express = require("express");

// Create application object
const app = express();

// Import mongoose
const mongoose = require("mongoose");

// Import middleware
const cors = require("cors");
const morgan = require("morgan");

// DATABASE CONNECTION

// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Connection Events
mongoose.connection
    .on("open", () => console.log("YoU aRe CoNnEcTeD tO mOnGo"))
    .on("close", () => console.log("YoU aRe DiScOnNeCtEd To MoNgO"))
    .on("error", (error) => console.log(error));

// MODELS

const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
});

const People = mongoose.model("People", PeopleSchema);

// MIDDLEWARE
// to prevent cors errors, open access to all origins
app.use(cors());

// Logging
app.use(morgan("dev"));

// Parse json bodies
app.use(express.json());


// ROUTES

// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

// People INDEX Route
app.get("/people", async (req, res) => {
    try {
        // Send all people
        res.json(await People.find({}));
    } catch (error) {
        // Send error
        res.status(400).json(error);
    };
});

// People CREATE Route
app.post("/people", async (req, res) => {
    try{
        // Send all people
        res.json(await People.create(req.body));
    } catch (error) {
        // Send error
        res.status(400).json(error);
    };
});

// People UPDATE Route
app.put("/people/:id",async (req, res) => {
    try {
        // Send all people
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        // Send error
        res.status(400).json(error);
    };
});

// People DELETE Route
app.delete("/people/:id", async (req, res) => {
    try{
        // Send all people
        res.json(await People.findByIdAndRemove(req.params.id));
    } catch (error) {
        //Send error
        res.status(400).json(error);
    };
});

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));