const mongoose = require('mongoose');

const connectToMongo = ()=>{
mongoose.connect(
    "mongodb://localhost:27017"
).then(()=> console.log("connection established"));
}
module.exports = connectToMongo;