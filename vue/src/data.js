import { ref, computed } from 'vue';
import { initClient, connect, disconnect, sendMessage } from 'near-access-js';

export const accountId = ref(null);
export const hasAccess = ref(false);

(async () => {
  try {
    await initClient('http://localhost:3000', async (newData) => {
      accountId.value = newData.accountId;
    });
  } finally {
    if (accountId.value) {
      hasAccess.value = await sendMessage();
    }
  }
})();
export const handleSubmit = async ({ username }) => {
  await connect(username);
};

export const handleDisconnect = async () => await disconnect();
