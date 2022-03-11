import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    navbarList: [
      { routeName: 'Home', name: 'Products', isActive: true },
      { routeName: 'Basket', name: 'My Cart', isActive: false },
    ],
  },
  mutations: {
    removeAllItems(state, payload) {
      state.cart = payload;
    },
    addToCart(state, product) {
      state.cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
      const item = state.cart.find((el) => el.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, product) {
      state.cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
      state.cart = state.cart.filter((e) => e.id !== product.id);

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseQuantity(state, product) {
      state.cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
      const item = state.cart.find((el) => el.id === product.id);
      item.quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseQuantity(state, product) {
      state.cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
      const item = state.cart.find((el) => el.id === product.id);
      item.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    controlNavbar(state) {
      const selectedMenu = JSON.parse(localStorage.getItem('selected-navbar-menu'));
      if (selectedMenu) {
        state.navbarList.forEach((el) => {
          const temp = el;
          temp.isActive = false;
        });
        const foundItem = state.navbarList.find((el) => el.routeName === selectedMenu);
        foundItem.isActive = true;
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
