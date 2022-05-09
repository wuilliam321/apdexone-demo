<template>
  <div class="product-edit">
    <ProductEditForm :productId="$route.params.id" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductEditForm from "@/components/ProductEditForm.vue";

export default Vue.extend({
  name: "ProductEditView",
  components: {
    ProductEditForm,
  },
});
</script>
