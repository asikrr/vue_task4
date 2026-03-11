<template>
  <section class="cart-container">
    <h1>Корзина</h1>
    <router-link to="/">&lt Назад</router-link>
    <div v-if="cartItems.length === 0">
      <p>Корзина пуста</p>
    </div>
    <div v-else class="cart-items">
      <div>
        <button @click="makeOrder()">Оформить заказ</button>
      </div>
      <CartItem v-for="(item, index) in cartItems" :key="index" :product="item">
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
    align-self: flex-end;
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
    }
  },
  methods: {
    getImageUrl(path) {
      return `http://lifestealer86.ru/${path}`;
    },
    makeOrder() {
      this.$store.commit('MAKE_ORDER');
    }
  }
};
</script>