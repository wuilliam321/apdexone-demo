import { mount, Wrapper } from "@vue/test-utils";
import ProductAddButton from "@/components/ProductAddButton.vue";
import { mockRoute, mockRouter } from "./helpers";

describe("ProductAddButton.vue", () => {
  let wrapper: Wrapper<Vue, Element>;
  let addButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    wrapper = mount(ProductAddButton, {
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    });
    addButton = wrapper.find("button");
  });

  it("should redirect to add form on click", () => {
    addButton.trigger("click");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/products/add");
  });
});
