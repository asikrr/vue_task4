<template>
  <div>
    <div v-if="product.image">
      <img :src="imageUrl" :alt="product.name" />
    </div>

    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p>{{ product.price }}₽</p>
    
    <button>В корзину</button>
  </div>
</template>

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
  }
};
</script>