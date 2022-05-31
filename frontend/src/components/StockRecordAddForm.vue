<template>
  <div>
    <StockRecordForm
      :stockRecord="stockRecordForCreate"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
    <form />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { ServiceInjection } from "@/lib/interfaces";
import { StockRecord } from "@/lib/models";
import { Validate } from "@/lib/validations";
import StockRecordForm from "./StockRecordForm.vue";

export default (Vue as VueConstructor<Vue & ServiceInjection>).extend({
  name: "StockRecordAddForm",
  inject: ["stockService"],
  components: {
    StockRecordForm,
  },
  data() {
    return {
      stockRecordForCreate: new StockRecord("", "", 0, ""),
    };
  },
  methods: {
    async handleSubmit(stockRecord: StockRecord) {
      const [error, isValid] = Validate.saveStockRecord(stockRecord);
      if (!isValid) {
        return [error];
      }
      await this.stockService?.create(stockRecord);
      this.$router.push("/inventory/stock");
    },
    handleCancel() {
      this.$router.push("/inventory/stock");
    },
  },
});
</script>

<style scoped></style>
