<template>
  <article class="card-container">
    <div v-if="product.image" class="card-image">
      <img :src="imageUrl" :alt="product.name"/>
    </div>
    <div class="card-info">
      <h3 class="card-title">{{ product.name }}</h3>
      <p class="card-price">{{ product.price }}₽</p>
      <button @click="removeFromCart(index)" class="danger-button">Удалить</button>
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
    max-width: 200px;
    max-height: 200px;
  }

  img {
    height: 100%;
    object-fit: cover;
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
export default {
  name: 'CartItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      return `http://lifestealer86.ru/${this.product.image}`;
    }
  },
  methods: {
    removeFromCart(index) {
      this.$store.commit('REMOVE_FROM_CART', index);
    }
  }
};
</script>