// Import Diamante SDK
import {
  Horizon,
  Keypair,
  Asset,
  TransactionBuilder,
  BASE_FEE,
  Operation
} from "diamante-sdk-js";

// Diamante server and network information
const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");
const networkPassphrase = "Diamante Testnet";

// Initialize UI elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressEl = document.getElementById('walletAddress');
const nftListEl = document.getElementById('nftList');
const createAssetBtn = document.getElementById('createAsset');
const createLiquidityBtn = document.getElementById('createLiquidity');
const swapAssetsBtn = document.getElementById('swapAssets');

// Event listener to connect wallet
connectWalletBtn.addEventListener('click', async () => {
  try {
    // Fetch wallet public key from backend (via an API route)
    const response = await fetch('/generate-keypair');
    const walletData = await response.json();

    const walletPublicKey = walletData.publicKey; // Get public key from backend
    walletAddressEl.innerText = "Connected: " + walletPublicKey;

    // Fetch NFTs for the wallet
    fetchNFTs(walletPublicKey);
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
});

// Fetch NFTs from backend or Diamante Blockchain
async function fetchNFTs(walletAddress) {
  try {
    const response = await fetch(`/get-nfts?walletAddress=${walletAddress}`); // Assumes a backend route is set up
    const nfts = await response.json();

    nftListEl.innerHTML = ''; // Clear existing list

    nfts.forEach(nft => {
      const nftItem = document.createElement('div');
      nftItem.classList.add('nft-item');
      nftItem.innerHTML = `
          <h3>Organ NFT #${nft.id}</h3>
          <p>Organ Type: ${nft.organType}</p>
          <p>Status: ${nft.status}</p>
          <p>Recipient: ${nft.recipient ? nft.recipient : 'Pending Match'}</p>
      `;
      nftListEl.appendChild(nftItem);
    });
  } catch (error) {
    console.error('Error fetching NFTs:', error);
  }
}

// Event listener to create asset
createAssetBtn.addEventListener('click', async () => {
  try {
    // Example asset details for creation
    const assetDetails = {
      code: 'ORGANS',
      issuer: 'GAS3F3GK5...WDPFQ23KP' // Replace with actual issuer
    };

    // Send request to backend to create the asset
    const response = await fetch('/create-asset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assetDetails // Send asset details to the backend
      })
    });

    const result = await response.json();
    console.log('Asset created:', result);

  } catch (error) {
    console.error('Error creating asset:', error);
  }
});

// Event listener to create liquidity pool
createLiquidityBtn.addEventListener('click', async () => {
  try {
    // Example liquidity details for pool creation
    const liquidityDetails = {
      asset1: {
        code: 'ORGANS',
        issuer: 'GAS3F3GK5...WDPFQ23KP'
      },
      asset2: {
        code: 'DIAM',
        issuer: 'GA...KP' // Replace with actual issuer
      }
    };

    // Send request to backend to create liquidity pool
    const response = await fetch('/create-liquidity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        liquidityDetails // Send liquidity details to the backend
      })
    });

    const result = await response.json();
    console.log('Liquidity pool created:', result);

  } catch (error) {
    console.error('Error creating liquidity pool:', error);
  }
});

// Event listener to swap assets
swapAssetsBtn.addEventListener('click', async () => {
  try {
    // Example swap details
    const swapDetails = {
      sourceAsset: {
        code: 'ORGANS',
        issuer: 'GAS3F3GK5...WDPFQ23KP'
      },
      targetAsset: {
        code: 'DIAM',
        issuer: 'GA...KP' // Replace with actual issuer
      },
      amount: 100 // Amount of source asset to swap
    };

    // Send request to backend to swap assets
    const response = await fetch('/swap-assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        swapDetails // Send swap details to the backend
      })
    });

    const result = await response.json();
    console.log('Assets swapped:', result);

  } catch (error) {
    console.error('Error swapping assets:', error);
  }
});
