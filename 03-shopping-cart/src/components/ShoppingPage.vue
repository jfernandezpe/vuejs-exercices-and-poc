<template>
  <div class="shopping-page">
    <ShoppingCart
      class="shopping-cart"
      :cartProducts="cartProducts"
      v-on:removeFromCart="removeFromCart"
      v-on:buy="buy"
    />
    <ul>
      <li v-for="product in parsedProduct" :key="product.id">
        <CatalogProduct
          class="catalog-product"
          :name="product.name"
          :image="product.image"
          :price="product.price"
          :disabled="product.disabled"
          v-on:addToCart="addToCart(product.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import CatalogProduct from "./CatalogProduct.vue";
import ShoppingCart from "./ShoppingCart.vue";

export default {
  name: "ShoppingPage",
  components: { CatalogProduct, ShoppingCart },
  computed: {
    parsedProduct() {
      return this.products.map(({ id, name, image, price, disabled }) => {
        return {
          id,
          name,
          image,
          price: parseFloat(price),
          disabled: !!disabled
        };
      });
    }
  },
  methods: {
    addToCart(idToAdd) {
      //TODO: refactor and extract function
      this.products = this.products.map(product => {
        if (product.id === idToAdd) {
          return {
            ...product,
            disabled: true
          };
        }
        return product;
      });
      this.cartProducts = [
        ...this.cartProducts,
        this.parsedProduct.find(({ id }) => id === idToAdd)
      ];
    },
    removeFromCart(idToRemove) {
      this.products = this.products.map(product => {
        if (product.id === idToRemove) {
          return { ...product, disabled: false };
        }
        return product;
      });
      this.cartProducts = this.cartProducts.filter(
        ({ id }) => id !== idToRemove
      );
    },
    buy() {
      this.products = this.products.map(product => {
        return {
          ...product,
          disabled: false
        };
      });
      this.cartProducts = [];
    }
  },
  data() {
    return {
      cartProducts: [],
      products: [
        {
          id: "01",
          name: "Guitarra eléctrica",
          image: "https://picsum.photos/id/145/640/480",
          price: "1200.00"
        },
        {
          id: "02",
          name: "iPhone",
          image: "https://picsum.photos/id/160/640/480",
          price: "1800.00"
        },
        {
          id: "03",
          name: "Reloj antiguo",
          image: "https://picsum.photos/id/175/640/480",
          price: "200.00"
        },
        {
          id: "04",
          name: "Cámara Vintage",
          image: "https://picsum.photos/id/250/640/480",
          price: "950.00"
        },
        {
          id: "05",
          name: "Taza Cubana",
          image: "https://picsum.photos/id/30/640/480",
          price: "99.00"
        },
        {
          id: "06",
          name: "Amazón Kindle",
          image: "https://picsum.photos/id/367/640/480",
          price: "99.00"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.shopping-page {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .shopping-cart {
    min-width: 25%;
  }
}

ul {
  display: flex;
  flex-wrap: wrap;
}
li {
  list-style-type: none;
}
</style>
