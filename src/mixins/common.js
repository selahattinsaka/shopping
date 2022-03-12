export default {
  methods: {
    changeSelectedMenu(routeName) {
      this.$router.push({ name: routeName });
      localStorage.setItem('selected-navbar-menu', JSON.stringify(routeName));
      this.$store.commit('controlNavbar');
    },
  },
};
