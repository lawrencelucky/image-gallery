<template>
  <div class="search-result-container">
    <app-header></app-header>
    <app-view-result
      :imageData="imageData"
      :loading="loading"
    ></app-view-result>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './GalleryHeader';
import ViewResult from './ViewResult';
import Footer from './GalleryFooter';
import { eventBus } from '../main';

export default {
  data() {
    return {
      imageData: [],
      loading: false
    };
  },
  created() {
    eventBus.$on('searchResult', result => {
      // this.loading = true;
      //   console.log(result.hits);
      for (let i = 0; i <= result.hits.length; i++) {
        const imgUrl = result.hits[i].largeImageURL;
        const likes = result.hits[i].likes;
        const tags = result.hits[i].tags;
        const downloads = result.hits[i].downloads;
        const favorites = result.hits[i].favorites;
        const user = `${result.hits[i].user}.jpg`;
        // console.log(likes);
        this.imageData.push({
          imgUrl,
          likes,
          tags,
          downloads,
          favorites,
          user
        });
        // this.loading = false;
      }
      // console.log(this.imageData);
    });
  },
  components: {
    appHeader: Header,
    appFooter: Footer,
    appViewResult: ViewResult
  }
};
</script>

<style lang="scss">
.search-result {
  min-height: 80vh;
}
</style>
