<template>
  <div class="home">
    <TheInventoryNavbar />
    ver como mover este nav var a un compontente y ahi tener el router
    <TheCatalog />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheCatalog from "@/components/TheCatalog.vue"; // @ is an alias to /src
import TheInventoryNavbar from "@/components/TheInventoryNavbar.vue";

export default Vue.extend({
  name: "ProductListView",
  components: {
    TheCatalog,
    TheInventoryNavbar,
  },
});
</script>
