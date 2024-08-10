"use client";
import { useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { hdkey } from "ethereumjs-wallet";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState([]);

  function handleGenerateMnemonic() {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    setWallets([]);
  }

  function handleGenerateNewWallet() {
    if (mnemonic) {
      const seed = mnemonicToSeedSync(mnemonic);
      const hdWallet = hdkey.fromMasterSeed(seed);
      const walletIndex = wallets.length;
      const wallet = hdWallet
        .derivePath(`m/44'/60'/0'/0/${walletIndex}`)
        .getWallet();
      setWallets([...wallets, wallet]);
    }
  }

  function getPublicKey(wallet) {
    return wallet.getPublicKeyString();
  }

  function getAddress(wallet) {
    return wallet.getAddressString();
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Web Based Wallet</h1>
        <h1 className="text-3xl font-bold">Build at 100xDevs</h1>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-3xl hover:text-gray-700" />
        </a>
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleGenerateMnemonic}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {mnemonic ? "Generate New Mnemonic" : "Generate Mnemonic"}
        </button>
      </div>

      {mnemonic && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-2xl font-semibold mb-2">Your Mnemonic:</h2>
          <p className="text-gray-700 font-mono break-words mb-4">{mnemonic}</p>
          <button
            onClick={handleGenerateNewWallet}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Add Wallet
          </button>
        </div>
      )}

      {wallets.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Wallets:</h2>
          <ul className="space-y-4">
            {wallets.map((wallet, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-gray-800">
                  <strong>Public Key:</strong> {getPublicKey(wallet)}
                </p>
                <p className="text-gray-800">
                  <strong>Address:</strong> {getAddress(wallet)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
