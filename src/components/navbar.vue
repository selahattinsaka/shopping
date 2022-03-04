<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul v-for="el in navbarList" :key="el.id" class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="{ name: el.routerName}"
              :class="{'nav-link active': el.active}"
              class="me-2 text-decoration-none"
              @click="checkNavBar(el)">
              {{el.name}}
              <span v-if="el.routerName === 'Basket'">( {{($store.state.cart).length}} )</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      navbarList: [
        { name: 'Home', active: false, routerName: 'Home' },
        { name: 'Basket', active: false, routerName: 'Basket' },
      ],
    };
  },
  methods: {
    checkNavBar(selected) {
      const temp1 = selected;
      this.navbarList.forEach((el) => {
        const temp = el;
        temp.active = false;
      });
      temp1.active = true;
    },
  },

};
</script>

<style>

</style>
