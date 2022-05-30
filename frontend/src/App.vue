<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <nav>
          <router-link to="/inventory/products">Products</router-link> |
          <router-link to="/inventory/stock">Stock</router-link> |
          <router-link to="/about">About</router-link>
        </nav>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
html {
  background-color: #ecf0f1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
