<template>
  <nav>
    <router-link to="/inventory/products">Products</router-link> |
    <router-link to="/inventory/stock">Stock Records</router-link> |
    <router-link to="/inventory/stock/report">Stock Report</router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TheInventoryNavbar",
});
</script>
