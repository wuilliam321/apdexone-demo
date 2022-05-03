import { shallowMount } from "@vue/test-utils";
import ProductList from "@/components/ProductList.vue";
import ProductListItem from "@/components/ProductListItem.vue";
import ProductAddButton from "@/components/ProductAddButton.vue";
import { Product } from "@/lib/models";

describe("ProductList.vue", () => {
  it("should render product list", () => {
    const products = [
      new Product("1234", "Test product", 10),
      new Product("1235", "Test product 2", 10),
    ];
    const wrapper = shallowMount(ProductList, {
      propsData: { products },
    });
    expect(wrapper.findAllComponents(ProductListItem).length).toBe(2);
    expect(wrapper.findComponent(ProductAddButton).exists()).toBe(true);
    // TODO: (future) check pagination exists
    // TODO: (future) check pagination exists
  });
});
