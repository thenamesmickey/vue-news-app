import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    news: [],
    bookmarks: [],
    selectedNews: null,
    page: 1,
    hasSearched: false,
  },
  mutations: {
    SET_NEWS(state, news) {
      state.news = news;
    },
    SET_SELECTED_NEWS(state, news) {
      state.selectedNews = news;
    },
    RESET_PAGE(state) {
      state.page = 1;
    },
    SET_HAS_SEARCHED(state, value) {
      state.hasSearched = value;
    },
    ADD_BOOKMARK(state, article) {
      if (!state.bookmarks.some((item) => item.url === article.url)) {
        state.bookmarks.push(article); 
      }
    },
    REMOVE_BOOKMARK(state, article) {
      state.bookmarks = state.bookmarks.filter((item) => item.url !== article.url); 
    },
  },
  actions: {
    async fetchNews({ commit, state }, { keyword, country = "", category = "" }) {
   
        commit("SET_NEWS", []);
        commit("SET_HAS_SEARCHED", true);
       
    
      const apiKey = "92d593bfe4eb4e459cb66558f16475ce";
      const baseUrl = "https://newsapi.org/v2/top-headlines";
    
      // Construct the API URL with parameters
      const params = new URLSearchParams({
        q: keyword.trim(),    
        ...(country && { country }), 
        ...(category && { category }), 
        page: state.page,
        apiKey,
      });
    
      try {
        const response = await axios.get(`${baseUrl}?${params.toString()}`);
        const articles = response.data.articles || [];
    
        commit("SET_NEWS", articles);
        if (articles.length === 0) {
          console.warn("No articles found for the given search.");
        }
      } catch (error) {
        console.error("Error fetching news:", error.message);
        commit("SET_NEWS", []); 
      } finally {
        commit("SET_HAS_SEARCHED", true); 
      }
    }
    
      
  },
  
});

export default store;
