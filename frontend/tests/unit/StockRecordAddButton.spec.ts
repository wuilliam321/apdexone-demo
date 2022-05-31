import { mount, Wrapper } from "@vue/test-utils";
import StockRecordAddButton from "@/components/StockRecordAddButton.vue";
import { newMockRoute, newMockRouter } from "./helpers";

describe("StockRecordAddButton.vue", () => {
  let mockRoute: any;
  let mockRouter: any;
  let wrapper: Wrapper<Vue, Element>;
  let addButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    mockRoute = newMockRoute();
    mockRouter = newMockRouter();
    wrapper = mount(StockRecordAddButton, {
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
    expect(mockRouter.push).toHaveBeenCalledWith("/inventory/stock/add");
  });
});
