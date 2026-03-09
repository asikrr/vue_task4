<template>
  <div>
    <div>
      <div v-if="!isLoggedIn">
        <router-link to="/login">Войти</router-link> | 
        <router-link to="/signup">Регистрация</router-link>
      </div>
      <div v-else>
        <button @click="logout">Выйти</button>
      </div>
    </div>

    <h1>Каталог товаров</h1>

    <div>
      <ProductCard 
        v-for="item in products" 
        :product="item"
      />
    </div>
  </div>
</template>

<script>
import { getProductsRequest } from '@/utils/api';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'HomeView',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      isLoading: true
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  async mounted() {
    try {
      this.products = await getProductsRequest();
    } 
    catch (error) {
      console.error(error);
    } 
    finally {
      this.isLoading = false;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('LOGOUT');
    }
  }
};
</script>