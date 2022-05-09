<template>
  <div class="row product-item">
    <div class="col product-item__code">
      {{ product.code }}
    </div>
    <div class="col product-item__name">
      {{ product.name }}
    </div>
    <div class="col product-item__price">
      {{ product.price }}
    </div>
    <div class="col product-item__actions">
      <ProductEditButton :productId="product.code" /> | Delete
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/lib/models";
import Vue, { PropType } from "vue";
import ProductEditButton from "@/components/ProductEditButton.vue";

export default Vue.extend({
  name: "ProductListItem",
  components: {
    ProductEditButton,
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
});
</script>

<style scoped>
.product-item {
  border-bottom: 1px solid #ccc;
}
</style>
