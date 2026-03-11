<template>
    <section class="orders-view-container">
        <h1>Оформленные заказы</h1>
        <router-link to="/">&lt Назад</router-link>
        
        <div v-if="ordersList.length === 0">
            <p>Список заказов пуст</p>
        </div>
        
        <div v-else class="orders-list">
            <div v-for="(order, index) in ordersList" :key="index" class="order-block">
                <h2>Заказ №{{ ordersList.length - index }} - {{ calcOrderTotal(order) }}₽</h2>
                <div class="order-items">
                    <OrderItem 
                        v-for="(item, itemIndex) in order" 
                        :key="itemIndex" 
                        :item="item" 
                    />
                </div>
            </div>
        </div>
    </section>
</template>

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
    gap: 40px;
  }

  .order-block {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .order-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>

<script>
import OrderItem from '@/components/OrderItem.vue';

export default {
    name: 'OrdersView',
    components: {
        OrderItem
    },
    computed: {
        ordersList() {
            return this.$store.getters.ordersList
        }
    },
    methods: {
        calcOrderTotal(order) {
            let sum = 0;
            for (let item of order) {
                sum += item.price * item.quantity;
            }
            return sum.toFixed(2);
        }
    }
}
</script>