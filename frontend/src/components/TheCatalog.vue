<template>
  <div>
    <ProductList :products="products" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import ProductList from "@/components/ProductList.vue";
import { ListProductParams, ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  /* export default Vue.extend({ */
  name: "TheCatalog",
  components: {
    ProductList,
  },
  inject: ["productService"],
  data() {
    return {
      products: [] as Product[],
    };
  },
  /* async created() { */
  /*   const params = new ListProductParams(); */
  /*   const [_, response] = await this.productService.list(params); */
  /*   if (response?.products) { */
  /*     this.products = response.products; */
  /*   } */
  /* }, */
  mounted() {
    // TODO: continue create this code with tests
    const params = new ListProductParams();
    this.productService.list(params);
  },
});
</script>

<style scoped></style>
