<template>
  <div id="app">
    <header>
      <h1>News App</h1>
      <nav>
        <router-link to="/" exact-active-class="active-tab">News</router-link>
        <router-link to="/bookmarks" exact-active-class="active-tab">Bookmarks</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2024 News App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  text-align: center;
}

nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

nav a:hover {
  background-color: #45a049;
}

nav .active-tab {
  background-color: white;
  color: #4caf50;
  font-weight: bold;
  pointer-events: none; /* Prevent hover effects */
}

main {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

footer {
  background-color: #f1f1f1;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.9rem;
}
</style>
