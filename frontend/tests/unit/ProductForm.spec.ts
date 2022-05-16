import { mount, Wrapper } from "@vue/test-utils";
import ProductForm from "@/components/ProductForm.vue";
import { Product } from "@/lib/models";

describe("ProductForm.vue", () => {
  let product: Product;
  let wrapper: Wrapper<Vue, Element>;
  let form: Wrapper<Vue, Element>;
  let codeInput: Wrapper<Vue, HTMLInputElement>;
  let nameInput: Wrapper<Vue, HTMLInputElement>;
  let priceInput: Wrapper<Vue, HTMLInputElement>;
  let submitButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    product = new Product("1234", "name", 1000);
    wrapper = mount(ProductForm, {
      propsData: {
        product: product,
      },
    });
    wrapper.vm.$emit = jest.fn();
    form = wrapper.find("form");
    codeInput = wrapper.find("input[name=code]");
    nameInput = wrapper.find("input[name=name]");
    priceInput = wrapper.find("input[name=price]");
    submitButton = wrapper.find("button[type=submit]");
  });

  it("should render a form", () => {
    expect(form.exists()).toBe(true);
    expect(codeInput.exists()).toBe(true);
    expect(nameInput.exists()).toBe(true);
    expect(priceInput.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
    expect(codeInput.element.value).toBe(product.code);
    expect(nameInput.element.value).toBe(product.name);
    expect(priceInput.element.value).toBe(product.price.toString());
  });

  it("should emit a save event on submit", () => {
    submitButton.trigger("submit");
    expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$emit).toHaveBeenCalledWith("submit", product);
  });
});
