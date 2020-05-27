<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <login-form></login-form>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import LoginForm from "./components/form/index"

export default {
  name: "App",
  components: {
    // HelloWorld,
    LoginForm
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
