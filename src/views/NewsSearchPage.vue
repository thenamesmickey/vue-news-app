<template>
  <div>
    <h2 style="text-align: center">Search News</h2>
    <div class="search-bar">
     
      <select v-model="country">
        <option v-for="country in countries" :key="country.value" :value="country.value">
          {{ country.label }}
        </option>
      </select>

     
      <select v-model="category">
        <option v-for="category in categories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>

     
      <input v-model="keyword" type="text" placeholder="Search keyword..." />
      <div class="customBtn">
        <button @click="searchNews">Search</button>
        <button @click="resetSearch" class="reset-button">Reset</button>
      </div>
    </div>

    
    <div v-if="loading" class="skeleton-wrapper">
      <div v-for="n in itemsPerPage" :key="n" class="skeleton-card"></div>
    </div>
    <div v-else-if="!hasSearched" class="placeholder">
     
      <p>Enter a keyword for better news.</p>
    </div>
    <div v-else-if="hasSearched && news.length === 0" class="no-news">
      <p>No news found.</p>
    </div>
    <div v-else class="boxes">
      <NewsList :newsList="paginatedNews" class="innerBox" />
    </div>

  
    <div v-if="!loading && hasSearched && news.length > itemsPerPage" class="pagination">
      <button :disabled="currentPage === 1" @click="previousPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
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
      currentPage: 1,
      itemsPerPage: 6, 
      loading: false,
      countries: [
        { value: "us", label: "United States" },
        { value: "in", label: "India" },
        { value: "gb", label: "United Kingdom" },
        { value: "au", label: "Australia" },
        { value: "ca", label: "Canada" },
        { value: "de", label: "Germany" },
        { value: "fr", label: "France" },
        { value: "jp", label: "Japan" },
        { value: "ru", label: "Russia" },
        { value: "cn", label: "China" },
        { value: "za", label: "South Africa" },
      ],
      categories: [
        { value: "general", label: "General" },
        { value: "business", label: "Business" },
        { value: "entertainment", label: "Entertainment" },
        { value: "health", label: "Health" },
        { value: "science", label: "Science" },
        { value: "sports", label: "Sports" },
        { value: "technology", label: "Technology" },
      ],
    };
  },
  computed: {
    ...mapState(["news", "hasSearched"]),
    paginatedNews() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.news.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.news.length / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions(["fetchNews"]),
    ...mapMutations(["SET_NEWS", "RESET_PAGE", "SET_HAS_SEARCHED"]),
    async searchNews() {
      this.loading = true;
      await this.fetchNews({
        keyword: this.keyword,
        country: this.country,
        category: this.category,
      });
      this.loading = false; 
      this.currentPage = 1;
    },
    resetSearch() {
      this.keyword = "";
      this.SET_NEWS([]);
      this.RESET_PAGE();
      this.SET_HAS_SEARCHED(false);
      this.currentPage = 1; 
      this.loading = false; 
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>


<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1rem;
  color: #555;
}

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
  margin-right: 1rem;
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
.skeleton-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 100%;
}

.skeleton-card {
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f0f0f0 50%,
    #e0e0e0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  height: 200px; 
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media only screen and (max-width: 1200px) {
  .innerBox {
    grid-template-columns: repeat(2, 1fr);
  }
  .skeleton-wrapper {
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
    width: 100%;
  }

  .search-bar button {
    width: 48%;
    margin-right:0
  }
  .skeleton-wrapper {
    grid-template-columns: 1fr;
  }
}

</style>
