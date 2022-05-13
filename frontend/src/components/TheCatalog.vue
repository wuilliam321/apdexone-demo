<template>
  <div>
    <TheErrorMessage v-if="error" :error="error" />
    <ProductAddButton />
    <ProductList :products="products" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import ProductList from "@/components/ProductList.vue";
import ProductAddButton from "@/components/ProductAddButton.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import { ListProductParams, ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "TheCatalog",
  components: {
    ProductList,
    ProductAddButton,
    TheErrorMessage,
  },
  inject: ["productService"],
  data() {
    return {
      products: [] as Product[],
      error: undefined as Error | undefined,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const params = new ListProductParams();
      // TODO: refresh on delete??
      const [error, response] = await this.productService.list(params);
      if (error) {
        this.error = error;
      }
      if (response?.products) {
        this.products = response.products;
      }
    },
  },
});
</script>

<style scoped></style>
