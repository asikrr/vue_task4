<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    <button @click="logout">Выйти</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    async logout() {
      await this.$store.dispatch('LOGOUT'); 
      this.$router.push('/login');
    }
  }
};
</script>