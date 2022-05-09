<template>
  <div>
    <div class="row product-list">
      <div class="col product-list__header">code</div>
      <div class="col product-list__header">name</div>
      <div class="col product-list__header">price</div>
      <div class="col product-list__header">actions</div>
    </div>
    <template v-for="product in products">
      <ProductListItem :key="product.code" :product="product"></ProductListItem>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ProductListItem from "@/components/ProductListItem.vue";
import { Product } from "@/lib/models";

export default Vue.extend({
  name: "ProductList",
  components: {
    ProductListItem,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.product-list {
  border: 1px solid #ccc;
}
.product-list__header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}
</style>
