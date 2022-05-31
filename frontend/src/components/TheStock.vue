<template>
  <div>
    <TheInventoryToolbar />
    <TheErrorMessage v-if="error" :error="error" />
    <StockList :records="records" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import StockList from "@/components/StockList.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import TheInventoryToolbar from "@/components/TheInventoryToolbar.vue";
import { ListStockParams, ServiceInjection } from "@/lib/interfaces";
import { StockRecord } from "@/lib/models";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "TheStock",
  components: {
    StockList,
    TheInventoryToolbar,
    TheErrorMessage,
  },
  inject: ["stockService"],
  data() {
    return {
      records: [] as StockRecord[],
      error: undefined as Error | undefined,
    };
  },
  mounted() {
    this.fetchStockRecords();
  },
  methods: {
    async fetchStockRecords() {
      const params = new ListStockParams();
      if (!this.stockService) {
        return;
      }
      const [error, response] = await this.stockService.list(params);
      if (error) {
        this.error = error;
      }
      if (response?.records) {
        this.records = response.records;
      }
    },
  },
});
</script>

<style scoped></style>
