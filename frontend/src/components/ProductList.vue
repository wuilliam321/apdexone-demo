<template>
  <div>
    <ProductAddButton />
    <div class="products">
      <template v-for="product in products">
        <ProductListItem
          :key="product.code"
          :product="product"
        ></ProductListItem>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ProductListItem from "@/components/ProductListItem.vue";
import ProductAddButton from "@/components/ProductAddButton.vue";
import { Product } from "@/lib/models";

export default Vue.extend({
  name: "ProductList",
  components: {
    ProductListItem,
    ProductAddButton,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
