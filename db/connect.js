require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async() => {

//strictQuery false by default. That means that all the fields will be saved in the database, even if some of them are not specified in the schema model
mongoose.set("strictQuery", false);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

await mongoose
    .connect(process.env.MONGO_URL, options)
    .then((res) => {
        console.log("Database Connected Successfully");
        console.log(`Database Host: ${res.connection.host}`);
    })
    .catch((err) => {
        console.error(`Database Error: ${err}`);
    });

}

module.exports = connectDatabase;

