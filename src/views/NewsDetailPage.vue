<template>
  <div>
    <h2>{{ selectedNews.title }}</h2>
    <img :src="selectedNews.urlToImage" alt="News Image" style="width:100%" />
    <p>{{ selectedNews.description }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NewsDetailPage",
  computed: {
    ...mapState(["selectedNews"]),
  },
};
</script>
