<template>
  <div class="gallery-contaner">
    <app-header></app-header>
    <app-search-gallery></app-search-gallery>
    <app-gallery-view
      :imageData="imageData"
      :loading="loading"
    ></app-gallery-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './GalleryHeader';
import SearchGallery from './SearchGallery';
import GalleryView from './GalleryView';
import Footer from './GalleryFooter';
import axios from 'axios';

export default {
  data() {
    return {
      imageData: [],
      loading: false
    };
  },
  created() {
    const key = '12550370-9bcf939b4d9fb67e7f043dfce';
    axios
      .get(
        `https://pixabay.com/api/?key=${key}&per_page=48&image_type=photo&category=backgrounds`
      )
      .then(response => {
        this.loading = true;
        // console.log(response.data.hits);
        for (let i = 0; i <= response.data.hits.length; i++) {
          const imgUrl = response.data.hits[i].largeImageURL;
          const likes = response.data.hits[i].likes;
          const tags = response.data.hits[i].tags;
          const downloads = response.data.hits[i].downloads;
          const favorites = response.data.hits[i].favorites;
          const user = `${response.data.hits[i].user}.jpg`;
          this.imageData.push({
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
  },
  components: {
    appHeader: Header,
    appSearchGallery: SearchGallery,
    appGalleryView: GalleryView,
    appFooter: Footer
  }
};
</script>

<style lang="scss" scoped></style>
