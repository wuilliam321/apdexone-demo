<template>
  <button
    type="button"
    role="button"
    @click="goToProductEdit"
    class="btn btn-primary btn-sm"
  >
    Edit
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProductEditButton",
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToProductEdit() {
      this.$router.push(`/inventory/products/${this.productId}`);
    },
  },
});
</script>

<style scoped></style>
