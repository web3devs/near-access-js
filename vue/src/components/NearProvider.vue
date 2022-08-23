<script setup>
import { hasAccess, accountId, handleSubmit } from '../data';
import Login from './Login.vue';
</script>

<template>
  <div>
    <div v-if="hasAccess">
      <slot name="disconnect"> </slot>
      <slot />
    </div>
    <div v-else>
      <slot name="connect">
        <Login @submit.once="handleSubmit" />
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
