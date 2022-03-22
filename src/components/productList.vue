<template>
  <div class="container-xxl">
    <div class="product-container">
      <div class="d-flex flex-wrap p-1">
        <div v-for="el in productsList" :key="el.id" class="card m-2" style="width: 18rem;">
          <div class="card-body">
            <div class="ms-1 text-center mb-1"><img class="img-size" :src="el.image"></div>
            <p class="card-title text-center mb-3 product-font">{{el.name}}</p>
            <div class="d-flex">
              <div class="mt-2 me-auto product-font">{{el.price}} TL</div>
              <button class="btn btn-warning" @click="addToCart(el)">
                <span class="product-font">ADD BASKET</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import routerSet from '../mixins/common';

export default {
  name: 'ProductsList',
  mixins: [routerSet],
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
    addToCart(product) {
      this.$store.commit('addToCart', product);
      this.changeSelectedMenu('Basket');
      this.$snotify.success('Ürün Sepete Eklendi');
    },
  },
};
</script>

<style>

</style>
