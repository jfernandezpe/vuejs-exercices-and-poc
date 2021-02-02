import { shallowMount } from "@vue/test-utils";
import ShoppingCart from "@/components/ShoppingCart.vue";

describe("ShoppingCart.vue", () => {
  let wrapper;
  const iPhoneId = "02";
  beforeEach(() => {
    wrapper = shallowMount(ShoppingCart, {
      propsData: {
        cartProducts: [
          {
            id: "01",
            name: "Guitarra eléctrica",
            image: "https://picsum.photos/id/145/640/480",
            price: 1200.0
          },
          {
            id: iPhoneId,
            name: "iPhone",
            image: "https://picsum.photos/id/160/640/480",
            price: 1800.0
          }
        ]
      }
    });
  });
  it("should render the layout", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should calculate the total price", () => {
    expect(wrapper.vm.totalPrice).toBe(3000);
  });
  describe("when a item remove button is clicked", () => {
    it("should trigger the event removeFromCart", () => {
      const iPhoneButton = wrapper.findAll(".removeFromCart").at(1);
      iPhoneButton.trigger("click");

      expect(wrapper.emitted().removeFromCart).toBeTruthy();
      expect(wrapper.emitted().removeFromCart[0]).toEqual([iPhoneId]);
    });
  });
  describe("when the buy button is clicked", () => {
    it("should trigger the event buy", async () => {
      wrapper.find(".buy").trigger("click");

      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().buy).toBeTruthy();
    });
  });
});
