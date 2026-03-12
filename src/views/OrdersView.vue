<template>
  <section class="orders-view-container">
    <router-link to="/">&lt; Назад в каталог</router-link>
    <h1>Оформленные заказы</h1>
    <div v-if="isLoading">
      <p>Загрузка списка заказов...</p>
    </div>
    <div v-else-if="ordersList.length === 0">
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
    },
    isLoading() {
      return this.$store.getters.isLoading;
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