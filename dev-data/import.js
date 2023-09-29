const fs = require('fs');
const mongoose = require('mongoose');

const config = require('../config/config');

// const Posts = require('./models/postModel');
const User = require('./models/userModel');

//db connection
// const connectDatabase = require("../db/connect");

// dotenv.config({ path: `${__dirname}/../config.env` });
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(config.mongoose.url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log('Database Connection Successful... Happy Blogging!'))
//   .catch((err) => {
//     console.error(`Database Error: ${err}`);
//   });


// READ JSON FILE
// const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// IMPORT JSON INTO DB
const importData = async() => {
  try {
    console.log("config.mongoose.url", config.mongoose.url);

    await mongoose
    .connect(config.mongoose.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Database Connection Successful... Happy Blogging!'))
    .catch((err) => {
      console.error(`Database Error: ${err}`);
    });

    const users = await JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

    await User.create(users);
    console.log('Data seeded successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA ON DB:
// const deleteData = async() => {
//   try {
//       await Techie.deleteMany();
//       console.log('Data successfully deleted');
//   } catch (error) {
//       console.log(error)
//   }
//   process.exit();
// }

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData()
}

console.log(process.argv);



