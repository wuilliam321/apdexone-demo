<template>
  <div class="row">
    <div class="offset-4 col-4">
      <form @submit.prevent="handleSubmit">
        <p>Are you sure you want to delete this product?</p>
        <div class="mb-3">
          <label for="code" class="form-label">Code:</label>
          <input
            type="text"
            name="code"
            :value="productForDelete.code"
            disabled="disabled"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input
            type="text"
            name="name"
            :value="productForDelete.name"
            disabled="disabled"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Price:</label>
          <input
            type="number"
            name="price"
            :value="productForDelete.price"
            disabled="disabled"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-danger me-3">Yes, Delete</button>
          <button type="button" class="btn btn-secondary" @click="handleCancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "ProductDeleteForm",
  inject: ["productService"],
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      productForDelete: new Product("", "", 0),
    };
  },
  async created() {
    const [error, product] = await this.productService!.get(this.productId);
    if (error) {
      // TODO: show a message
      return;
    }
    if (product) {
      this.productForDelete = product;
    }
  },
  methods: {
    async handleSubmit() {
      await this.productService!.delete(this.productForDelete.code);
      this.$router.push("/inventory/products");
    },
    handleCancel() {
      this.$router.push("/inventory/products");
    },
  },
});
</script>

<style scoped></style>
