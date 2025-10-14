import { Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import axios from "axios";


const fromPubkey = new PublicKey("DfgcjkinjBpg2unCzmQsZQ5ELeMMXuCVdqkY6XAXMfwE");

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/V2O-WWPQn9hNVj25_ON6z");
async function sendSol() {
  const ix = SystemProgram.transfer({
    fromPubkey: fromPubkey,
    toPubkey: new PublicKey("FJvMS3kvjKRLUvTqgoZgxk1aoNBuWy546rRuLX3BHmZQ"),
    lamports: 0.01 * LAMPORTS_PER_SOL
  })
  const tx = new Transaction().add(ix);

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash
  tx.feePayer = fromPubkey

  const serrializeTx = tx.serialize({
    requireAllSignatures: false,
    verifySignatures: false
  })
  console.log(serrializeTx);

  await axios.post("api/v1/txn/sign", {
    message: serrializeTx,
    retry: false
  })
}

function App() {
  return (
    <div className="flex items-center justify-center">
      <button className="rounded-lg border border-white">
        Amount
      </button>

    </div>
  )
}
export default App();
