// Import necessary classes from the Diamante SDK
import { Horizon, Asset, Keypair, TransactionBuilder, BASE_FEE, Operation } from "diamante-sdk-js";

// Initialize Horizon server and network passphrase for the Diamante network
const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");
const networkPassphrase = "Diamante Testnet";

// Generate a random key pair
const keyPair = Keypair.random();

// Log the public and secret keys
console.log("Public Key:", keyPair.publicKey());
console.log("Secret Key:", keyPair.secret());

// Example function to create an asset
async function createAsset() {
    const issuerKP = Keypair.random(); // Generate issuer keypair
    const asset = new Asset("MYASSET", issuerKP.publicKey());

    // Create a transaction to create the asset (pseudo-code)
    // You will need to fund your issuer account first
    const transaction = new TransactionBuilder(issuerKP.publicKey(), {
        fee: BASE_FEE,
        networkPassphrase,
    })
    .addOperation(Operation.createAsset({ asset }))
    .setTimeout(30)
    .build();

    // Sign and submit the transaction
    transaction.sign(issuerKP);
    await server.submitTransaction(transaction);

    console.log("Asset created:", asset);
}

// Call the function to create an asset
createAsset().catch(console.error);
