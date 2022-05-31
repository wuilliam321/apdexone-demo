import { mount, Wrapper } from "@vue/test-utils";
import StockRecordForm from "@/components/StockRecordForm.vue";
import { StockRecord } from "@/lib/models";

describe("StockRecordForm.vue", () => {
  let stockRecord: StockRecord;
  let wrapper: Wrapper<Vue, Element>;
  let form: Wrapper<Vue, Element>;
  let codeInput: Wrapper<Vue, HTMLInputElement>;
  let productCodeInput: Wrapper<Vue, HTMLInputElement>;
  let quantityInput: Wrapper<Vue, HTMLInputElement>;
  let categoryInput: Wrapper<Vue, HTMLInputElement>;
  let sizeInput: Wrapper<Vue, HTMLInputElement>;
  let submitButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    stockRecord = new StockRecord("1234", "P1", 1000, "CAT", "L");
    wrapper = mount(StockRecordForm, {
      propsData: {
        stockRecord: stockRecord,
      },
    });
    wrapper.vm.$emit = jest.fn();
    form = wrapper.find("form");
    codeInput = wrapper.find("input[name=code]");
    productCodeInput = wrapper.find("input[name=product_code]");
    quantityInput = wrapper.find("input[name=quantity]");
    categoryInput = wrapper.find("input[name=category]");
    sizeInput = wrapper.find("input[name=size]");
    submitButton = wrapper.find("button[type=submit]");
  });

  it("should render a form", () => {
    expect(form.exists()).toBe(true);
    expect(codeInput.exists()).toBe(true);
    expect(productCodeInput.exists()).toBe(true);
    expect(quantityInput.exists()).toBe(true);
    expect(categoryInput.exists()).toBe(true);
    expect(sizeInput.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
    expect(codeInput.element.value).toBe(stockRecord.code);
    expect(productCodeInput.element.value).toBe(stockRecord.product_code);
    expect(quantityInput.element.value).toBe(stockRecord.quantity.toString());
    expect(categoryInput.element.value).toBe(stockRecord.category);
    expect(sizeInput.element.value).toBe(stockRecord.size);
  });

  it("should emit a save event on submit", () => {
    submitButton.trigger("submit");
    expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$emit).toHaveBeenCalledWith("submit", stockRecord);
  });
});
