<template>
  <div id="app">
    <Notes />
  </div>
</template>

<script>
import Notes from "./components/Notes.vue";

export default {
  name: "App",
  components: {
    Notes
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
</style>
