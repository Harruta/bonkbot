const express = require("express");
const { UserModel } = require("./models");
const { Keypair, Connection, Transaction } = require("@solana/web3.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bs58 = require("bs58");
const cors = require("cors")

const app = express();
const port = process.env.PORT || 3000;

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/V2O-WWPQn9hNVj25_ON6z")

app.use(cors());
app.use(express.json())

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const keypair = new Keypair.generate();
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
      id: user._id
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

app.post("/api/v1/txn/sign", async (req, res) => {
  const serializeTransaction = req.body.message;
  const tx = Transaction.from(serializeTransaction)

  const keypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));

  tx.sign(keypair)

  const signature = await connection.sendTransaction(tx)
  console.log(signature)
  res.json({
    message: "sign up "
  })
})

app.post("/api/v1/txn", (req, res) => {
  res.json({
    message: "sign up "
  })
})



