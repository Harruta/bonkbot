import React from "react";
import { Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";

const fromPubkey = new PublicKey("DfgcjkinjBpg2unCzmQsZQ5ELeMMXuCVdqkY6XAXMfwE");
const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/V2O-WWPQn9hNVj25_ON6z");

function App() {
  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey,
      toPubkey: new PublicKey("FJvMS3kvjKRLUvTqgoZgxk1aoNBuWy546rRuLX3BHmZQ"),
      lamports: Math.floor(0.01 * LAMPORTS_PER_SOL)
    });

    const tx = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = fromPubkey;

    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    });
    console.log(serializedTx);

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTx,
      retry: false
    });
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
      <input className="border border-gray-500"
        type="text"
        placeholder="Amount"></input>
      <input className=" border border-gray500"
        type="text"
        placeholder="Address"></input>
      <button
        onClick={() => sendSol()}
        className="rounded-lg border border-black px-4 py-2 bg-white text-black"
      >
        Send 0.01 SOL
      </button>
    </div>
  );
}

export default App;
