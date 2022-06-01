<template>
  <tr class="stock-item">
    <td class="stock-item__code">
      {{ record.code }}
    </td>
    <td class="stock-item__product_code">
      {{ record.product_code }}
    </td>
    <td class="stock-item__quantity">
      {{ record.quantity }}
    </td>
    <td class="stock-item__category">
      {{ record.category }}
    </td>
    <td class="stock-item__size">
      {{ record.size }}
    </td>
    <td class="stock-item__color">
      {{ record.color }}
    </td>
    <td class="stock-item__actions">
      <div class="btn-group" role="group" aria-label="Actions">
        edit/delete?
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { StockRecord } from "@/lib/models";
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "StockListItem",
  components: {},
  props: {
    record: {
      type: Object as PropType<StockRecord>,
      required: true,
    },
  },
});
</script>

<style scoped>
.stock-item {
  border-bottom: 1px solid #ccc;
}
</style>
