<script setup>
import {getConfig} from "./config";
import {onMounted, ref} from "vue";
import * as nearAPI from "near-api-js";
import {Buffer} from "buffer";

window.nearConfig = getConfig("testnet");
const accountId = ref("");
const tokenId = ref("10");
const collectionContract = ref("latium.mintspace2.testnet");
onMounted(async () => {
  window.near = await nearAPI.connect(
      Object.assign(
          {
            deps: {keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()},
          },
          window.nearConfig
      )
  );

  // Initializing Wallet based Account. It can work with NEAR TestNet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletAccount = new nearAPI.WalletAccount(window.near);

  // Getting the Account ID. If unauthorized yet, it's just empty string.
  window.accountId = window.walletAccount.getAccountId();
  accountId.value = window.walletAccount.getAccountId();
  // Initializing our contract APIs by contract name and configuration.
  window.contract = await window.near.loadContract(accountId.value, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["whoSaidHi"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ["sayHi"],
    // Sender is the account ID to initialize transactions.
    sender: window.accountId,
  });

  await window.contract.sayHi();
});

// Initializing Wallet based Account. It can work with NEAR TestNet wallet that
// is hosted at https://wallet.testnet.near.org

const connect = async () => {
  // Getting the Account ID. If unauthorized yet, it's just empty string.
  await window.walletAccount.requestSignIn(window.nearConfig.contractName);
  window.accountId = window.walletAccount.getAccountId();
  accountId.value = window.walletAccount.getAccountId();
};

const disconnect = async () => {
  // Getting the Account ID. If unauthorized yet, it's just empty string.
  await window.walletAccount.signOut();
  window.accountId = null;
  accountId.value = null;
  window.location.replace(window.location.origin + window.location.pathname);
};

const sendMessage = async () => {
  const keyPair = await window.near.config.deps.keyStore.getKey(
      "testnet",
      window.accountId
  );

  const signature = keyPair.sign(Buffer.from("hi"));

  const response = await fetch(`http://localhost:3000`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requesterAccountId: window.accountId,
      signature: Buffer.from(signature.signature).toString("hex"),
      contractAddress: collectionContract.value,
      tokenId: tokenId.value,
      publicKey: Buffer.from(keyPair.publicKey.data).toString("hex"),
    }),
  });
  if (response.status === 200) {
    alert("Access Granted");
  } else {
    alert("Access denied");
  }
};
</script>

<template>
  <div class="main">
    <div class="connection">
      <div>
        <div>
          <button @click="connect" v-if="!accountId">Connect</button>
          <div v-else>
            Logged as {{ accountId }}
            <button @click="disconnect">Disconnect</button>
          </div>

        </div>
      </div>
      <div class="field">
        <label for="tokenId">TokenID</label>
        <input name="tokenId" v-model="tokenId"/>
      </div>
      <div class="field">
        <label for="collectionContract">Collection Contract</label>
        <input name="collectionContract" v-model="collectionContract"/>
      </div>


      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

.field {
  display: flex;
  flex-direction: column;
}
</style>
