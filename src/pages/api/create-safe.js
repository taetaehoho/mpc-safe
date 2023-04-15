// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const privateKey = 'c3d7a1e5392ec9145b2b6481bf9442957b486300f24b4b178fada22983cd6acf';
        const wallet = new ethers.Wallet(privateKey);
        const provider = new ethers.providers.InfuraProvider('mumbai', 'YOUR_INFURA_API_KEY');
        const transaction = JSON.parse(req.body)


        // Sign the transaction with the wallet's private key
        const signedTransaction = await wallet.signTransaction(transaction);

        // Send the signed transaction
        const sentTransaction = await provider.sendTransaction(signedTransaction);

        // Wait for the transaction to be mined and get the receipt
        const transactionReceipt = await sentTransaction.wait();

        // Print the transaction receipt
        console.log('Transaction Receipt:', transactionReceipt);
        console.log(req.body)
    }
    res.status(200).json({ name: 'John Doe' })
}
