<template>
    <div>
      <h1>Your Bookmarks</h1>
      <div v-if="bookmarks.length === 0">No bookmarks added yet.</div>
      <NewsList :newsList="bookmarks" class="innerBox" />
    </div>
  </template>
  
  <script>
  import NewsList from "@/components/NewsList.vue";
  import { mapState } from "vuex";
  
  export default {
    name: "BookmarksPage",
    components: {
      NewsList,
    },
    computed: {
      ...mapState(["bookmarks"]),
    },
  };
  </script>
  

<style>
.remove-bookmark {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.innerBox {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 100%;
}

@media only screen and (max-width: 1200px) {
  .innerBox {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 480px) {
  .innerBox {
    grid-template-columns: 1fr;
  }
}

</style>