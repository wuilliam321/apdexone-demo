<template>
  <div class="stock-add">
    <StockRecordAddForm />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StockRecordAddForm from "@/components/StockRecordAddForm.vue";

export default Vue.extend({
  name: "StockRecordAddView",
  components: {
    StockRecordAddForm,
  },
});
</script>
