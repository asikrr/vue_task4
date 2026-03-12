<template>
  <section class="orders-view-container">
    <h1>Оформленные заказы</h1>
    <router-link to="/">&lt; Назад</router-link>

    <div v-if="ordersList.length === 0">
      <p>Список заказов пуст</p>
    </div>

    <div v-else class="orders-list">
      <OrderItem
        v-for="order in ordersList"
        :key="order.id"
        :order="order"
        :products="productsList"
      />
    </div>
  </section>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';

export default {
  name: 'OrdersView',
  components: {
    OrderItem
  },
  computed: {
    ordersList() {
      return [...this.$store.getters.ordersList].reverse();
    },
    productsList() {
      return this.$store.getters.productsList;
    }
  }
}
</script>

<style scoped>
  .orders-view-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 1200px;
    margin: auto;
  }

  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>