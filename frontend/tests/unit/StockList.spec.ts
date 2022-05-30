import { shallowMount } from "@vue/test-utils";
import { Stock } from "@/lib/models";
import StockList from "@/components/StockList.vue";
import StockListItem from "@/components/StockListItem.vue";

describe("StockList.vue", () => {
  it("should render stock list", () => {
    const stocks = [new Stock("1234", "P1", 10), new Stock("1235", "P2", 10)];
    const wrapper = shallowMount(StockList, {
      propsData: { stocks },
    });
    expect(wrapper.findAllComponents(StockListItem).length).toBe(2);
  });
});
