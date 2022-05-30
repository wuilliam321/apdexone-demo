import { shallowMount } from "@vue/test-utils";
import { Stock } from "@/lib/models";
import StockReportList from "@/components/StockReportList.vue";
import StockReportListItem from "@/components/StockReportListItem.vue";

describe("StockReportList.vue", () => {
  it("should render stock report list", () => {
    const stocks = [new Stock("P1", 10), new Stock("P2", 10)];
    const wrapper = shallowMount(StockReportList, {
      propsData: { stocks },
    });
    expect(wrapper.findAllComponents(StockReportListItem).length).toBe(2);
  });
});
