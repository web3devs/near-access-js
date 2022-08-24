# Basic usage

```
<script setup>
import NearProvider from 'near-access-vue/src/components/NearProvider.vue';

</script>

<NearProvider
  nftName="NFT-T"
  :requiredNumber="2"
  contractAddress="latium.mintspace2.testnet">
      <div>Secret content</div>
</NearProvider>
```

`nftName` - token

`requiredNumber` - number of tokens required

`contractAddress` - nft token address



# Advanced usage

## Custom connect and disconnect templates


```
<script setup>
import NearProvider from 'near-access-vue/src/components/NearProvider.vue';
import { handleSubmit, handleDisconnect } from 'near-access-vue/src/data';
const handleClick = () => {
  handleSubmit({ username: <your-username> });
};
</script>
<template>
  <div>
    <NearProvider
      nftName="NFT-T"
      :requiredNumber="2"
      contractAddress="'latium.mintspace2.testnet'"
    >
      <div>Secret content</div>
      <template v-slot:connect>
        <button @click="handleClick">Connect</button>
      </template>
      <template v-slot:disconnect>
        <button @click="handleDisconnect">Disconnect</button>
      </template>
    </NearProvider>
  </div>
</template>
```


## Custom no access template


```
<script setup>
import NearProvider from 'near-access-vue/src/components/NearProvider.vue';
</script>
<template>
  <div>
    <NearProvider
      nftName="NFT-T"
      :requiredNumber="2"
      contractAddress="'latium.mintspace2.testnet'"
    >
      <div>Secret content</div>
      <template v-slot:no-access>
        You don't have enought} tokens.
      </template>
    </NearProvider>
  </div>
</template>
```

