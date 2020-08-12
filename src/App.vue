<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-size: 1.6rem;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #0f3443 !important;
  color: #eeeeee;
}

body::-webkit-scrollbar {
  width: 0.5rem;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px #0f3443;
}

body::-webkit-scrollbar-thumb {
  background-color: #34e89e;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
