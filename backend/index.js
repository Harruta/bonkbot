const express = require("express")
const { UserModel } = require("./models")
const { keypair } = require("@solana/web3.js")
const app = express()


app.post("api/v1/signup", (req, req) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = UserModel.findOne({
    username: username,
    password: password
  })

  const keypair = new keypair();
  UserModel.create({
    username,
    password,
    publicKey: keypair.publicKey.toString(),
    privateKey: keypair.secretKey.toString()
  })
  res.json({
    message: keypair.publicKey.toString()
  })
})

app.post("api/v1/signin", (req, req) => {
  res.json({
    message: "sign up "
  })
})

app.post("api/v1/tnxn/sign", (req, req) => {
  res.json({
    message: "sign up "
  })
})

app.post("api/v1/tnxn", (req, req) => {
  res.json({
    message: "sign up "
  })
})



