<template>
  <a>{{ `${authenticated ? "Logout" : "Login"}` }}</a>
</template>

<script lang="ts">
export default {
  props: {
    authenticated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
