import { mount, Wrapper } from "@vue/test-utils";
import TheStockReport from "@/components/TheStockReport.vue";
import StockReportList from "@/components/StockReportList.vue";
import StockRecordAddButton from "@/components/StockRecordAddButton.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import {
  IStockService,
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

  beforeEach(() => {
    records = [new StockRecord("1234", "P1", 10)];
    stocks = [new Stock("P1", 10)];
    stockService = newStockServiceMock(records, stocks);
    wrapper = mount(TheStockReport, {
      provide(): ServiceInjection {
        return { stockService };
      },
    });
  });

  it("should render the report", () => {
    expect(wrapper.findComponent(StockReportList).exists()).toBe(true);
    expect(wrapper.findComponent(StockRecordAddButton).exists()).toBe(true);
    expect(wrapper.findComponent(TheErrorMessage).exists()).toBe(false);
  });

  it("should fetch records and send them to the stock report", (done) => {
    expect(stockService.report).toHaveBeenCalledTimes(1);
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
