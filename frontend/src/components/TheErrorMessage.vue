<template>
  <div>{{error}}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TheErrorMessage",
  props: {
    error: {
      type: Error,
      required: true,
    },
  },
});
</script>

<style scoped></style>
