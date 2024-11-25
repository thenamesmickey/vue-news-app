<template>
  <div class="news-item" @click="viewDetails">
    <img v-if="news.urlToImage" :src="news.urlToImage" alt="news thumbnail" />
    <div class="news-content">
      <h3 class="news-title">{{ news.title }}</h3>
      <p class="news-author">
        <span v-if="news.author">By: {{ news.author }}</span>
        <span v-if="news.publishedAt"> | {{ formatDate(news.publishedAt) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewDetails() {
      this.$store.commit('setSelectedNews', this.news);
      this.$router.push('/detail');
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style>


.news-item img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}

.news-author {
  font-size: 0.9rem;
  color: #666;
}
</style>
