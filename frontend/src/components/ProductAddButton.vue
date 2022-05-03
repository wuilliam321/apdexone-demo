<template>
  <div>
    <button role="button" @click="addProduct">Add product</button>
  </div>
</template>

<script lang="ts">
/* import { ServiceInjection } from "@/lib/interfaces"; */
import { Product } from "@/lib/models";
import Vue from "vue";

export default Vue.extend({
  /* export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({ */
  name: "ProductAddButton",
  inject: ["productService"],
  data() {
    return {
      product: {} as Product,
    };
  },
  /* methods: { */
  /*   async addProduct() { */
  /*     const [error, response] = await this.productService.create({ */
  /*       code: "test", */
  /*       name: "test", */
  /*       price: 1, */
  /*     }); */
  /*     console.log(error, response); */
  /*   }, */
  /* }, */
});
</script>

<style scoped></style>
