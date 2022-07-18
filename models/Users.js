const {Schema, model} = require("mongoose")
const userSchema = new Schema({
    userName: String,
    email: String,
    passwordHash: String
})
userSchema.set("toJSON",{
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
   }
})
 const User = model("User", userSchema)


 module.exports = User

  /*User.find({}).then(result=>{
    console.log(result)
    mongoose.connection.close()
})
 const user1 = new User({
    userName: "Harkirat",
    email: "khalsaharkirat97@gmail.com",
    password: "123"
 })

 user1.save().then(result=>{
    console.log(result)
    mongoose.connection.close()
 })*/