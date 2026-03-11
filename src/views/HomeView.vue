<template>
  <div class="wrapper">
    <div>
      <div v-if="!isLoggedIn">
        <router-link to="/login">Вход</router-link> | 
        <router-link to="/signup">Регистрация</router-link>
      </div>
      <div v-else>
        <button @click="logout" class="danger-button">Выйти</button>
      </div>
    </div>

    <h1>Каталог товаров</h1>
    <div class="product-catalog">
      <ProductCard 
        v-for="item in products" 
        :product="item"
      />
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 50px;
  }
  
  .product-catalog {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 10px;
    padding: 10px 15px;
    background-color: #b5ce87;
  }

  button:hover {
    transform: scale(1.05);
    transition: 0.3s;
    background-color: #9cc54f;
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