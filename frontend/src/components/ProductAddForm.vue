<template>
  <div>
    <ProductForm
      :product="productForCreate"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { Validate } from "@/lib/validations";
import ProductForm from "./ProductForm.vue";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "ProductAddForm",
  inject: ["productService"],
  components: {
    ProductForm,
  },
  data() {
    return {
      productForCreate: new Product("", "", 0),
    };
  },
  methods: {
    async handleSubmit(product: Product) {
      const [error, isValid] = Validate.saveProduct(product);
      if (!isValid) {
        return [error];
      }
      await this.productService.create(product);
      this.$router.push("/products");
    },
    handleCancel() {
      this.$router.push("/products");
    },
  },
});
</script>

<style scoped></style>
