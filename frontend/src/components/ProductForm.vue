<template>
  <div class="row">
    <div class="offset-4 col-4">
      <form @submit.prevent="save">
        <div class="mb-3">
          <label for="code" class="form-label">Code:</label>
          <input
            type="text"
            name="code"
            v-model="productForSave.code"
            class="form-control"
            aria-describedby="codeHelp"
          />
          <div id="nameHelp" class="form-text">
            Enter a unique code for the product
          </div>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input
            type="text"
            name="name"
            v-model="productForSave.name"
            class="form-control"
            aria-describedby="nameHelp"
          />
          <div id="nameHelp" class="form-text">
            Enter the name of the product
          </div>
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Price:</label>
          <input
            type="number"
            name="price"
            v-model="productForSave.price"
            class="form-control"
            aria-describedby="priceHelp"
          />
          <div id="nameHelp" class="form-text">
            Enter the price of the product
          </div>
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary mx-3">Submit</button>
          <button type="button" class="btn btn-secondary mx-3" @click="goBack">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Product } from "@/lib/models";

export default Vue.extend({
  name: "ProductForm",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  data() {
    return {
      productForSave: new Product("", "", 0),
    };
  },
  created() {
    this.productForSave = { ...this.product };
  },
  methods: {
    save() {
      this.$emit("submit", this.productForSave);
    },
    goBack() {
      this.$emit("cancel");
    },
  },
});
</script>

<style scoped></style>
