<template>
  <section class="cart-container">
    <router-link to="/">&lt Назад в каталог</router-link>
    <h1>Корзина</h1>
    <div v-if="isLoading">
      <p>Загрузка корзины...</p>
    </div>
    <div v-else-if="$store.getters.cartItems.length === 0">
      <p>Корзина пуста</p>
    </div>
    <div v-else class="cart-items">
      <div>
        <p class="total-price">Итого: {{ cartTotalPrice }}₽</p>
        <router-link to="/orders"><button @click="makeOrder()">Оформить заказ</button></router-link>
      </div>
      <CartItem 
        v-for="item in $store.getters.cartItems"
        :key="item.product_id"
        :product="item"
      >
      </CartItem>
    </div>
  </section>
</template>

<style scoped>
  .cart-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 1200px;
    margin: auto;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cart-items > div {
    display: flex;
    align-self: flex-end;
    align-items: flex-end;
    gap: 10px;
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
import CartItem from '@/components/CartItem.vue';

export default {
  name: 'CartView',
  components: {
    CartItem
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    cartTotalPrice() {
      return this.$store.getters.cartTotalPrice;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    getImageUrl(path) {
      return `http://lifestealer86.ru/${path}`;
    },
    makeOrder() {
      this.$store.dispatch('MAKE_ORDER');
    }
  }
};
</script>