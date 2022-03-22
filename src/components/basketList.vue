<template>
  <div class="container-xxl mt-2">
    <div v-if="products" class="basket-container">
      <div v-for="el in products" :key="el.id" class="card">
        <div class="card-body p-4">
          <div class="row row-cols-2 row-cols-lg-7 g-2 g-lg-3">
            <div class="col-6 col-sm-4">
              <div class="mb-1"><img class="img-size" :src="el.image"></div>
              <div class="d-flex">
                <button :disabled="el.quantity === 1" class="btn btn-light me-2 mt-2 basket-list-button" @click="decreaseQuantity(el)">
                  <div class="position-absolute decrease-button">-</div>
                </button>
                <input v-model="el.quantity" type="text" class="form-control text-center basket-amount-input">
                <button class="btn btn-light ms-2 mt-2 basket-list-button" @click="increaseQuantity(el)">
                  <div class="position-absolute increase-button">+</div>
                </button>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="mb-5">
                <span class="product-font">{{el.name}}</span>
              </div>
              <div class="mb-5">
                <strong>{{el.price}} TL</strong>
              </div>
              <div class="text-center">
                <span class="basket-remove" @click="removeProduct(el)"><strong>REMOVE</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">Toplam Fiyat: {{totalAmount}}</div>
    </div>
    <div v-if="orderGiven && !product">
      <h3 class="text-center mt-4">
        Siparişiniz Oluşturuldu. Ana Sayfaya Yönlendiriliyorsunuz.
      </h3>
    </div>
    <div v-if="!(products || orderGiven)">
      <h3 class="text-center mt-4">
        Sepet Boş
      </h3>
    </div>
    <div v-if="products" class="d-flex justify-content-center mt-3" >
      <button type="button" class="btn btn-light me-3" @click="changeSelectedMenu('Home')">
        <span class="me-2">
          <fa-icon icon="angle-left" class="fa-icon basket-back-icon"/>
        </span>
        <span class="fs-6">CONTINUE SHOPPING</span>
      </button>
      <button type="button" class="btn btn-warning" @click="giveOrder">PLACE ORDER</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import routeSet from '../mixins/common';

export default {
  name: 'basketList',
  mixins: [routeSet],
  data() {
    return {
      baseUrl: 'https://nonchalant-fang.glitch.me/order',
      orderGiven: false,
    };
  },
  computed: {
    products() {
      return (this.$store.state.cart.length && this.$store.state.cart) || JSON.parse(localStorage.getItem('cart'));
    },
    totalAmount() {
      return this.products.reduce((acc, current) => {
        acc += Number(current.price); // eslint-disable-line
        return acc;
      }, 0);
    },
  },
  methods: {
    removeProduct(product) {
      if (this.products.length === 1) {
        localStorage.setItem('cart', null);
        this.$store.commit('removeAllItems', []);
        this.changeSelectedMenu('Home');
      } else {
        this.$store.commit('removeFromCart', product);
      }
      this.$snotify.success('Ürün Sepetten Kaldırıldı');
    },
    decreaseQuantity(product) {
      this.$store.commit('decreaseQuantity', product);
    },
    increaseQuantity(product) {
      this.$store.commit('increaseQuantity', product);
    },
    async giveOrder() {
      const payload = JSON.parse(localStorage.getItem('cart')).map((el) => ({ id: el.id, quantity: el.quantity }));
      try {
        await axios.post(this.baseUrl, payload);
        this.$snotify.success('Siparişiniz Verildi');
        this.orderGiven = true;
        localStorage.setItem('cart', null);
        this.$store.commit('removeAllItems', []);
        setTimeout(() => {
          this.changeSelectedMenu('Home');
          this.orderGiven = false;
        }, 2000);
      } catch (error) {
        this.$snotify.error(error.response.data.message);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
