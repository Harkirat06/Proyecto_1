const mongoose = require("mongoose")

const conectionString = "mongodb+srv://Harkirat97:Jailbreakios8@cluster0.id8b622.mongodb.net/app?retryWrites=true&w=majority"

mongoose.connect(conectionString)
.then(()=>console.log("Base de datos conectada"))
