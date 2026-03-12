<template>
  <div class="wrapper">
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
    };
  },
  async mounted() {
    try {
      this.products = await getProductsRequest();
    } 
    catch (error) {
      console.error(error);
    } 
  },
};
</script>