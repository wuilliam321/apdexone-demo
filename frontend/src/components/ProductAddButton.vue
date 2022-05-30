<template>
  <div>
    <button
      type="button"
      role="button"
      @click="goToProductAdd"
      class="btn btn-primary"
    >
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
      this.$router.push("/inventory/products/add");
    },
  },
});
</script>

<style scoped></style>
