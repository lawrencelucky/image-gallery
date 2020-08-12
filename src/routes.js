import Home from './components/Gallery.vue';
import SearchResult from './components/SearchResult.vue';

export const routes = [
  { path: '/search', component: SearchResult, name: 'search' },
  { path: '/', component: Home, name: 'home' }
];
