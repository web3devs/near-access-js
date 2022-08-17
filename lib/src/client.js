import * as nearAPI from 'near-api-js';

import { Buffer } from 'buffer';
import { getConfig } from './config';

let apiURL = null;
let accountId = null;
let collectionContract = null;
let tokenId = '10';

export const getData = () => ({
  apiURL,
  accountId,
  collectionContract,
  tokenId
});

export const initClient = async (url, contractName) => {
  apiURL = url;
  collectionContract = contractName;
  window.nearConfig = getConfig('testnet', contractName);

  window.near = await nearAPI.connect(
    Object.assign(
      {
        deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() }
      },
      window.nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR TestNet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletAccount = new nearAPI.WalletAccount(window.near);

  // Getting the Account ID. If unauthorized yet, it's just empty string.
  window.accountId = window.walletAccount.getAccountId();

  accountId = window.walletAccount.getAccountId();
  // Initializing our contract APIs by contract name and configuration.
  window.contract = await window.near.loadContract(accountId, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['whoSaidHi'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['sayHi'],
    // Sender is the account ID to initialize transactions.
    sender: window.accountId
  });

  await window.contract.sayHi();
};

export const connect = async () => {
  // Getting the Account ID. If unauthorized yet, it's just empty string.
  await window.walletAccount.requestSignIn(window.nearConfig.contractName);
  window.accountId = window.walletAccount.getAccountId();
  accountId = window.walletAccount.getAccountId();
};

export const disconnect = async () => {
  // Getting the Account ID. If unauthorized yet, it's just empty string.
  await window.walletAccount.signOut();
  window.accountId = null;
  accountId = null;
  window.location.replace(window.location.origin + window.location.pathname);
};

export const sendMessage = async () => {
  const keyPair = await window.near.config.deps.keyStore.getKey(
    'testnet',
    window.accountId
  );

  const signature = keyPair.sign(Buffer.from('hi'));

  const response = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requesterAccountId: window.accountId,
      signature: Buffer.from(signature.signature).toString('hex'),
      contractAddress: collectionContract,
      tokenId,
      publicKey: Buffer.from(keyPair.publicKey.data).toString('hex')
    })
  });
  if (response.status === 200) {
    alert('Access Granted');
  } else {
    alert('Access denied');
  }
};
