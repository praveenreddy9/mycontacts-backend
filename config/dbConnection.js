const mongoose = require("mongoose");
// console.log(process.env, '==================')
// const connectDb = async()=>{
//     try{
//         const connect = await mongoose.connect();
//         console.log("Database connected", connect.connection.host, connect.connection.name);
//     }catch(err){
//         console.log(err, '------------');
//         process.exit(1);
//     }
// };

mongoUrl = 'mongodb://' + 'localhost' + '/' + "praveenContactsDB";


// let connectWithRetry = function() {
//   const connect = mongoose.connect(mongoUrl);
//     return mongoose.connect(mongoUrl, function(err) {
//       if (err) {
//         console.error('Failed to connect to mongo on startup - retrying some times', err);
//         // setTimeout(connectWithRetry, 5000);
//       }else{
//         console.log('Connected to DB=====444',mongoUrl);
//       }
//     });
//   };
//   connectWithRetry();

// module.exports = connectDb;


const connectDb = async () =>{
  try{
const connect = await mongoose.connect(mongoUrl);
console.log("Database connected ===>",connect.connection.host, connect.connection.name);
  }catch(err){
console.log("connection error",err);
process.exit(1);
  }
};

module.exports = connectDb;