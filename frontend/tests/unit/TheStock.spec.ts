import { mount, Wrapper } from "@vue/test-utils";
import TheStock from "@/components/TheStock.vue";
import StockList from "@/components/StockList.vue";
// import StockAddButton from "@/components/StockAddButton.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import {
  IStockService,
  ListStockResponse,
  // ListStockResponse,
  ServiceInjection,
} from "@/lib/interfaces";
import { StockRecord } from "@/lib/models";
import { newStockServiceMock } from "./helpers";

describe("TheStock.vue", () => {
  let records: StockRecord[];
  let stockService: IStockService;
  let wrapper: Wrapper<Vue, Element>;

  beforeEach(() => {
    records = [new StockRecord("1234", "P1", 10)];
    stockService = newStockServiceMock(records, []);
    wrapper = mount(TheStock, {
      provide(): ServiceInjection {
        return { stockService };
      },
    });
  });

  it("should render the stock", () => {
    expect(wrapper.findComponent(StockList).exists()).toBe(true);
    // expect(wrapper.findComponent(StockAddButton).exists()).toBe(true);
    expect(wrapper.findComponent(TheErrorMessage).exists()).toBe(false);
  });

  it("should fetch stocks and send them to the stock list", (done) => {
    expect(stockService.list).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(wrapper.findComponent(StockList).props().records).toEqual(records);
      done();
    });
  });

  it("should show an error when fetch stocks fails", (done) => {
    stockService.list = jest.fn((): Promise<[Error?, ListStockResponse?]> => {
      return Promise.resolve([new Error("an error")]);
    });
    const wrapper = mount(TheStock, {
      provide(): ServiceInjection {
        return { stockService };
      },
    });
    setTimeout(() => {
      const el = wrapper.findComponent(TheErrorMessage);
      expect(el.exists()).toBe(true);
      expect(el.props().error).toBeInstanceOf(Error);
      done();
    });
  });
});
