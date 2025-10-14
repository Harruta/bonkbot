const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  privateKey: {
    type: String,
    required: [true, "Private key is required"],
  },
  publicKey: {
    type: String,
    required: [true, "Public key is required"],
  },
});


UsersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const UserModel = mongoose.model("User", UsersSchema);

module.exports = UserModel;
