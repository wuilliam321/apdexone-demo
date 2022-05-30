<template>
  <div class="row">
    <div class="col">
      <table class="table stock-list">
        <thead>
          <tr>
            <td class="stock-list__header">code</td>
            <td class="stock-list__header">product code</td>
            <td class="stock-list__header">quantity</td>
            <td class="stock-list__header">actions</td>
          </tr>
        </thead>
        <tbody class="stock-item">
          <template v-for="stock in stocks">
            <StockListItem
              :key="stock.product_code"
              :stock="stock"
            ></StockListItem>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import StockListItem from "@/components/StockListItem.vue";
import { Stock } from "@/lib/models";

export default Vue.extend({
  name: "StockList",
  components: {
    StockListItem,
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
.stock-list {
  border: 1px solid #ccc;
}
.stock-list__header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}
</style>
