<template>
  <div id="app">
    <ShoppingPage />
  </div>
</template>

<script>
import ShoppingPage from "./components/ShoppingPage.vue";

export default {
  name: "App",
  components: {
    ShoppingPage
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

$textSecondary: #999;
.card {
  border: solid 1px $textSecondary;
  width: 320px;
  margin: 0.25em;
  box-shadow: 1px 1px 1px 1px $textSecondary;
}
.button {
  width: 200px;
  margin: 0.5em 0;
  height: 3em;
}
</style>
