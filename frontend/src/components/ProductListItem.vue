<template>
  <div class="product-item">
    <h2>{{ product.code }} - {{ product.name }} - {{ product.price }}</h2>
  </div>
</template>

<script lang="ts">
import { Product } from "@/lib/models";
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "ProductListItem",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
