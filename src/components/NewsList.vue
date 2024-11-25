<template>
  <div>
    <div v-for="news in newsList" :key="news.title" class="news-item">
      <img :src="news.urlToImage" alt="Thumbnail" class="news-image" />
      <div class="news-cardData">
        <h3>{{ news.title }}</h3>
        <div class="news-meta">
          <span>{{ news.source.name }}</span>
          <span>{{ news.author || "Unknown" }}</span>
        </div>
        <p class="news-description">{{ news.description }}</p>
        <div class="news-SelectButton">
          <button @click="selectNews(news)">Go to page</button>
          <button class="bookmark" @click="toggleBookmark(news)">
            <img
              :src="isBookmarked(news) ? require('../assets/fill.png') : require('../assets/save.png')"
              alt="Bookmark Icon"
              class="bookmark-icon"
            />
          </button>
        </div>
      </div>
      <div class="newsitem-publish">
        <p>Published: {{ new Date(news.publishedAt).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "NewsList",
  props: {
    newsList: Array,
  },
  computed: {
    ...mapState(["bookmarks"]),
  },
  methods: {
    ...mapMutations(["SET_SELECTED_NEWS", "ADD_BOOKMARK", "REMOVE_BOOKMARK"]),
    selectNews(news) {
      this.SET_SELECTED_NEWS(news);
      this.$router.push("/detail");
    },
    toggleBookmark(news) {
      if (this.isBookmarked(news)) {
        this.REMOVE_BOOKMARK(news);
      } else {
        this.ADD_BOOKMARK(news);
      }
    },
    isBookmarked(news) {
      return this.bookmarks.some((item) => item.url === news.url);
    },
  },
};
</script>



<style>
.news-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  background: #ffffff;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.news-cardData {
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-meta {
  margin: 0.5rem 0;
  font-size: 14px;
  color: grey;
  display: flex;
  flex-direction: column;
}

.news-description {
  color: black;
  font-size: 16px;
  margin-top: 0.5rem;
  flex-grow: 1;
}

.news-SelectButton {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

button {
  background: #373131;
  border: none;
  padding: 0.5rem 0.75rem;
  color: #fff;
  border-radius: 5px;
}

.bookmark {
  cursor: pointer;
  background: none;
  padding: 0;
}

.bookmark img {
  height: 19px;
  width: 18px;
}

.newsitem-publish {
  padding: 0.75rem;
  text-align: left;
  font-size: 0.9rem;
  background-color: #f4e8e8;
  border-top: 1px solid #ddd;
}

</style>
