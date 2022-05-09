import { mount, Wrapper } from "@vue/test-utils";
import ProductEditButton from "@/components/ProductEditButton.vue";
import { mockRoute, mockRouter } from "./helpers";

describe("ProductEditButton.vue", () => {
  let wrapper: Wrapper<Vue, Element>;
  let editButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    wrapper = mount(ProductEditButton, {
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
      propsData: {
        productId: "1",
      },
    });
    editButton = wrapper.find("button");
  });

  it("should redirect to edit form on click", () => {
    editButton.trigger("click");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/products/1");
  });
});
