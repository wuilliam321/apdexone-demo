<template>
  <div>
    <form @submit.prevent="save">
      <label for="code">
        Code: <input type="text" name="code" v-model="product.code" />
      </label>
      <label for="name">
        Name: <input type="text" name="name" v-model="product.name" />
      </label>
      <label for="price">
        Price: <input type="number" name="price" v-model="product.price" />
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { Validate } from "@/lib/validations";
import Vue, { VueConstructor } from "vue";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "ProductAddForm",
  inject: ["productService"],
  data() {
    return {
      product: new Product("", "", 0),
    };
  },
  methods: {
    save() {
      const [error, isValid] = Validate.saveProduct(this.product);
      if (!isValid) {
        return [error];
      }
      this.productService.create(this.product);
      this.$router.push("/products");
    },
  },
});
</script>

<style scoped></style>
