import { mount, Wrapper } from "@vue/test-utils";
import ProductEditForm from "@/components/ProductEditForm.vue";
import { IProductService, ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { mockRoute, mockRouter, newProductServiceMock } from "./helpers";

describe("ProductEditForm.vue", () => {
  let products: Product[];
  let productService: IProductService;
  let wrapper: Wrapper<Vue, Element>;
  let form: Wrapper<Vue, Element>;
  let codeInput: Wrapper<Vue, HTMLInputElement>;
  let nameInput: Wrapper<Vue, HTMLInputElement>;
  let priceInput: Wrapper<Vue, HTMLInputElement>;
  let submitButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    products = [new Product("1234", "name", 1000)];
    productService = newProductServiceMock(products);
    wrapper = mount(ProductEditForm, {
      provide(): ServiceInjection {
        return { productService };
      },
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
      propsData: {
        productId: products[0].code,
      },
    });
    form = wrapper.find("form");
    codeInput = wrapper.find("input[name=code]");
    nameInput = wrapper.find("input[name=name]");
    priceInput = wrapper.find("input[name=price]");
    submitButton = wrapper.find("button[type=submit]");
  });

  it("should render a form", () => {
    expect(productService.get).toHaveBeenCalledTimes(1);
    expect(productService.get).toHaveBeenCalledWith(products[0].code);
    expect(form.exists()).toBe(true);
    expect(codeInput.exists()).toBe(true);
    expect(nameInput.exists()).toBe(true);
    expect(priceInput.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
    expect(codeInput.element.value).toBe(products[0].code);
    expect(nameInput.element.value).toBe(products[0].name);
    expect(priceInput.element.value).toBe(products[0].price.toString());
  });

  it("should fail on render if get product fails", () => {
    productService.get = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_productId: string): Promise<[Error?, Product?]> => {
        return Promise.resolve([new Error("error"), undefined]);
      }
    );
    // TODO: show explicit error of form validations
    expect(productService.update).toHaveBeenCalledTimes(0);
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  it("should fail on invalid product data", () => {
    codeInput.setValue("");
    nameInput.setValue("");
    priceInput.setValue("");
    // TODO: show explicit error of form validations
    submitButton.trigger("submit");
    expect(productService.update).toHaveBeenCalledTimes(0);
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  it("should update product on valid form submit", () => {
    submitButton.trigger("submit");
    expect(productService.update).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/products");
  });
});
