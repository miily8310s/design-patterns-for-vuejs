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
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const formData = reactive({
      username: "",
      password: "",
    });
    const error = ref("");
    console.log(store);
    const user = computed(() => store.state.user);
    const handleAuth = async () => {
      try {
        await store.dispatch("login", {
          username: formData.username,
          password: formData.password,
        });
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
