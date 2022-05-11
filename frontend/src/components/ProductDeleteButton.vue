<template>
  <div>
    <button type="button" role="button" @click="goToProductDelete">
      Delete
    </button>
  </div>
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
    async goToProductDelete() {
      const [error, response] = await this.productService.delete(
        this.productId
      );
      if (error) {
        /* this.error = error; */
        return;
      }
      if (response) {
        this.$router.push("/products");
      }
    },
  },
});
</script>

<style scoped></style>
