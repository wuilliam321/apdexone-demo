<template>
  <div class="row">
    <div class="offset-4 col-4">
      <form @submit.prevent="save">
        <div class="mb-3">
          <label for="code" class="form-label">Code:</label>
          <input
            type="text"
            name="code"
            v-model="stockRecordForSave.code"
            class="form-control"
            aria-describedby="codeHelp"
          />
          <div id="nameHelp" class="form-text">
            Enter a unique code for the stock record
          </div>
        </div>

        <div class="mb-3">
          <label for="product_code" class="form-label">Product code:</label>
          <input
            type="text"
            name="product_code"
            v-model="stockRecordForSave.product_code"
            class="form-control"
            aria-describedby="productCodeHelp"
          />
          <div id="productCodeHelp" class="form-text">
            Enter the product code of the stock record
          </div>
        </div>

        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity:</label>
          <input
            type="number"
            name="quantity"
            v-model="stockRecordForSave.quantity"
            class="form-control"
            aria-describedby="quantityHelp"
          />
          <div id="nameHelp" class="form-text">
            Enter the quantity of the stock record
          </div>
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary me-3">Submit</button>
          <button type="button" class="btn btn-secondary" @click="goBack">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { StockRecord } from "@/lib/models";

export default Vue.extend({
  name: "StockRecordForm",
  props: {
    stockRecord: {
      type: Object as PropType<StockRecord>,
      required: true,
    },
  },
  data() {
    return {
      stockRecordForSave: new StockRecord("", "", 0),
    };
  },
  created() {
    this.stockRecordForSave = { ...this.stockRecord };
  },
  methods: {
    save() {
      this.$emit("submit", this.stockRecordForSave);
    },
    goBack() {
      this.$emit("cancel");
    },
  },
});
</script>

<style scoped></style>
