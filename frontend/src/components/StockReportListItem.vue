<template>
  <tr class="stock-report-item">
    <td class="stock-report-item__product_code">
      {{ stock.product_code }}
    </td>
    <td class="stock-report-item__quantity">
      {{ stock.quantity }}
    </td>
  </tr>
</template>

<script lang="ts">
import { Stock } from "@/lib/models";
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "StockReportListItem",
  components: {},
  props: {
    stock: {
      type: Object as PropType<Stock>,
      required: true,
    },
  },
});
</script>

<style scoped>
.stock-report-item {
  border-bottom: 1px solid #ccc;
}
</style>
