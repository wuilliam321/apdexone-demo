<template>
  <div>
    <button type="button" role="button" @click="goToProductEdit">Edit</button>
  </div>
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
      this.$router.push(`/products/${this.productId}`);
    },
  },
});
</script>

<style scoped></style>
