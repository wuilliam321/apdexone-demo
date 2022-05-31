<template>
  <div class="row mb-3">
    <div class="col offset-10 text-end">
      <StockRecordAddButton />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StockRecordAddButton from "@/components/StockRecordAddButton.vue";

export default Vue.extend({
  name: "TheInventoryToolbar",
  components: {
    StockRecordAddButton,
  },
});
</script>

<style scoped></style>
