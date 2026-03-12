<template>
  <article class="card-container">
    <div v-if="product.image" class="card-image">
      <img :src="imageUrl" :alt="product.name"/>
    </div>
    <div class="card-info">
      <h3 class="card-title">{{ product.name }}</h3>
      <p class="card-description">{{ product.description }}</p>
      <div class="card-cart">
        <p class="card-price">{{ product.price }}₽</p>
        <button @click="addToCart">Добавить в корзину</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
  .card-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    border: 1px solid #b5ce87;
    border-radius: 10px;
    padding: 20px;
    gap: 10px;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    gap: 10px;
  }

  .card-description {
    text-align: left;
    font-size: 14px;
    color: #3b3b3b;
  }

  .card-cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover
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
export default {
  name: 'ProductCard',
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
    addToCart() {
      this.$store.dispatch('ADD_TO_CART', this.product.id);
    }
  }
};
</script>