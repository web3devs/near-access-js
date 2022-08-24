<template>
  <form @submit.prevent="handleSubmit">
    <p>Please connect to your near wallet</p>
    <input v-model="username" />
    <input type="submit" value="Connect" :disabled="isDisabled" />
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';

const username = ref('bujal.testnet');
const isDisabled = computed(() => {
  return !(username.value && username.value.length > 0);
});

const props = defineProps({
  name: {
    type: String
  },
  num: {
    type: Number
  }
});
const emit = defineEmits(['submit']);

const handleSubmit = () => {
  emit('submit', { username: username.value });
};
</script>
