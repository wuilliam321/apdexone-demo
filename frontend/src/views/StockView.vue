<template>
  <div class="stock-view">
    <TheStock />
  </div>
</template>

<script lang="ts">
import TheStock from "@/components/TheStock.vue";
import Vue from "vue";

export default Vue.extend({
  name: "StockView",
  components: {
    TheStock,
  },
});
</script>
