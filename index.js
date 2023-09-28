const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connection is Succesfull"))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
    res.status(200).json("Welcome")
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

