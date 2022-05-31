<template>
  <div>
    <button
      type="button"
      role="button"
      @click="goToStockRecordAdd"
      class="btn btn-primary"
    >
      Add Stock Record
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "StockRecordAddButton",
  methods: {
    goToStockRecordAdd() {
      this.$router.push("/inventory/stock/add");
    },
  },
});
</script>

<style scoped></style>
