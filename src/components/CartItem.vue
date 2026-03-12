<template>
  <article class="card-container">
    <div v-if="product.image" class="card-image">
      <img :src="imageUrl" :alt="product.name"/>
    </div>
    <div class="card-info">
      <h3 class="card-title">{{ product.name }}</h3>
      <p class="card-price">{{ totalProductPrice }}₽</p>
      <div class="quantity-controls">
        <button @click="decrement" class="default-button" :disabled="product.quantity <= 1">-</button>
        <span>{{ product.quantity }} шт.</span>
        <button @click="increment" class="default-button">+</button>
      </div>
      <button @click="removeFromCart" class="danger-button">Удалить</button>
    </div>
  </article>
</template>

<style scoped>
  .card-container {
    display: flex;
    max-height: 200px;
    background-color: #ffffff;
    border: 1px solid #b5ce87;
    border-radius: 10px;
    padding: 20px;
    gap: 20px;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .card-title {
    color: #242424;
  }

  .card-price {
    color: #242424;
    font-weight: 600;
  }

  .card-image {
    display: flex;   
    border-radius: 10px;
    overflow: hidden;
    width: 200px; 
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; 
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>

<script>
export default {
  name: 'CartItem',
  props: {
    product: {
      type: Object,
      required: true
    },
  },
  computed: {
    imageUrl() {
      return `http://lifestealer86.ru/${this.product.image}`;
    },
    totalProductPrice() {
      return this.product.price * this.product.quantity;
    }
  },
  methods: {
    removeFromCart() {
      this.$store.dispatch('REMOVE_FROM_CART', this.product);
    },
    increment() {
      this.$store.dispatch('INCREMENT_ITEM', this.product.product_id);
    },
    decrement() {
      this.$store.dispatch('DECREMENT_ITEM', this.product);
    }
  }
};
</script>