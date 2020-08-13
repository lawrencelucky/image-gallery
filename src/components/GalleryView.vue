<template>
  <div class="gallery-view-container">
    <div class="images-container">
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
    <app-loader v-if="loading === true" class="loader"></app-loader>
  </div>
</template>

<script>
import Loader from './Loader';
import axios from 'axios';

export default {
  props: ['imageData', 'loading'],
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
    }
  },
  components: {
    appLoader: Loader
  }
};
</script>

<style lang="scss">
.gallery-view-container {
  min-height: 80vh;
  padding: 3rem;
  margin-bottom: 5rem;
  margin-top: 3rem;

  @media screen and (max-width: 576px) {
    padding: 1rem;
  }

  .loader {
    position: fixed;
    z-index: 1000;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0f3443;
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
