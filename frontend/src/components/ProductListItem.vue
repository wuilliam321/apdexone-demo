<template>
  <tr class="product-item">
    <td class="product-item__code">
      {{ product.code }}
    </td>
    <td class="product-item__name">
      {{ product.name }}
    </td>
    <td class="product-item__price">
      {{ product.price }}
    </td>
    <td class="product-item__actions">
      <div class="btn-group" role="group" aria-label="Actions">
        <ProductEditButton :productId="product.code" />
        <ProductDeleteButton :productId="product.code" />
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { Product } from "@/lib/models";
import Vue, { PropType } from "vue";
import ProductEditButton from "@/components/ProductEditButton.vue";
import ProductDeleteButton from "@/components/ProductDeleteButton.vue";

export default Vue.extend({
  name: "ProductListItem",
  components: {
    ProductEditButton,
    ProductDeleteButton,
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
