<template>
  <nav>
    <router-link to="/inventory/products" name="inventory">
      Products
    </router-link>
    |
    <router-link to="/inventory/stock" name="inventory">
      Stock Records
    </router-link>
    |
    <router-link to="/inventory/stock/report" name="inventory">
      Stock Report
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TheInventoryNavbar",
});
</script>
