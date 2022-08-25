<script setup>
import NearProvider from 'near-access-vue/src/components/NearProvider.vue';
import { ref } from 'vue';
import { handleSubmit, handleDisconnect } from 'near-access-vue/src/data';
const handleClick = () => {
  handleSubmit({ username: 'bujal.testnet' });
};
const address = ref('latium.mintspace2.testnet'); //ref('cowboytest.mintspace2.testnet');
</script>

<template>
  <div>
    <input v-model="address" />
    <NearProvider
      nftName="NFT-T"
      :requiredNumber="2"
      :contractAddress="address"
    >
      <div>Secret content</div>
      <!-- <template v-slot:no-access>
        You don't have enought {{ nftName }} tokens. You need at least
        {{ requiredNumber }}
      </template> -->
      <template v-slot:connect>
        <button @click="handleClick">Connect</button>
      </template>
      <template v-slot:disconnect>
        <button @click="handleDisconnect">Disconnect</button>
      </template>
    </NearProvider>
  </div>
</template>
<!--
<script setup>
import { onMounted, ref } from 'vue';

import {
  initClient,
  connect,
  disconnect,
  sendMessage,
  getData
} from 'near-access-js';
// window.nearConfig = getConfig('testnet');
const accountId = ref('');
const tokenId = ref('10');
const collectionContract = ref('bujal.testnet');

onMounted(async () => {
  try {
    await initClient('http://localhost:3000', collectionContract.value);
  } finally {
    accountId.value = getData().accountId;
  }
});

const handler = async () => {
  try {
    // await initClient('http://localhost:3000', collectionContract.value);
    await connect();
  } finally {
    accountId.value = getData().accountId;
  }
};
</script>

<template>
  <div class="main">
    <div class="connection">
      <div>
        <div>
          <button @click="handler" v-if="!accountId">Connect</button>
          <div v-else>
            Logged as {{ accountId }}
            <button @click="disconnect">Disconnect</button>
          </div>
        </div>
      </div>
      <div class="field">
        <label for="tokenId">TokenID</label>
        <input name="tokenId" v-model="tokenId" />
      </div>
      <div class="field">
        <label for="collectionContract">Collection Contract</label>
        <input name="collectionContract" v-model="collectionContract" />
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
</style> -->
