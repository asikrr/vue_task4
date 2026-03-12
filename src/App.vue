<template>
  <div class="wrapper">
    <nav>
      <div class="nav-links">
        <router-link to="/" class="logo-link">
          <img src="./assets/free-icon-groceries-135763.png" class="logo">
        </router-link>
        <router-link to="/">Главная</router-link> 
        <router-link v-if="isAuthenticated" to="/cart">Корзина</router-link>
        <router-link v-if="isAuthenticated" to="/orders">Оформленные заказы</router-link>
      </div>
      <div class="nav-auth">
        <div v-if="!isLoggedIn">
          <router-link to="/login">Вход</router-link>
          <router-link to="/signup">Регистрация</router-link>
        </div>
        <div v-else>
          <button @click="logout" class="danger-button">Выйти</button>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  max-width: 1920px;
  margin: auto;
  background-color: #f7f0eb;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

.logo {
  width: 60px;
}

nav {
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
}

.nav-links {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.nav-auth > div {
  display: flex;
  gap: 20px;
}

a {
  font-weight: bold;
  text-decoration: none;
  color: #3b3b3b;;
}

a:hover:not(.router-link-exact-active) {
  color: #9cc54f;
}

nav a.router-link-exact-active:not(.logo-link) {
  border-bottom: 3px solid #9cc54f;
  padding-bottom: 3px;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
}

button:hover {
  transform: scale(1.05);
  transition: 0.3s;
}

.danger-button {
  background-color: #c96e6e;
}

.danger-button:hover {
  background-color: #b63c3c;
  color: #fff;
}
</style>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('LOGOUT');
    }
  }
};
</script>