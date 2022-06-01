import { shallowMount } from "@vue/test-utils";
import { StockRecord } from "@/lib/models";
import StockList from "@/components/StockList.vue";
import StockListItem from "@/components/StockListItem.vue";

describe("StockList.vue", () => {
  it("should render stock list", () => {
    const records = [
      new StockRecord("1234", "P1", 10, "CAT", "L", "red", 1.0),
      new StockRecord("1235", "P2", 10, "CAT", "L", "red", 1.0),
    ];
    const wrapper = shallowMount(StockList, {
      propsData: { records },
    });
    expect(wrapper.findAllComponents(StockListItem).length).toBe(2);
  });
});
