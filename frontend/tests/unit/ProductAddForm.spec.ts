import { mount, Wrapper } from "@vue/test-utils";
import ProductAddForm from "@/components/ProductAddForm.vue";
import { IProductService, ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { newMockRoute, newMockRouter, newProductServiceMock } from "./helpers";

describe("ProductAddForm.vue", () => {
  let mockRoute: any;
  let mockRouter: any;
  let products: Product[];
  let productService: IProductService;
  let wrapper: Wrapper<Vue, Element>;
  let form: Wrapper<Vue, Element>;
  let codeInput: Wrapper<Vue, Element>;
  let nameInput: Wrapper<Vue, Element>;
  let priceInput: Wrapper<Vue, Element>;
  let submitButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    mockRoute = newMockRoute();
    mockRouter = newMockRouter();
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
    codeInput.setValue("1234");
    nameInput.setValue("a product");
    priceInput.setValue("1000");
  });

  it("should render a form", () => {
    expect(form.exists()).toBe(true);
    expect(codeInput.exists()).toBe(true);
    expect(nameInput.exists()).toBe(true);
    expect(priceInput.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
  });

  it("should create product on valid form submit", (done) => {
    submitButton.trigger("submit");
    setTimeout(() => {
      expect(productService.create).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledWith("/products");
      done();
    });
  });

  it("should fail on invalid product data", () => {
    // TODO: show explicit error of form validations
    codeInput.setValue("");
    submitButton.trigger("submit");
    expect(productService.create).toHaveBeenCalledTimes(0);
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  it("should fail on invalid product data", (done) => {
    productService.create = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_product: Product): Promise<[Error?, string?]> => {
        return Promise.resolve([new Error("error"), ""]);
      }
    );
    // TODO: show explicit error of form validations
    submitButton.trigger("submit");
    setTimeout(() => {
      expect(productService.create).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledTimes(0);
      done();
    });
  });
});
