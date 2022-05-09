<template>
  <div>
    <form @submit.prevent="save">
      <label for="code">
        Code: <input type="text" name="code" v-model="productForUpdate.code" />
      </label>
      <label for="name">
        Name: <input type="text" name="name" v-model="productForUpdate.name" />
      </label>
      <label for="price">
        Price:
        <input type="number" name="price" v-model="productForUpdate.price" />
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { Validate } from "@/lib/validations";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
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
  },
});
</script>

<style scoped></style>
