<template>
  <div>
    <div v-for="news in newsList" :key="news.title" class="news-item">
      <img :src="news.urlToImage" alt="Thumbnail" />
      <div class="news-cardData">
        <h3>{{ news.title }}</h3>
        <div style="display: flex; flex-direction: column;">
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
      <p class="newsitem-publish">
        Published: {{ new Date(news.publishedAt).toLocaleDateString() }}
      </p>
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
  border: 1px solid #e0e0e0;
}

.news-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
}

.news-item h3 {
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.news-cardData span {
  font-size: 14px;
  color: grey;
}

.news-item p {
  margin: 0.2rem 0;
  font-size: 14px;
  color: #555;
}

.news-cardData {
  padding: 1rem 1.5rem;
}

.newsitem-publish {
  border-top: 1px solid grey;
  padding: 0.75rem 1.5rem;
  background: #f4e8e8;
  margin-bottom: 0 !important;
}

.news-SelectButton {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  align-items: center;
}

button {
  background: #373131;
  border: none;
  padding: 0.5rem 0.75rem;
  color: #fff;
  border-radius: 5px;
}

.news-description {
  color: black !important;
  font-size: 16px !important;
}

.bookmark {
  cursor: pointer;
  background: none;
  padding: 0;

  img {
    height: 19px;
    width: 18px;
  }
}

.bookmarked {
  color: yellow;
}
</style>
