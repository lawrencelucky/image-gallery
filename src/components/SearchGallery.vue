<template>
  <div class="search-gallery-container">
    <div class="form-container">
      <p>Amazing and Stunning Images</p>
      <form action="#">
        <input
          type="text"
          class="search-input"
          placeholder="Search for images..."
          v-model.lazy="searched"
        />
        <button @click="searchImage">
          <img class="search-icon" src="../assets/search.svg" alt="" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../main';

export default {
  data() {
    return {
      searched: ''
    };
  },
  methods: {
    searchImage() {
      this.$router.push({ path: `search` });
      const key = '12550370-9bcf939b4d9fb67e7f043dfce';
      axios
        .get(
          `https://pixabay.com/api/?key=${key}&q=${this.searched}&image_type=photo&per_page=200`
        )
        .then(response => {
          const result = response.data;
          eventBus.$emit('searchResult', result);
        })
        .catch(err => err.message);
    }
  }
};
</script>

<style lang="scss">
.search-gallery-container {
  height: 90vh;
  background-image: url('./../assets/background.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  .form-container {
    p {
      font-size: 3.2rem;
      margin-bottom: 1rem;
      font-weight: 400;
      color: #eee;

      @media screen and (max-width: 576px) {
        font-size: 2rem;
      }
    }

    display: flex;
    flex-flow: column;
    justify-content: center;
    height: inherit;
    margin-left: 7rem;

    @media screen and (max-width: 576px) {
      margin-left: 2rem;
    }

    form {
      display: flex;

      .search-input {
        background-color: #fafafa;
        font-size: 1.6rem;
        padding: 1rem;
        width: 43rem;
        height: 6rem;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        font-weight: 300;
        border-right: 0;
        border: 0;
        outline: 0;

        @media screen and (max-width: 576px) {
          width: 25rem;
          height: 4rem;
        }

        &::placeholder {
          color: #bdbdbd;
          font-size: 1.4rem;
        }

        &:focus {
          outline: 0;
          border-top: 2px solid #0f3443;
          border-left: 2px solid #0f3443;
          border-bottom: 2px solid #0f3443;
        }
      }

      button {
        background-color: #0f3443;
        border: 0;
        width: 7rem;
        cursor: pointer;
        transition: all 0.3s;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;

        @media screen and (max-width: 576px) {
          width: 4rem;
        }

        &:hover {
          background-color: #15465a;
        }

        &:focus {
          border: 0;
          outline: 0;
        }

        .search-icon {
          width: 3.5rem;

          @media screen and (max-width: 576px) {
            width: 2.5rem;
          }
        }
      }
    }
  }
}
</style>
