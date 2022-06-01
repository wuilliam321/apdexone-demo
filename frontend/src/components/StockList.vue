<template>
  <div class="row">
    <div class="col">
      <table class="table stock-list">
        <thead>
          <tr>
            <td class="stock-list__header">code</td>
            <td class="stock-list__header">product code</td>
            <td class="stock-list__header">quantity</td>
            <td class="stock-list__header">category</td>
            <td class="stock-list__header">size</td>
            <td class="stock-list__header">color</td>
            <td class="stock-list__header">actions</td>
          </tr>
        </thead>
        <tbody class="stock-item">
          <template v-for="record in records">
            <StockListItem
              :key="record.code + record.product_code"
              :record="record"
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
import { StockRecord } from "@/lib/models";

export default Vue.extend({
  name: "StockList",
  components: {
    StockListItem,
  },
  props: {
    records: {
      type: Array as PropType<StockRecord[]>,
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
