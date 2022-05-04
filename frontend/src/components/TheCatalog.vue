<template>
  <div>
    <TheErrorMessage v-if="error" :error="error" />
    <ProductList :products="products" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import ProductList from "@/components/ProductList.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import { ListProductParams, ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "TheCatalog",
  components: {
    ProductList,
    TheErrorMessage,
  },
  inject: ["productService"],
  data() {
    return {
      products: [] as Product[],
      error: undefined as Error | undefined,
    };
  },
  async mounted() {
    const params = new ListProductParams();
    const [error, response] = await this.productService.list(params);
    if (error) {
      this.error = error;
    }
    if (response?.products) {
      this.products = response.products;
    }
  },
});
</script>

<style scoped></style>
