<template>
  <div>
    <TheInventoryToolbar />
    <TheErrorMessage v-if="error" :error="error" />
    <StockReportList :stocks="stocks" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import StockReportList from "@/components/StockReportList.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import TheInventoryToolbar from "@/components/TheInventoryToolbar.vue";
import { ReportStockParams, ServiceInjection } from "@/lib/interfaces";
import { Stock } from "@/lib/models";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "TheStockReport",
  components: {
    StockReportList,
    TheErrorMessage,
    TheInventoryToolbar,
  },
  inject: ["stockService"],
  data() {
    return {
      stocks: [] as Stock[],
      error: undefined as Error | undefined,
    };
  },
  mounted() {
    this.fetchStocks();
  },
  methods: {
    async fetchStocks() {
      const params = new ReportStockParams();
      if (!this.stockService) {
        return;
      }
      const [error, response] = await this.stockService.report(params);
      if (error) {
        this.error = error;
      }
      if (response?.stocks) {
        this.stocks = response.stocks;
      }
    },
  },
});
</script>

<style scoped></style>
