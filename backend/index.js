const express = require("express");
const { UserModel } = require("./models");
const { keypair } = require("@solana/web3.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const app = express()
app.use(express.json())

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const keypair = new keypair();
  await UserModel.create({
    username,
    password,
    publicKey: keypair.publicKey.toString(),
    privateKey: keypair.secretKey.toString()
  })
  res.json({
    message: keypair.publicKey.toString()
  })
})

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await UserModel.findOne({
    username: username,
    password: password
  })

  if (user) {
    const token = jwt.sign({
      id: user
    }, process.env.JWT_SECRET);
    res.json({
      token
    })
  } else {
    res.status(403).json({
      message: "invalid credentials"
    })
  }
})

app.post("/api/v1/tnxn/sign", (req, res) => {
  res.json({
    message: "sign up "
  })
})

app.post("/api/v1/tnxn", (req, res) => {
  res.json({
    message: "sign up "
  })
})



