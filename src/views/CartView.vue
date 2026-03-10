<template>
  <div>
    <h1>Корзина</h1>

    <div v-if="cartItems.length === 0">
      <p>Корзина пуста</p>
    </div>

    <div v-else>
      <div v-for="(item, index) in cartItems" :key="index">
        <img v-if="item.image" :src="getImageUrl(item.image)" :alt="item.name"/>
        <h3>{{ item.name }}</h3>
        <p>{{ item.price }}₽</p>
        <button @click="removeFromCart(index)">Удалить</button>
      </div>
      <button @click="makeOrder()">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartView',
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    }
  },
  methods: {
    removeFromCart(index) {
      this.$store.commit('REMOVE_FROM_CART', index);
    },
    getImageUrl(path) {
      return `http://lifestealer86.ru/${path}`;
    },
    makeOrder() {
      this.$store.commit('MAKE_ORDER');
    }
  }
};
</script>