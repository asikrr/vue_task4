<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    <div v-if="!isLoggedIn">
      <div>
        <router-link to="/login">Войти</router-link>
        <router-link to="/signup">Регистрация</router-link>
      </div>
    </div>
    <div v-else>
      <button @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('LOGOUT'); 
      this.$router.push('/login');
    }
  }
};
</script>