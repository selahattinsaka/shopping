<template>
  <header>
    <nav>
      <ul v-show="!mobile" class="navigation">
        <li v-for="el in routerList" :key="el.id" @click="checkNavBar(el)">
          <router-link class="link" :class="{'clicked-link': el.isActive}" :to="{ name: el.routeName}">
            {{el.name}} {{el.routeName === 'Basket' ? productTotal ? `( ${productTotal.length} )` : '( 0 )' : ''}}
          </router-link>
        </li>
      </ul>
      <div class="icon">
        <span v-show="mobile" @click="toggleMobile">
          <fa-icon icon="bars" :class="{ 'icon-active': mobileNav}" class="fa-icon"/>
        </span>
      </div>
      <ul v-show="mobileNav" class="dropdown-nav">
        <li v-for="el in routerList" :key="el.id" @click="checkNavBar(el)">
          <router-link class="link" :class="{'clicked-link': el.isActive}" :to="{ name: el.routeName}">
            {{el.name}} {{el.routeName === 'Basket' ? productTotal ? `( ${productTotal.length} )` : '( 0 )' : ''}}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      mobile: undefined,
      mobileNav: undefined,
      windowWidth: undefined,
    };
  },
  computed: {
    productTotal() {
      return (this.$store.state.cart.length && this.$store.state.cart) || JSON.parse(localStorage.getItem('cart'));
    },
    routerList() {
      return this.$store.state.navbarList;
    },
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    if (localStorage.getItem('selected-navbar-menu')) {
      this.$store.commit('controlNavbar');
    }
  },
  methods: {
    checkNavBar(selected) {
      const selectedItem = selected;
      this.routerList.forEach((el) => {
        const temp = el;
        temp.isActive = false;
      });
      selectedItem.isActive = true;
      localStorage.setItem('selected-navbar-menu', JSON.stringify(selected.routeName));
    },
    toggleMobile() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
      } else {
        this.mobile = false;
        this.mobileNav = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  width: 100%;
  position: relative;
  transition: 0.5s ease all;
  color: #fff;
    nav {
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: .5s ease all;
    width: 90%;
    margin: 0 auto;
    @media(min-width: 1140px) {
      max-width: 1140px;
    }
      ul,
      .link {
        font-weight: 500;
        color: #fff;
        list-style: none;
        text-decoration: none;
      }
      li {
        text-transform: uppercase;
        padding: 16px;
        margin-left: 16px;
      }

      .navigation {
        display: flex;
        align-items: center;
        flex: 1;
      }
      .link {
        font-size: 14px;
        transition: .5s ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
          &:hover {
          color: #00afea;
          border-color: #00afea;
      }
      }

      .icon {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 24px;
        height: 100%;
      }
      .fa-icon {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
      }

      .icon-active {
        transform: rotate(180deg)
      }
      .dropdown-nav {
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        max-width: 250px;
        height: 100%;
        background-color: #fff;
        top: 0;
        left: 0;
        li {
          margin-left: 0;
          .link {
            color: #000;
          }
        }
      }
  }
}

</style>
