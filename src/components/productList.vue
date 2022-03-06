<template>
  <div class="container-xxl product-container">
    <div class="d-flex flex-wrap p-1">
      <div v-for="el in productsList" :key="el.id" class="card m-2 product-card" style="width: 18rem;">
        <div class="card-body">
          <div class="ms-1 text-center mb-1"><img class="img-size" :src="el.image"></div>
          <h5 class="card-title text-center">{{el.name}}</h5>
          <div class="row">
            <div class="col">
              {{el.price}} TL
            </div>
            <div class="col">
              <button class="btn btn-warning" @click="addToCart(el)">Add Basket</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductsList',
  data() {
    return {
      baseUrl: 'http://localhost:3001/productsList',
      productsList: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const r = await axios.get(this.baseUrl);
        this.productsList = r.data;
      } catch (e) {
        this.$snotify.error('Bir Hata Oluştu');
      }
    },
    async addToCart(product) {
      this.$store.commit('addToCart', product);
      this.$router.push({ name: 'Basket' });
      this.$snotify.success('Ürün Sepete Eklendi');
    },
  },
};
</script>

<style lang="scss">

</style>
