import { useState } from 'react';
import Web3 from 'web3';

const useMetaMask = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection error:", error);
      }
    }
  };

  return { account, connectWallet };
};

export default useMetaMask;
