import { createStore } from 'vuex';
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  getProductsRequest,
  getCartRequest,
  addToCartRequest,
  removeFromCartRequest,
  createOrderRequest,
  getOrdersRequest
} from '@/utils/api';

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    cart: [],
    orders: [],
    products: [],
    isLoading: false
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    ordersList: (state) => state.orders,
    productsList: (state) => state.products,
    isLoading: (state) => state.isLoading,
    cartItems: (state) => {
      const productGroup = {};

      state.cart.forEach(item => {
        const key = item.product_id;

        if (productGroup[key]) {
          productGroup[key].quantity += 1;
          productGroup[key].cartItemIds.push(item.id);
        } 
        else {
          productGroup[key] = {
            ...item,
            quantity: 1,
            cartItemIds: [item.id]
          };
        }
      });

      const result = [];

      for (const key in productGroup) {
        result.push(productGroup[key]);
      }

      return result;
    },
    cartTotalPrice: (state, getters) => {
      let total = 0;
      
      for (const item of getters.cartItems) {
        total += item.price * item.quantity;
      }
      
      return total;
    },
  },
  mutations: {
    SET_LOADING(state, value) {
      state.isLoading = value;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    AUTH_SUCCESS: (state, { token, email }) => {
      state.token = token;
      state.userEmail = email;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
      state.userEmail = '';
      state.cart = [];
      state.orders = [];
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    async AUTH_REQUEST({ commit, dispatch }, credentials) {
      try {
        const token = await loginRequest(credentials);
        commit('AUTH_SUCCESS', { token, email: credentials.email });
        localStorage.setItem('myAppToken', token);
        await dispatch('LOAD_DATA_FROM_SERVER');
        return true;
      }
      catch (error) {
        console.error('Ошибка входа:', error);
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
        throw error;
      }
    },
    async REGISTER({ commit }, credentials) {
      try {
        await registerRequest(credentials);
        return true;
      }
      catch (error) {
        console.error('Ошибка регистрации:', error);
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
        throw error;
      }
    },
    async LOGOUT({ commit }) {
      try {
        const token = localStorage.getItem('myAppToken');
        if (token) {
          await logoutRequest(token);
        }
      }
      catch (e) {
        console.error('Ошибка при выходе:', e);
      }
      finally {
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
      }
    },
    async LOAD_DATA_FROM_SERVER({ commit, state }, showLoader = true) {
      if (!state.token) return;
      if (showLoader) {
        commit('SET_LOADING', true);
      }

      try {
        const [cartData, ordersData, productsData] = await Promise.all([
          getCartRequest(),
          getOrdersRequest(),
          getProductsRequest()
        ]);

        commit('SET_CART', cartData);
        commit('SET_ORDERS', ordersData);
        commit('SET_PRODUCTS', productsData);
      }
      catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
        commit('SET_CART', []);
        commit('SET_ORDERS', []);
        commit('SET_PRODUCTS', []);
      }
      finally {
        commit('SET_LOADING', false);
      }
    },
    INIT_STORE({ dispatch, state }) {
      if (state.token) {
        return dispatch('LOAD_DATA_FROM_SERVER');
      }
    },
    async ADD_TO_CART({ dispatch }, productId) {
      try {
        await addToCartRequest(productId);
        await dispatch('LOAD_DATA_FROM_SERVER', false);
      }
      catch (error) {
        console.error('Ошибка добавления в корзину:', error);
        alert('Не удалось добавить товар в корзину');
        throw error;
      }
    },
    async REMOVE_FROM_CART({ dispatch }, itemId) {
      try {
        await removeFromCartRequest(itemId);
        await dispatch('LOAD_DATA_FROM_SERVER', false);
      }
      catch (error) {
        console.error('Ошибка удаления из корзины:', error);
        alert('Не удалось удалить товар');
        throw error;
      }
    },
    async MAKE_ORDER({ dispatch }) {
      try {
        await createOrderRequest();
        alert('Заказ успешно оформлен!');
        await dispatch('LOAD_DATA_FROM_SERVER');
      }
      catch (error) {
        console.error('Ошибка оформления заказа:', error);
        throw error;
      }
    },
    async INCREMENT_ITEM({ dispatch }, productId) {
      try {
        await addToCartRequest(productId);
        await dispatch('LOAD_DATA_FROM_SERVER', false);
      }
      catch (error) {
        console.error('Ошибка увеличения количества товара:', error);
        alert('Не удалось увеличить количество товара');
        throw error;
      }
    },
    async DECREMENT_ITEM({ dispatch }, product) {
      try {
        if (!product.cartItemIds || !product.cartItemIds.length) return;

        const cartItemId = product.cartItemIds[0];
        await removeFromCartRequest(cartItemId);
        await dispatch('LOAD_DATA_FROM_SERVER', false);
      }
      catch (error) {
        console.error('Ошибка уменьшения количества товара:', error);
        alert('Не удалось уменьшить количество товара');
        throw error;
      }
    },
    async REMOVE_GROUP_FROM_CART({ dispatch }, product) {
      try {
        if (!product.cartItemIds || !product.cartItemIds.length) return;

        for (const cartItemId of product.cartItemIds) {
          await removeFromCartRequest(cartItemId);
        }

        await dispatch('LOAD_DATA_FROM_SERVER', false);
      }
      catch (error) {
        console.error('Ошибка полного удаления товара из корзины:', error);
        alert('Не удалось удалить товар');
        throw error;
      }
    },
  },
  modules: {}
});