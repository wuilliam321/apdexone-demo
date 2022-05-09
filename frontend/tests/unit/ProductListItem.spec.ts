import { mount, Wrapper } from "@vue/test-utils";
import ProductListItem from "@/components/ProductListItem.vue";
import { Product } from "@/lib/models";
import { mockRoute, mockRouter } from "./helpers";

describe("ProductListItem.vue", () => {
  let wrapper: Wrapper<Vue, Element>;
  let editButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    const product = new Product("1234", "Test product", 10);
    wrapper = mount(ProductListItem, {
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
      propsData: { product },
    });
    editButton = wrapper.find("button");
  });

  it("should render product list item", () => {
    expect(wrapper.exists()).toBe(true);
    expect(editButton.exists()).toBe(true);
  });
});
