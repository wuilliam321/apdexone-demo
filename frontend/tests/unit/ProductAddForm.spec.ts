import { mount, Wrapper } from "@vue/test-utils";
import ProductAddForm from "@/components/ProductAddForm.vue";
import { IProductService, ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { mockRoute, mockRouter, newProductServiceMock } from "./helpers";

describe("ProductAddForm.vue", () => {
  let products: Product[];
  let productService: IProductService;
  let wrapper: Wrapper<Vue, Element>;
  let form: Wrapper<Vue, Element>;
  let codeInput: Wrapper<Vue, Element>;
  let nameInput: Wrapper<Vue, Element>;
  let priceInput: Wrapper<Vue, Element>;
  let submitButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    products = [new Product("1234", "name", 1000)];
    productService = newProductServiceMock(products);
    wrapper = mount(ProductAddForm, {
      provide(): ServiceInjection {
        return { productService };
      },
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    });
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
  });

  it("should fail on invalid product data", () => {
    // TODO: show explicit error of form validations
    submitButton.trigger("submit");
    expect(productService.create).toHaveBeenCalledTimes(0);
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  it("should create product on valid form submit", () => {
    codeInput.setValue("1234");
    nameInput.setValue("a product");
    priceInput.setValue("1000");
    submitButton.trigger("submit");
    expect(productService.create).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/products");
  });
});
