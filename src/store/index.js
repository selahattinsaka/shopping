import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, product) {
      const item = state.cart.find((el) => el.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, product) {
      const item = state.cart.find((el) => el.id === product.id);
      if (item) {
        state.cart = state.cart.filter((e) => e.id !== product.id);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseQuantity(state, product) {
      const item = state.cart.find((el) => el.id === product.id);
      item.quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseQuantity(state, product) {
      const item = state.cart.find((el) => el.id === product.id);
      item.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  actions: {
  },
  modules: {
  },
});
