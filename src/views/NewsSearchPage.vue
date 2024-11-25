<template>
  <div>
    <h2>Search News</h2>
    <div class="search-bar">
      <select v-model="country">
        <option value="us">United States</option>
        <option value="in">India</option>
        <option value="gb">United Kingdom</option>
        <option value="au">Australia</option>
        <option value="ca">Canada</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
        <option value="jp">Japan</option>
        <option value="ru">Russia</option>
        <option value="cn">China</option>
        <option value="za">South Africa</option>
      </select>
      <select v-model="category">
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>
      <input v-model="keyword" type="text" placeholder="Search keyword..." />
      <div class="customBtn">
        <button @click="searchNews">Search</button>
        <button @click="resetSearch" class="reset-button">Reset</button>
      </div>
    </div>

    <div v-if="!hasSearched" class="placeholder">
      <p>Enter Keyword for better news</p>
    </div>

    <div v-if="hasSearched && news.length === 0" class="no-news">
      <p>No news found.</p>
    </div>

    <div v-else-if="news.length > 0" class="boxes">
      <NewsList :newsList="news" class="innerBox" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import NewsList from "../components/NewsList.vue";

export default {
  components: { NewsList },
  data() {
    return {
      keyword: "",
      country: "us",
      category: "general",
    };
  },
  computed: {
    ...mapState(["news", "hasSearched"]),
  },
  methods: {
    ...mapActions(["fetchNews"]),
    ...mapMutations(["SET_NEWS", "RESET_PAGE", "SET_HAS_SEARCHED"]),
    searchNews() {
      this.fetchNews({
        keyword: this.keyword,
        country: this.country,
        category: this.category,
      });
    },
    resetSearch() {
      this.keyword = "";
      this.SET_NEWS([]);
      this.RESET_PAGE();
      this.SET_HAS_SEARCHED(false);
    },
  },
};
</script>

<style>
.search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.search-bar input,
.search-bar select,
.search-bar button {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-bar button {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #45a049;
}

.no-news {
  margin-top: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: gray;
}

.placeholder {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: gray;
}

.innerBox {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 100%;
}

@media only screen and (min-width: 768px) {
  .innerBox {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 480px) {
  .innerBox {
    grid-template-columns: 1fr;
  }

  .customBtn {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .search-bar input,
  .search-bar select {
    width: 100%
  }

  .search-bar button {
    width: 48%
  }
}

.reset-button {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}

.reset-button:hover {
  background-color: #d32f2f;
}
</style>
