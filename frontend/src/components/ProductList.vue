<template>
  <div class="row">
    <div class="col">
      <table class="table product-list">
        <thead>
          <tr>
            <td class="product-list__header">code</td>
            <td class="product-list__header">name</td>
            <td class="product-list__header">price</td>
            <td class="product-list__header">actions</td>
          </tr>
        </thead>
        <tbody class="product-item">
          <template v-for="product in products">
            <ProductListItem
              :key="product.code"
              :product="product"
            ></ProductListItem>
          </template>
        </tbody>
      </table>
    </div>
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
