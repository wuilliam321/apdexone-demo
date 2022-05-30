import { mount, Wrapper } from "@vue/test-utils";
import ProductAddButton from "@/components/ProductAddButton.vue";
import { newMockRoute, newMockRouter } from "./helpers";

describe("ProductAddButton.vue", () => {
  let mockRoute: any;
  let mockRouter: any;
  let wrapper: Wrapper<Vue, Element>;
  let addButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    mockRoute = newMockRoute();
    mockRouter = newMockRouter();
    wrapper = mount(ProductAddButton, {
      mocks: {
        // $route: mockRoute,
        $router: mockRouter,
      },
    });
    addButton = wrapper.find("button");
  });

  it("should redirect to add form on click", () => {
    addButton.trigger("click");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/inventory/products/add");
  });
});
