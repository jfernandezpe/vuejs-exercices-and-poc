<template>
  <article>
    <ul>
      <li v-for="product in cartProducts" :key="product.id">
        {{ product.name }} {{ product.price }}
        <button class="removeFromCart" @click="removeFromCart(product.id)">
          Remove
        </button>
      </li>
    </ul>
    <p>Total price: {{ totalPrice }}</p>
    <button class="buy" @click="buy">Buy</button>
  </article>
</template>

<script>
export default {
  name: "ShoppingCart",
  props: {
    cartProducts: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    totalPrice() {
      return this.cartProducts.reduce((total, { price }) => {
        return total + price;
      }, 0);
    }
  },
  methods: {
    removeFromCart(idToRemove) {
      this.$emit("removeFromCart", idToRemove);
    },
    buy() {
      this.$emit("buy");
    }
  }
};
</script>

<style lang="sass" scoped></style>
