<template>
  <article class="order-item-container">
    <div v-if="item.image" class="item-image">
      <img :src="imageUrl" :alt="item.name"/>
    </div>
    <div class="item-info">
      <h3 class="item-title">{{ item.name }}</h3>
      <p>Цена за шт: {{ item.price }}₽</p>
      <p>Количество: {{ item.quantity }} шт.</p>
      <p class="item-total">Итого: {{ totalPrice }}₽</p>
    </div>
  </article>
</template>

<style scoped>
  .order-item-container {
    display: flex;
    max-height: 150px;
    background-color: #ffffff;
    border: 1px solid #b5ce87;
    border-radius: 10px;
    padding: 15px;
    gap: 20px;
    align-items: center;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .item-title {
    color: #242424;
    margin: 0;
  }

  .item-total {
    font-weight: 600;
    color: #242424;
  }

  .item-image {
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>

<script>
export default {
  name: 'OrderItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      return `http://lifestealer86.ru/${this.item.image}`;
    },
    totalPrice() {
      return this.item.price * this.item.quantity;
    }
  }
};
</script>