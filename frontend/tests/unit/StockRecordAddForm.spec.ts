import { mount, Wrapper } from "@vue/test-utils";
import StockRecordAddForm from "@/components/StockRecordAddForm.vue";
import StockRecordForm from "@/components/StockRecordForm.vue";
import { IStockService, ServiceInjection } from "@/lib/interfaces";
import { StockRecord } from "@/lib/models";
import { newMockRoute, newMockRouter, newStockServiceMock } from "./helpers";

describe("StockRecordAddForm.vue", () => {
  let mockRoute: any;
  let mockRouter: any;
  let stockRecord: StockRecord;
  let stockService: IStockService;
  let wrapper: Wrapper<Vue, Element>;
  let form: Wrapper<Vue, Element>;

  beforeEach(() => {
    mockRoute = newMockRoute();
    mockRouter = newMockRouter();
    stockRecord = new StockRecord("1234", "name", 1000, "CAT", "L", "red", 1.0);
    stockService = newStockServiceMock([stockRecord], []);
    wrapper = mount(StockRecordAddForm, {
      provide(): ServiceInjection {
        return { stockService };
      },
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
      components: {
        StockRecordForm,
      },
      data() {
        return {
          stockRecordForCreate: stockRecord,
        };
      },
    });
    form = wrapper.find("form");
  });

  it("should render a form", () => {
    expect(form.exists()).toBe(true);
  });

  // it("should fail on invalid product data", async () => {
  //   const priceInput = wrapper.find("input[name=price]");
  //   await priceInput.setValue("");
  //   const submitButton = wrapper.find("button[type=submit]");
  //   await submitButton.trigger("submit");
  //   expect(stockService.create).toHaveBeenCalledTimes(0);
  //   expect(mockRouter.push).toHaveBeenCalledTimes(0);
  // });

  it("should create stock record on valid form submit", async () => {
    const quantityInput = wrapper.find("input[name=quantity]");
    await quantityInput.setValue("1000");
    const submitButton = wrapper.find("button[type=submit]");
    await submitButton.trigger("submit");
    expect(stockService.create).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/inventory/stock");
  });

  // it("should return to list if cancel is pressed", async () => {
  //   const cancelButton = wrapper.find("button[type=button]");
  //   await cancelButton.trigger("click");
  //   expect(stockService.delete).toHaveBeenCalledTimes(0);
  //   expect(mockRouter.push).toHaveBeenCalledTimes(1);
  //   expect(mockRouter.push).toHaveBeenCalledWith("/inventory/products");
  // });
});
