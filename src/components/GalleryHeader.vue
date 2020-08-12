<template>
  <div class="gallery-header-container">
    <div class="header">
      <router-link to="/">
        <h2>Image Gallery</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.gallery-header-container {
  // padding: 1rem;

  .header {
    overflow: hidden;
    background-color: #0f3443;
    position: fixed;
    top: 0;
    padding: 1.5rem;
    width: 100%;
    z-index: 100;

    h2 {
      display: inline-block;
      font-size: 2.5rem;
      text-transform: uppercase;
      background: linear-gradient(45deg, #1e6480, #34e89e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: 0.5rem;
    }
  }
}
</style>
