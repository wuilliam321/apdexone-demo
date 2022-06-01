<template>
  <div>
    <TheInventoryToolbar />
    <TheErrorMessage v-if="error" :error="error" />
    <div class="input-group mb-3">
      <span class="input-group-text">Group by:</span>
      <label class="input-group-text" for="product_code">Product Code</label>
      <div class="input-group-text">
        <input
          type="radio"
          name="groupBy"
          id="product_code"
          class="form-check-input mt-0"
          v-model="group"
          value="product_code"
          @change="fetchStocks"
        />
      </div>
      <label class="input-group-text" for="category">Category</label>
      <div class="input-group-text">
        <input
          type="radio"
          name="groupBy"
          id="category"
          class="form-check-input mt-0"
          v-model="group"
          value="category"
          @change="fetchStocks"
        />
      </div>
      <label class="input-group-text" for="size">Size</label>
      <div class="input-group-text">
        <input
          type="radio"
          name="groupBy"
          id="size"
          class="form-check-input mt-0"
          v-model="group"
          value="size"
          @change="fetchStocks"
        />
      </div>
      <label class="input-group-text" for="color">Color</label>
      <div class="input-group-text">
        <input
          type="radio"
          name="groupBy"
          id="color"
          class="form-check-input mt-0"
          v-model="group"
          value="color"
          @change="fetchStocks"
        />
      </div>
    </div>
    <StockReportList :stocks="stocks" />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import StockReportList from "@/components/StockReportList.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import TheInventoryToolbar from "@/components/TheInventoryToolbar.vue";
import {
  ReportStockParams,
  ServiceInjection,
  GroupByReportStock,
} from "@/lib/interfaces";
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
      group: "product_code" as GroupByReportStock,
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
      if (this.group) {
        params.groupBy = this.group;
      }
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
