import { shallowMount } from "@vue/test-utils";
import CatalogProduct from "@/components/CatalogProduct.vue";

describe("CatalogProduct.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CatalogProduct, {
      propsData: {
        name: "Awesome phone",
        image: "http://cdn.local/awesome-phone.jpg",
        price: 299.95
      }
    });
  });
  it("should render the layout", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  describe("when the add to cart button is clicked", () => {
    it("it should dispatch the add to cart event", async () => {
      wrapper.find("button").trigger("click");

      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().addToCart).toBeTruthy();
    });
    describe("when the product is disabled", () => {
      it("should not dispatch add to cart event", async () => {
        wrapper.setProps({ disabled: true });
        wrapper.find("button").trigger("click");

        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().addToCart).toBeFalsy();
      });
    });
  });
});
