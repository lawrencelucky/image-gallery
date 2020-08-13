<template>
  <div class="gallery-view-container search-view">
    <div class="search-icon-container">
      <img
        @click="displaySearch = !displaySearch"
        src="../assets/search.svg"
        alt=""
        class="search-icon"
      />
    </div>
    <div
      v-if="displaySearch === true"
      class="search-container small-input fixed-top d-flex justify-content-end py-3 pr-4 mt-2 mobile-search"
    >
      <form action="#">
        <input
          type="text"
          class="search-input"
          placeholder="Search for images..."
          v-model.lazy="searched"
        />
        <button @click.prevent="searchImage">
          <img class="search-icon" src="../assets/search2.svg" alt="" />
        </button>
      </form>
    </div>
    <div
      class="search-container small-input fixed-top d-flex justify-content-end py-3 pr-4 mt-2 desktop-search"
    >
      <form action="#">
        <input
          type="text"
          class="search-input"
          placeholder="Search for images..."
          v-model.lazy="searched"
        />
        <button @click.prevent="searchImage">
          <img class="search-icon" src="../assets/search2.svg" alt="" />
        </button>
      </form>
    </div>
    <div
      v-if="imageData.length > 0 && !searchedData.length > 0"
      class="images-container"
    >
      <div class="img-container" v-for="(img, index) in imageData" :key="index">
        <img class="main-image" :src="img.imgUrl" alt="" />
        <div class="image-details">
          <div class="tags">
            <p class="tag">{{ img.tags }}</p>
          </div>
          <div class="details-container">
            <div class="likes-container">
              <img
                src="../assets/heart.svg"
                alt="heart-icon"
                class="heart-icon"
              />
              <p class="likes">{{ img.likes }}</p>
            </div>
            <div class="favorite-container">
              <img
                src="../assets/star.svg"
                alt="fvorite-icon"
                class="favorite-icon"
              />
              <p class="favorites">{{ img.favorites }}</p>
            </div>
            <div
              @click="downloadImage(img.imgUrl, img.user)"
              class="downloads-container"
            >
              <img
                src="../assets/download.svg"
                alt="download-icon"
                class="download-icon"
              />
              <p class="downloads">{{ img.downloads }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="images-container">
      <div
        class="img-container"
        v-for="(img, index) in searchedData"
        :key="index"
      >
        <img class="main-image" :src="img.imgUrl" alt="" />
        <div class="image-details">
          <div class="tags">
            <p class="tag">{{ img.tags }}</p>
          </div>
          <div class="details-container">
            <div class="likes-container">
              <img
                src="../assets/heart.svg"
                alt="heart-icon"
                class="heart-icon"
              />
              <p class="likes">{{ img.likes }}</p>
            </div>
            <div class="favorite-container">
              <img
                src="../assets/star.svg"
                alt="fvorite-icon"
                class="favorite-icon"
              />
              <p class="favorites">{{ img.favorites }}</p>
            </div>
            <div
              @click="downloadImage(img.imgUrl, img.user)"
              class="downloads-container"
            >
              <img
                src="../assets/download.svg"
                alt="download-icon"
                class="download-icon"
              />
              <p class="downloads">{{ img.downloads }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!imageData.length > 0 && !searchedData.length > 0"
      class="images-container"
    >
      <div
        class="img-container"
        v-for="(img, index) in defaultData"
        :key="index"
      >
        <img class="main-image" :src="img.imgUrl" alt="" />
        <div class="image-details">
          <div class="tags">
            <p class="tag">{{ img.tags }}</p>
          </div>
          <div class="details-container">
            <div class="likes-container">
              <img
                src="../assets/heart.svg"
                alt="heart-icon"
                class="heart-icon"
              />
              <p class="likes">{{ img.likes }}</p>
            </div>
            <div class="favorite-container">
              <img
                src="../assets/star.svg"
                alt="fvorite-icon"
                class="favorite-icon"
              />
              <p class="favorites">{{ img.favorites }}</p>
            </div>
            <div
              @click="downloadImage(img.imgUrl, img.user)"
              class="downloads-container"
            >
              <img
                src="../assets/download.svg"
                alt="download-icon"
                class="download-icon"
              />
              <p class="downloads">{{ img.downloads }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['imageData'],
  data() {
    return {
      searched: '',
      defaultData: [],
      searchedData: [],
      displaySearch: false
    };
  },
  methods: {
    downloadImage(file, name) {
      axios({
        url: file,
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        let fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        fileLink.href = fileUrl;
        fileLink.setAttribute('download', name);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    searchImage() {
      this.searchedData = [];
      const key = '12550370-9bcf939b4d9fb67e7f043dfce';
      axios
        .get(
          `https://pixabay.com/api/?key=${key}&q=${this.searched}&image_type=photo&per_page=200`
        )
        .then(response => {
          const result = response.data;
          for (let i = 0; i <= result.hits.length; i++) {
            const imgUrl = result.hits[i].largeImageURL;
            const likes = result.hits[i].likes;
            const tags = result.hits[i].tags;
            const downloads = result.hits[i].downloads;
            const favorites = result.hits[i].favorites;
            const user = `${result.hits[i].user}.jpg`;
            this.searchedData.push({
              imgUrl,
              likes,
              tags,
              downloads,
              favorites,
              user
            });
          }
        })
        .catch(err => err.message);
      this.searched = '';
      this.displaySearch = false;
      window.scrollTo({
        top: 0
      });
    }
  },
  created() {
    const key = '12550370-9bcf939b4d9fb67e7f043dfce';
    axios
      .get(
        `https://pixabay.com/api/?key=${key}&per_page=200&image_type=photo&category=travel`
      )
      .then(response => {
        for (let i = 0; i <= response.data.hits.length; i++) {
          const imgUrl = response.data.hits[i].largeImageURL;
          const likes = response.data.hits[i].likes;
          const tags = response.data.hits[i].tags;
          const downloads = response.data.hits[i].downloads;
          const favorites = response.data.hits[i].favorites;
          const user = `${response.data.hits[i].user}.jpg`;
          this.defaultData.push({
            imgUrl,
            likes,
            tags,
            downloads,
            favorites,
            user
          });
          this.loading = false;
        }
      })
      .catch(err => err.message);
  }
};
</script>

<style lang="scss">
.gallery-view-container {
  min-height: 80vh;
  padding: 3rem;
  margin-bottom: 5rem;
  margin-top: 5rem;

  @media screen and (max-width: 576px) {
    padding: 1rem;
  }

  .search-icon-container {
    position: fixed;
    top: 1.5rem;
    right: 2rem;
    z-index: 1000;

    @media screen and (min-width: 576px) {
      display: none !important;
    }

    .search-icon {
      width: 3rem;
    }
  }

  .desktop-search {
    @media screen and (max-width: 576px) {
      display: none !important;
    }
  }

  .mobile-search {
    @media screen and (min-width: 576px) {
      display: none !important;
    }
  }

  .search-container {
    margin-bottom: 3rem;

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
        background-color: #34e89e;
        border: 0;
        width: 7rem;
        cursor: pointer;
        transition: all 0.3s;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;

        &:hover {
          background-color: #32ad7a;
        }

        &:focus {
          border: 0;
          outline: 0;
        }

        .search-icon {
          width: 3.5rem;
        }
      }
    }
  }

  .small-input {
    @media screen and (max-width: 576px) {
      position: fixed;
      top: 7rem;
      display: flex;
      justify-content: center !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    form {
      @media screen and (max-width: 576px) {
      }

      .search-input {
        background-color: #fafafa;
        font-size: 1.6rem;
        padding: 1rem;
        width: 32rem;
        height: 4rem;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        font-weight: 300;
        border-right: 0;
        border: 0;
        outline: 0;

        @media screen and (max-width: 576px) {
          width: 22rem;
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
        background-color: #34e89e;
        border: 0;
        width: 4rem;
        cursor: pointer;
        transition: all 0.3s;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;

        &:hover {
          background-color: #32ad7a;
        }

        &:focus {
          border: 0;
          outline: 0;
        }

        .search-icon {
          width: 2.5rem;
        }
      }
    }
  }

  .images-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 576px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .img-container {
      position: relative;

      &:hover {
        .image-details {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .main-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s;
        display: block;

        &:hover {
          cursor: pointer;
        }
      }

      .image-details {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center !important;
        height: 4rem;
        width: 100%;
        background-color: rgba(52, 232, 158, 0.8);
        opacity: 0;
        transform: translateY(120%);
        transition: all 0.5s;

        .tags {
          height: 100%;
          display: flex;
          align-items: center !important;
          margin-left: 1rem;

          p {
            font-size: 1.3rem;
            color: #0f3443;
            font-weight: 700;
            text-transform: capitalize;
            margin: 0 !important;
          }
        }

        .details-container {
          height: 100%;
          display: flex;
          align-items: center !important;
          margin-right: 1rem;

          .likes-container {
            display: flex;

            .heart-icon {
              width: 1.3rem;
              margin-right: 0.3rem;
            }

            .likes {
              color: #0f3443;
              font-size: 1.3rem;
              margin-right: 1.3rem;
              font-weight: 700;
              margin-bottom: 0;
            }
          }

          .favorite-container {
            display: flex;

            .favorite-icon {
              width: 1.3rem;
              margin-right: 0.3rem;
            }

            .favorites {
              color: #0f3443;
              font-size: 1.3rem;
              margin-right: 1.3rem;
              font-weight: 700;
              margin-bottom: 0;
            }
          }

          .downloads-container {
            display: flex;
            align-items: center;

            &:hover {
              cursor: pointer;
            }

            .download-icon {
              width: 1.3rem;
              margin-right: 0.3rem;
            }

            .downloads {
              font-size: 1.3rem;
              font-weight: 700;
              color: #0f3443;
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
