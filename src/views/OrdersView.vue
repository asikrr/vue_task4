<template>
    <div>
        <h1>Оформленные заказы</h1>
        <router-link to="/">&lt Назад</router-link>
        <p v-if="ordersList.length === 0">
            Список заказов пуст
        </p>
        <div v-else>
            <div v-for="order in ordersList">
                <div v-for="item in order">
                    <img v-if="item.image" :src="getImageUrl(item.image)" :alt="item.name"/>
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.price }}₽</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrdersView',
    computed: {
        ordersList() {
            return this.$store.getters.ordersList
        }
    },
    methods: {
        getImageUrl(path) {
          return `http://lifestealer86.ru/${path}`;
        },
    }
}
</script>