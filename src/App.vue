<template>
  <div class="wrapper">
    <nav>
      <div class="nav-links">
        <router-link to="/" class="logo-link">
          <img src="./assets/logo.png" class="logo" alt="Логотип">
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
    <div v-if="notification" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

.logo {
  width: 60px;
}

.notification {
  position: fixed;
  top: 40px;
  left: 40px;
  z-index: 1;
  padding: 15px 20px;
  border-radius: 10px;
}

.notification.success {
  background-color: #dff0c8;
  color: #759933;
  border: 1px solid #b5ce87;
}

.notification.error {
  background-color: #f8d7da;
  color: #b63c3c;
  border: 1px solid #c96e6e;
}

nav {
  padding: 30px 0;
  display: flex;
  align-items: flex-end;
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

nav a.router-link-exact-active:not(.logo-link) {
  border-bottom: 3px solid #9cc54f;
  padding-bottom: 3px;
  transition: 0.2s ease;
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
    },
    notification() {
      return this.$store.getters.notification;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('LOGOUT');
      this.$router.push('/');
    }
  }
};
</script>