<template>
  <div>
    <TheToolbar />
    <TheErrorMessage v-if="error" :error="error" />
    <StockList :stocks="stocks" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import StockList from "./StockList.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import { ListStockParams, ServiceInjection } from "@/lib/interfaces";
import { Stock } from "@/lib/models";
import TheToolbar from "./TheToolbar.vue";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "TheStock",
  components: {
    StockList,
    TheToolbar,
    TheErrorMessage,
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
      const params = new ListStockParams();
      const [error, response] = await this.stockService!.list(params);
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
