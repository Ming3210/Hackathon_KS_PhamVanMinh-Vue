<template class="template">
  <div class="app">
    <main>
      <header>
        <h2>Header</h2>
      </header>
      <div class="side-bar">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/manager-user">Manager User</router-link>
        <router-link to="/manager-product">Manager Product</router-link>
      </div>
    </main>
    <router-view></router-view>
  </div>
</template>

<script></script>

<style scoped>
header {
  width: 100vw;
  background-color: slategray;
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}

.side-bar {
  display: flex;
  flex-direction: column;
  width: 20%;
  background-color: black;
  color: white;
  text-align: center;
  height: 100vh;
  position: fixed;
  top: 50px;
  left: 0;
}

.side-bar a {
  padding: 15px;
  color: white;
  text-decoration: none;
}

.side-bar a:hover {
  background-color: gray;
}

.app {
  display: flex;
  margin-top: 50px;
  margin-left: 20%;
  width: 80%;
}

.router-link-active {
  background-color: gray;
  color: white;
}
</style>
