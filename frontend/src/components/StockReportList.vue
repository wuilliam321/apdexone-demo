<template>
  <div class="row">
    <div class="col">
      <table class="table stock-report-list">
        <thead>
          <tr>
            <td class="stock-report-list__header">product code</td>
            <td class="stock-report-list__header">quantity</td>
          </tr>
        </thead>
        <tbody class="stock-item">
          <template v-for="stock in stocks">
            <StockReportListItem
              :key="stock.product_code"
              :stock="stock"
            ></StockReportListItem>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import StockReportListItem from "@/components/StockReportListItem.vue";
import { Stock } from "@/lib/models";

export default Vue.extend({
  name: "StockReportList",
  components: {
    StockReportListItem,
  },
  props: {
    stocks: {
      type: Array as PropType<Stock[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.stock-report-list {
  border: 1px solid #ccc;
}
.stock-report-list__header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}
</style>
