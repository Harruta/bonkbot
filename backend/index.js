require("dotenv").config()
const express = require("express")
// const { userModel } = require("./models");
const { Keypair, Transaction, Connection } = require("@solana/web3.js");
const jwt = require("jsonwebtoken");
const bs58 = require('bs58');
const cors = require("cors");
const privateKey = process.env.PRIVATE_KEY?.trim();

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/V2O-WWPQn9hNVj25_ON6z")

const app = express()
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
  const serializedTransaction = req.body.message;

  console.log("before serialise")
  console.log(serializedTransaction);

  const tx = Transaction.from(Buffer.from(serializedTransaction))
  console.log("after serialise")

  console.log(bs58)
  const keyPair = Keypair.fromSecretKey(bs58.default.decode(privateKey));

  const { blockhash } = await connection.getLatestBlockhash();
  tx.blockhash = blockhash
  tx.feePayer = keyPair.publicKey

  tx.sign(keyPair)

  const signature = await connection.sendTransaction(tx, [keyPair])
  console.log(signature)

  res.json({
    message: "Sign up"
  })
})

app.get("/api/v1/txn", (req, res) => {
  res.json({
    message: "Sign up"
  })
})

app.listen(3000);
