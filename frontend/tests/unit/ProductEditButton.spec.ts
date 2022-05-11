import { mount, Wrapper } from "@vue/test-utils";
import ProductEditButton from "@/components/ProductEditButton.vue";
import { newMockRoute, newMockRouter } from "./helpers";

describe("ProductEditButton.vue", () => {
  let mockRoute: any;
  let mockRouter: any;
  let wrapper: Wrapper<Vue, Element>;
  let editButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    mockRoute = newMockRoute();
    mockRouter = newMockRouter();
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
