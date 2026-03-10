import { createStore } from 'vuex';
import { loginRequest, logoutRequest, registerRequest } from '@/utils/api';

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    cart: [],
    orders: []
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    cartItems: (state) => state.cart,
    ordersList: (state) => state.orders
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
    ADD_TO_CART: (state, product) => {
      state.cart.push(product);
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1);
    },
    CLEAR_CART: (state) => {
      state.cart = [];
    },
    MAKE_ORDER: (state) => {
      state.orders.unshift(state.cart);
      state.cart = [];
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch((error) => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject(error);
          });
      });
    },
    async REGISTER({ commit }, user) {
        try {
            const token = await registerRequest(user);
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            return true; 
        } 
        catch (error) {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            throw error; 
        }
    },
    async LOGOUT({ commit, state }) {
      try {
        return await logoutRequest(state.token);
      } 
      finally {
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
        commit('CLEAR_CART');
      }
    },
  },
  modules: {}
})