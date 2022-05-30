<template>
  <tr class="stock-item">
    <td class="stock-item__code">
      {{ stock.code }}
    </td>
    <td class="stock-item__product_code">
      {{ stock.product_code }}
    </td>
    <td class="stock-item__quantity">
      {{ stock.quantity }}
    </td>
    <td class="stock-item__actions">
      <div class="btn-group" role="group" aria-label="Actions">
        edit/delete?
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { Stock } from "@/lib/models";
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "StockListItem",
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
.stock-item {
  border-bottom: 1px solid #ccc;
}
</style>
