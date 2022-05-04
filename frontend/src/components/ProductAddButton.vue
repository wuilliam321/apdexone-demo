<template>
  <div>
    <button type="button" role="button" @click="goToProductAdd">
      Add product
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProductAddButton",
  methods: {
    goToProductAdd() {
      this.$router.push("/products/add");
    },
  },
});
</script>

<style scoped></style>
