const mongoose = require("mongoose");

mongoose.connect()

const UsersSchema = mongoose.Schema({
  username: string,
  password: string,
  privateKey: string,
  publicKey: string
})

const UserModel = mongoose.Model("users", UsersSchema);

module.exports = {
  UserModel
}
