<template>
  <div class="home">
    <TheInventoryNavbar />
    <router-view name="inventory" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheInventoryNavbar from "@/components/TheInventoryNavbar.vue";

export default Vue.extend({
  name: "InventoryView",
  components: {
    TheInventoryNavbar,
  },
});
</script>
