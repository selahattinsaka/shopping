<template>
  <div v-if="products.length" class="mt-2">
    <div class="p-1 basket-container">
      <div v-for="el in products" :key="el.id" class="card m-2" style="width: 33rem;">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="ms-1 text-center mb-1"><img class="img-size" :src="el.image"></div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-primary me-2 rounded-circle" @click="increaseQuantity(el)">+</button>
                <input v-model="el.quantity" type="text" class="form-control text-center" style="width: 20%">
                <button class="btn btn-primary ms-2 rounded-circle" @click="decreaseQuantity(el)">-</button>
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
      <button type="button" class="btn btn-light me-3" @click="$router.push({ name: 'Home' })">Alışverişe Devam Et</button>
      <button type="button" class="btn btn-warning">Sipariş Ver</button>
    </div>
  </div>
  <div v-else>
    Sepet Boş
  </div>
</template>

<script>
export default {
  name: 'basketList',
  data() {
    return {
      basketList: JSON.parse(localStorage.getItem('cart')),
    };
  },
  computed: {
    products() {
      return this.$store.state.cart || JSON.parse(localStorage.getItem('cart'));
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
  },
};
</script>

<style lang="scss">
</style>
