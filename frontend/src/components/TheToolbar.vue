<template>
  <div class="row mb-3">
    <div class="col offset-10 text-end">
      <ProductAddButton />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProductAddButton from "@/components/ProductAddButton.vue";

export default Vue.extend({
  name: "TheToolbar",
  components: {
    ProductAddButton,
  },
});
</script>

<style scoped></style>
