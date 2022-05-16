<template>
  <div class="product-delete">
    <ProductDeleteForm :productId="$route.params.id" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductDeleteForm from "@/components/ProductDeleteForm.vue";

export default Vue.extend({
  name: "ProductDeleteView",
  components: {
    ProductDeleteForm,
  },
});
</script>
