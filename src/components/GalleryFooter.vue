<template>
  <div class="gallery-footer-container">
    <footer class="footer">
      <div class="attributes">
        <p class="pixabay">
          This project uses the
          <a target="_blank" href="https://pixabay.com/api/docs/"
            >Pixabay API</a
          >
          to get images.
        </p>
      </div>
      <div class="vue-logo">
        <img src="../assets/logo.png" alt="vue-logo" />
      </div>
      <div class="copyright">
        <p>&copy;IMAGE GALLERY 2020</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.gallery-footer-container {
  height: 20vh;
  display: grid;

  .footer {
    margin: 0 12rem;
    border-top: 1px solid #34e89e;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;

    @media screen and (max-width: 576px) {
      margin: 0 2rem;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }

    .attributes {
      @media screen and (max-width: 576px) {
        display: grid;
        justify-content: center;
      }
      p {
        color: #1d8358;
        font-size: 1.4rem;

        a {
          color: #1d8358;
          transition: all 0.3s;

          &:hover {
            color: #34e89e;
          }
        }
      }
    }

    .vue-logo {
      display: grid;
      justify-content: center;
      img {
        width: 5rem;
      }
    }

    .copyright {
      display: grid;
      justify-content: flex-end;
      color: #1d8358;
      font-size: 1.4rem;

      @media screen and (max-width: 576px) {
        display: grid;
        justify-content: center;
      }
    }
  }
}
</style>
