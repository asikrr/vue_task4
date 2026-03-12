<template>
  <article class="order-card">
    <h2>Заказ №{{ order.id }}</h2>
    <p class="order-price">Сумма заказа: {{ order.order_price }}₽</p>

    <div class="order-products">
      <div
        v-for="item in groupedProducts"
        :key="item.id"
        class="order-product"
      >
        <div v-if="item.image" class="product-image">
          <img :src="imageUrl(item.image)" :alt="item.name">
        </div>

        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.price }}₽</p>
          <p>Количество: {{ item.quantity }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'OrderItem',
  props: {
    order: {
      type: Object,
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  },
  computed: {
    groupedProducts() {
      const productsMap = {};
      const groupOrderItem = {};
      const result = [];

      for (const product of this.products) {
        productsMap[product.id] = product;
      }

      for (const productId of this.order.products) {
        if (groupOrderItem[productId]) {
          groupOrderItem[productId].quantity += 1;
        } 
        else {
          groupOrderItem[productId] = {
            ...productsMap[productId],
            quantity: 1
          };
        }
      }

      for (const key in groupOrderItem) {
        result.push(groupOrderItem[key]);
      }

      return result;
    }
  },
  methods: {
    imageUrl(path) {
      return `http://lifestealer86.ru/${path}`;
    }
  }
};
</script>

<style scoped>
  .order-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .order-price {
    font-weight: 700;
    color: #242424;
  }

  .order-products {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .order-product {
    display: flex;
    gap: 20px;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #b5ce87;
    border-radius: 10px;
    padding: 20px;
  }

  .product-image {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
</style>