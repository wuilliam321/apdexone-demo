<template>
  <div class="product-add">
    <ProductAddForm />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductAddForm from "@/components/ProductAddForm.vue";

export default Vue.extend({
  name: "ProductAddView",
  components: {
    ProductAddForm,
  },
});
</script>
