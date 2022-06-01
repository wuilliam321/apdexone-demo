import { mount, Wrapper, WrapperArray } from "@vue/test-utils";
import TheStockReport from "@/components/TheStockReport.vue";
import StockReportList from "@/components/StockReportList.vue";
import StockRecordAddButton from "@/components/StockRecordAddButton.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import {
  IStockService,
  ReportStockParams,
  ReportStockResponse,
  // ReportStockResponse,
  ServiceInjection,
} from "@/lib/interfaces";
import { Stock, StockRecord } from "@/lib/models";
import { newStockServiceMock } from "./helpers";

describe("TheStockReport.vue", () => {
  let records: StockRecord[];
  let stocks: Stock[];
  let stockService: IStockService;
  let wrapper: Wrapper<Vue, Element>;
  let radios: WrapperArray<Vue>;

  beforeEach(() => {
    records = [new StockRecord("1234", "P1", 10, "CAT", "L", "red", 1.0)];
    stocks = [new Stock("P1", 10, "CAT", "L", "red", 1.0)];
    stockService = newStockServiceMock(records, stocks);
    wrapper = mount(TheStockReport, {
      provide(): ServiceInjection {
        return { stockService };
      },
    });
    radios = wrapper.findAll("input[name=groupBy]");
  });

  it("should render the report", () => {
    expect(wrapper.findComponent(StockReportList).exists()).toBe(true);
    expect(wrapper.findComponent(StockRecordAddButton).exists()).toBe(true);
    expect(wrapper.findComponent(TheErrorMessage).exists()).toBe(false);
    expect(radios.length).toBe(4);
  });

  it("should fetch records and send them to the stock report", (done) => {
    expect(stockService.report).toHaveBeenCalledTimes(1);
    const params = new ReportStockParams("product_code");
    expect(stockService.report).toHaveBeenCalledWith(params)
    setTimeout(() => {
      expect(wrapper.findComponent(StockReportList).props().stocks).toEqual(
        stocks
      );
      done();
    });
  });

  it("should fetch records by category and send them to the stock report on radio change", (done) => {
    // TODO: too tightly coupled to the position
    radios.at(1).setChecked();
    expect(stockService.report).toHaveBeenCalledTimes(2);
    const params = new ReportStockParams("category");
    expect(stockService.report).toHaveBeenCalledWith(params)
    setTimeout(() => {
      expect(wrapper.findComponent(StockReportList).props().stocks).toEqual(
        stocks
      );
      done();
    });
  });

  it("should fetch records by size and send them to the stock report on radio change", (done) => {
    // TODO: too tightly coupled to the position
    radios.at(2).setChecked();
    expect(stockService.report).toHaveBeenCalledTimes(2);
    const params = new ReportStockParams("size");
    expect(stockService.report).toHaveBeenCalledWith(params)
    setTimeout(() => {
      expect(wrapper.findComponent(StockReportList).props().stocks).toEqual(
        stocks
      );
      done();
    });
  });

  it("should fetch records by color and send them to the stock report on radio change", (done) => {
    // TODO: too tightly coupled to the position
    radios.at(3).setChecked();
    expect(stockService.report).toHaveBeenCalledTimes(2);
    const params = new ReportStockParams("color");
    expect(stockService.report).toHaveBeenCalledWith(params)
    setTimeout(() => {
      expect(wrapper.findComponent(StockReportList).props().stocks).toEqual(
        stocks
      );
      done();
    });
  });

  it("should show an error when fetch report fails", (done) => {
    stockService.report = jest.fn(
      (): Promise<[Error?, ReportStockResponse?]> => {
        return Promise.resolve([new Error("an error")]);
      }
    );
    const wrapper = mount(TheStockReport, {
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
