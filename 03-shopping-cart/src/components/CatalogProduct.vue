<template>
  <article class="card catalog-product">
    <h3>{{ name }}</h3>
    <img :src="image" width="300" />
    <p>{{ price }}</p>
    <button class="button" @click="addToCartButtonClicked" :disabled="disabled">
      Add to cart
    </button>
  </article>
</template>

<script>
export default {
  name: "CatalogProduct",
  props: {
    name: String,
    image: String,
    price: Number,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addToCartButtonClicked() {
      if (!this.disabled) {
        this.$emit("addToCart");
      }
    }
  }
};
</script>

<style scoped lang="scss">
article {
  display: fex;
  flex-direction: column;
}
</style>
