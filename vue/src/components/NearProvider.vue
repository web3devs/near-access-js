<script setup>
import { initClient, sendMessage } from 'near-access-js';
import { onMounted } from 'vue';
import { handleSubmit, accountId, hasAccess } from '../data';
import Connect from './Connect.vue';
const props = defineProps({
  nftName: {
    type: String
  },
  requiredNumber: {
    type: Number
  },
  contractAddress: {
    type: String
  }
});

onMounted(async () => {
  try {
    await initClient(
      'http://localhost:3000',
      props.contractAddress,
      async (newData) => {
        accountId.value = newData.accountId;
      }
    );
  } finally {
    if (accountId.value) {
      hasAccess.value = await sendMessage();
    }
  }
});
</script>

<template>
  <div>
    <div v-if="accountId">
      <slot name="disconnect"> </slot>
      <div v-if="hasAccess">
        <slot />
      </div>
      <div v-else>
        <slot name="no-access">
          <div>
            You don't have enought {{ nftName }} tokens. You need at least
            {{ requiredNumber }}
          </div>
        </slot>
      </div>
    </div>
    <div v-else>
      <slot name="connect">
        <Connect
          @submit.once="handleSubmit"
          :name="nftName"
          :num="requiredNumber"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
