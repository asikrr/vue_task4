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
    isLoading: false,
    notification: null
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    ordersList: (state) => state.orders,
    productsList: (state) => state.products,
    isLoading: (state) => state.isLoading,
    notification: (state) => state.notification,
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
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_NOTIFICATION(state, notification) {
      state.notification = notification;
    },
    CLEAR_NOTIFICATION(state) {
      state.notification = null;
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
      state.products = [];
      state.notification = null;
    },
  },
  actions: {
    SHOW_NOTIFICATION({ commit }, notification) {
      commit('SET_NOTIFICATION', notification);

      setTimeout(() => {
        commit('CLEAR_NOTIFICATION');
      }, 2000);
    },
    CLEAR_NOTIFICATION({ commit }) {
      commit('CLEAR_NOTIFICATION');
    },
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
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось выполнить вход'
        });
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
        throw error;
      }
    },
    async REGISTER({ commit, dispatch }, credentials) {
      try {
        await registerRequest(credentials);
        return true;
      }
      catch (error) {
        console.error('Ошибка регистрации:', error);
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось зарегистрироваться'
        });
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
        throw error;
      }
    },
    async LOGOUT({ commit, dispatch }) {
      try {
        const token = localStorage.getItem('myAppToken');
        if (token) {
          await logoutRequest(token);
        }
      }
      catch (error) {
        console.error('Ошибка при выходе:', error);
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось выполнить выход'
        });
      }
      finally {
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
      }
    },
    async LOAD_DATA_FROM_SERVER({ commit, dispatch, state }, showLoader = true) {
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
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось загрузить данные пользователя'
        });
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
        dispatch('SHOW_NOTIFICATION', {
          type: 'success',
          message: 'Товар добавлен в корзину'
        });
      }
      catch (error) {
        console.error('Ошибка добавления в корзину:', error);
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось добавить товар в корзину'
        });
        throw error;
      }
    },
    async MAKE_ORDER({ dispatch }) {
      try {
        await createOrderRequest();
        await dispatch('LOAD_DATA_FROM_SERVER');
      }
      catch (error) {
        console.error('Ошибка оформления заказа:', error);
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось оформить заказ'
        });
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
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось увеличить количество товара'
        });
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
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось уменьшить количество товара'
        });
        throw error;
      }
    },
    async REMOVE_FROM_CART({ dispatch }, product) {
      try {
        if (!product.cartItemIds || !product.cartItemIds.length) return;

        for (const cartItemId of product.cartItemIds) {
          await removeFromCartRequest(cartItemId);
        }

        await dispatch('LOAD_DATA_FROM_SERVER', false);
        dispatch('SHOW_NOTIFICATION', {
          type: 'success',
          message: 'Товар успешно удален из корзины'
        });
      }
      catch (error) {
        console.error('Ошибка полного удаления товара из корзины:', error);
        dispatch('SHOW_NOTIFICATION', {
          type: 'error',
          message: 'Не удалось удалить товар'
        });
        throw error;
      }
    },
  },
  modules: {}
});