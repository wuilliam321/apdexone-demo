<template>
  <div>
    <ProductForm
      v-if="productForUpdate.code"
      :product="productForUpdate"
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
  components: { ProductForm },
  name: "ProductEditForm",
  inject: ["productService"],
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      productForUpdate: new Product("", "", 0),
    };
  },
  async created() {
    const [error, product] = await this.productService.get(this.productId);
    if (error) {
      // TODO: show a message
      return;
    }
    if (product) {
      this.productForUpdate = product;
    }
  },
  methods: {
    save() {
      const [error, isValid] = Validate.saveProduct(this.productForUpdate);
      if (!isValid) {
        return [error];
      }
      this.productService.update(this.productForUpdate);
      this.$router.push("/products");
    },
    async handleSubmit(product: Product) {
      const [error, isValid] = Validate.saveProduct(product);
      if (!isValid) {
        return [error];
      }
      await this.productService.update(product);
      this.$router.push("/products");
    },
    handleCancel() {
      this.$router.push("/products");
    },
  },
});
</script>

<style scoped></style>
