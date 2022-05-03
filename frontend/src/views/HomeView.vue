<template>
  <div class="home">
    <TheCatalog />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheCatalog from "@/components/TheCatalog.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "HomeView",
  components: {
    TheCatalog,
  },
});
</script>
