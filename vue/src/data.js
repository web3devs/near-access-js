import { ref, computed } from 'vue';
import { initClient, connect, disconnect, sendMessage } from 'near-access-js';

export const accountId = ref(null);
export const hasAccess = ref(false);

export const handleSubmit = async ({ username }) => {
  await connect(username);
};

export const handleDisconnect = async () => await disconnect();
