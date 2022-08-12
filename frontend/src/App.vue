<script setup>
import {RouterLink, RouterView} from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import {getConfig} from "./config";
import {onMounted, ref} from "vue";
import * as nearAPI from "near-api-js";
import {Buffer} from "buffer";

window.nearConfig = getConfig("testnet");
const accountId = ref("");
const tokenId = ref("10");
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
      contractAddress: "latium.mintspace2.testnet",
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
  <div>
    <input v-model="tokenId"/>
    <button @click="connect" v-if="!accountId">Connect</button>
    <button @click="disconnect" v-else>Disconnect</button>
    <button @click="sendMessage">Send</button>
    Logged as {{ accountId }}
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
