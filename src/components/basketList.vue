<template>
  <div v-if="products.length" class="mt-2 basket-container container-xxl">
    <div class="p-1">
      <div v-for="el in products" :key="el.id" class="card m-2">
        <div class="card-body">
          <div class="row row-cols-2 row-cols-lg-7 g-2 g-lg-3">
            <div class="col">
              <div class="ms-1 text-center mb-1"><img class="img-size" :src="el.image"></div>
              <div class="d-flex justify-content-center">
                <button :disabled="el.quantity === 1" class="btn btn-light me-2 mt-2 basket-list-button" @click="decreaseQuantity(el)">
                  <div class="position-absolute decrease-button">-</div>
                </button>
                <input v-model="el.quantity" type="text" class="form-control text-center basket-amount-input">
                <button class="btn btn-light ms-2 mt-2 basket-list-button" @click="increaseQuantity(el)">
                  <div class="position-absolute increase-button">+</div>
                </button>
              </div>
            </div>
            <div class="col">
              <div class="mb-5">
                {{el.name}}
              </div>
              <div class="mb-5">
                <strong>{{el.price}} TL</strong>
              </div>
              <div class="text-center">
                <span class="basket-remove" @click="removeProduct(el)">Remove</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3" >
      <button type="button" class="btn btn-light me-3" @click="$router.push({ name: 'Home' })">
        <span class="fs-6">CONTINUE SHOPPING</span>
      </button>
      <button type="button" class="btn btn-warning" @click="giveOrder">PLACE ORDER</button>
    </div>
  </div>
  <div v-else>
    Sepet Boş
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'basketList',
  data() {
    return {
      basketList: JSON.parse(localStorage.getItem('cart')),
      baseUrl: 'http://localhost:3001/ordered',
    };
  },
  computed: {
    products() {
      return (this.$store.state.cart.length && this.$store.state.cart) || JSON.parse(localStorage.getItem('cart'));
    },
  },
  methods: {
    removeProduct(product) {
      this.$store.commit('removeFromCart', product);
      this.$snotify.success('Ürün Sepetten Kaldırıldı');
    },
    decreaseQuantity(product) {
      this.$store.commit('decreaseQuantity', product);
    },
    increaseQuantity(product) {
      this.$store.commit('increaseQuantity', product);
    },
    async giveOrder() {
      const orderedProducts = [];
      const data = JSON.parse(localStorage.getItem('cart'));
      data.forEach((el) => {
        orderedProducts.push({
          id: el.id,
          quantity: el.quantity,
        });
      });
      try {
        await axios.post(this.baseUrl, orderedProducts);
        this.$snotify.success('Siparişiniz Verildi');
      } catch (e) {
        this.$snotify.error('Bir Hata Oluştu');
      }
    },
  },
};
</script>

<style lang="scss">
</style>
