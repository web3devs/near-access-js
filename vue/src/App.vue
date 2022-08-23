<script setup>
import { onMounted } from '@vue/runtime-core';
import NearProvider from './components/NearProvider.vue';
import { handleSubmit } from './data';
</script>

<template>
  <NearProvider>
    <div>Custom content</div>

    <template v-slot:connect>
      <div>
        <button
          @click="handleSubmit({ username: 'latium.mintspace2.testnet' })"
        >
          connect
        </button>
      </div>
    </template>
  </NearProvider>
</template>

<style scoped></style>
