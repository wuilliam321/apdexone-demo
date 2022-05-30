import { mount, Wrapper } from "@vue/test-utils";
import StockListItem from "@/components/StockListItem.vue";
import { Stock } from "@/lib/models";
import { IStockService, ServiceInjection } from "@/lib/interfaces";
import { newStockServiceMock } from "./helpers";

describe("StockListItem.vue", () => {
  let stocks: Stock[];
  let stockService: IStockService;
  let wrapper: Wrapper<Vue, Element>;
  // let editButton: Wrapper<Vue, Element>;
  // let deleteButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    const stock = new Stock("1234", "P1", 10);
    stocks = [stock];
    stockService = newStockServiceMock(stocks);
    wrapper = mount(StockListItem, {
      propsData: { stock },
      provide(): ServiceInjection {
        return { stockService };
      },
    });
    // editButton = wrapper.findComponent(StockEditButton);
    // deleteButton = wrapper.findComponent(StockDeleteButton);
  });

  it("should render stock list item", () => {
    expect(wrapper.exists()).toBe(true);
    // expect(editButton.exists()).toBe(true);
    // expect(deleteButton.exists()).toBe(true);
  });
});
