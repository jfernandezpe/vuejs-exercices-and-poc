import { shallowMount } from "@vue/test-utils";
import ShoppingPage from "@/components/ShoppingPage.vue";
import CatalogProduct from "@/components/CatalogProduct.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";

describe("ShoppingPage.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ShoppingPage, {}); //TODO: shallow mount or mount?
  });
  it("shoult render the layout", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  describe("when receive addToCart event", () => {
    let child;
    beforeEach(async () => {
      child = wrapper.findAllComponents(CatalogProduct).wrappers[2];
    });
    describe("when the cart was empty", () => {
      beforeEach(async () => {
        child.vm.$emit("addToCart");
        await wrapper.vm.$nextTick();
      });
      it("should add the item to the cart products", () => {
        expect(wrapper.vm.cartProducts).toEqual([
          {
            id: "03",
            name: "Reloj antiguo",
            image: "https://picsum.photos/id/175/640/480",
            price: 200.0,
            disabled: true
          }
        ]);
      });
      it("the item should be disabled", () => {
        expect(
          wrapper.vm.parsedProduct.find(product => product.id === "03").disabled
        ).toBeTruthy();
      });
      it("should render the list", () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe("when the cart has items", () => {
      let previousProduct;
      beforeEach(async () => {
        previousProduct = {
          id: "02",
          name: "iPhone",
          image: "https://picsum.photos/id/160/640/480",
          price: 1800.0
        };
        wrapper.setData({ cartProducts: [previousProduct] });

        child.vm.$emit("addToCart");
        await wrapper.vm.$nextTick();
      });
      it("should add the item to the previous products", () => {
        expect(wrapper.vm.cartProducts).toEqual([
          previousProduct,
          {
            id: "03",
            name: "Reloj antiguo",
            image: "https://picsum.photos/id/175/640/480",
            price: 200.0,
            disabled: true
          }
        ]);
      });
      it("should render the list", () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
  describe("when receive a remove from cart event", () => {
    const iPhoneId = "02";
    beforeEach(async () => {
      const products = [
        {
          id: "01",
          name: "Guitarra eléctrica",
          image: "https://picsum.photos/id/145/640/480",
          price: "1200.00",
          disabled: false
        },
        {
          id: iPhoneId,
          name: "iPhone",
          image: "https://picsum.photos/id/160/640/480",
          price: "1800.00",
          disabled: true
        }
      ];
      wrapper.setData({ products });
      await wrapper.vm.$nextTick();

      const [, parsedIPhone] = wrapper.vm.parsedProduct;

      wrapper.setData({ cartProducts: [parsedIPhone] });
      await wrapper.vm.$nextTick();

      //Assert
      const shoppingCart = wrapper.findComponent(ShoppingCart);
      shoppingCart.vm.$emit("removeFromCart", iPhoneId);
      await wrapper.vm.$nextTick();
    });
    it("should remove the product form the cart list", () => {
      expect(wrapper.vm.cartProducts).toStrictEqual([]);
    });
    it("should enable the product", () => {
      const iPhone = wrapper.vm.products.find(
        product => product.id === iPhoneId
      );
      expect(iPhone.disabled).toBeFalsy();
    });
  });

  describe("when receive a buy event", () => {
    beforeEach(async () => {
      const products = wrapper.vm.products.map(product => {
        return { ...product, disabled: true };
      });
      wrapper.setData({ products });
      wrapper.setData({ cartProducts: wrapper.vm.parsedProduct });
      const shoppingCart = wrapper.findComponent(ShoppingCart);
      shoppingCart.vm.$emit("buy");
      await wrapper.vm.$nextTick();
    });
    it("should reset the products", () => {
      wrapper.vm.parsedProduct.forEach(product => {
        expect(product.disabled).toBeFalsy();
      });
    });
    it("should reset the cartProducts", () => {
      expect(wrapper.vm.cartProducts).toEqual([]);
    });
    it("should render the layout", () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
