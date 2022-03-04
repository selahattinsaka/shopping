import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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

      updateLocalStorage(state.cart);
    },
  },
  actions: {
  },
  modules: {
  },
});
