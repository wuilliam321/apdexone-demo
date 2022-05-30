<template>
  <div class="stock-report-view">
    <TheStockReport />
  </div>
</template>

<script lang="ts">
import TheStockReport from "@/components/TheStockReport.vue";
import Vue from "vue";

export default Vue.extend({
  name: "StockReportView",
  components: {
    TheStockReport,
  },
});
</script>
