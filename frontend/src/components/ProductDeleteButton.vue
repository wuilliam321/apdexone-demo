<template>
  <button
    type="button"
    role="button"
    @click="goToDeleteConfirmation"
    class="btn btn-danger btn-sm"
  >
    Delete
  </button>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { ServiceInjection } from "@/lib/interfaces";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "ProductDeleteButton",
  inject: ["productService"],
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  methods: {
    /* async goToProductDelete() { */
    /*   const [error, response] = await this.productService.delete( */
    /*     this.productId */
    /*   ); */
    /*   if (error) { */
    /*     /1* this.error = error; *1/ */
    /*     return; */
    /*   } */
    /*   if (response) { */
    /*     this.$router.push("/products"); */
    /*   } */
    /* }, */
    goToDeleteConfirmation() {
      this.$router.push(`/products/${this.productId}/delete`);
    },
  },
});
</script>

<style scoped></style>
