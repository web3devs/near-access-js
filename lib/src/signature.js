import * as ed from '@noble/ed25519';
import { binary_to_base58 } from 'base58-js';
import { keyStores, connect, Contract } from 'near-api-js';
import { Buffer } from 'buffer';

const keyStore = new keyStores.InMemoryKeyStore();

const verifySignature = async (signature, publicKey) => {
  const message = Buffer.from('hi');
  return await ed.verify(signature, message, publicKey);
};

export const verifyAccess = async ({
  tokenId,
  contractAddress,
  signature,
  publicKey,
  requesterAccountId
}) => {
  const publicKeyFromHex = Buffer.from(publicKey, 'hex');
  const decodedPublicKEy = binary_to_base58(publicKeyFromHex);
  const accessKeysResponse = await fetch('https://rpc.testnet.near.org', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'dontcare',
      method: 'query',
      params: {
        request_type: 'view_access_key_list',
        finality: 'final',
        account_id: requesterAccountId
      }
    })
  });

  let accessKeys = await accessKeysResponse.json();
  accessKeys = accessKeys.result.keys.map((k) => k.public_key.split(':')[1]);
  if (accessKeys.indexOf(decodedPublicKEy) === -1) {
    return false;
  }
  const connectionConfig = {
    networkId: 'testnet',
    keyStore,
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org'
  };

  const nearConnection = await connect(connectionConfig);
  const account = await nearConnection.account(requesterAccountId);
  if (await verifySignature(signature, publicKey)) {
    const contract = new Contract(account, contractAddress, {
      viewMethods: ['nft_token', 'nft_tokens_for_owner'],
      changeMethods: []
    });

    const response = await contract.nft_tokens_for_owner({
      account_id: requesterAccountId
    });

    return response.length > 0;
  } else {
    throw new Error('Invaid signature');
  }
};
