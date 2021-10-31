<template>
  <h1 v-if="user">Hello, {{ user.name }}</h1>
  <form @submit.prevent="handleAuth">
    <input v-model="formData.username" role="username" />
    <input v-model="formData.password" role="password" />
    <button>Click hear to sign in</button>
  </form>
  <span v-if="error">{{ error }}</span>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const formData = reactive({
      username: "",
      password: "",
    });
    const error = ref("");
    const user = ref(undefined);
    const handleAuth = async () => {
      try {
        const response = await axios.post("/login", {
          username: formData.username,
          password: formData.password,
        });
        console.log("response", response);
        user.value = response.data;
      } catch (e) {
        error.value = e;
      }
    };
    return {
      formData,
      user,
      error,
      handleAuth,
    };
  },
});
</script>
