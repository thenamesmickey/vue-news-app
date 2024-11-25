<template>
  <div class="news-detail">
    <img :src="selectedNews.urlToImage" alt="news image" />
    <h1>{{ selectedNews.title }}</h1>
    <p >{{ selectedNews.content }}</p>
    <a :href="selectedNews.url" target="_blank">Read More</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['selectedNews']),
  },
};
</script>

<style>
.news-detail {
  padding: 16px;
}
.news-detail img {
  max-width: 100%;
  height: auto;
}
</style>
