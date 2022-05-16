import { mount, Wrapper } from "@vue/test-utils";
import ProductEditForm from "@/components/ProductEditForm.vue";
import { IProductService, ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { newMockRoute, newMockRouter, newProductServiceMock } from "./helpers";

describe("ProductEditForm.vue", () => {
  let mockRoute: any;
  let mockRouter: any;
  let product: Product;
  let productService: IProductService;
  let wrapper: Wrapper<Vue, Element>;
  let form: Wrapper<Vue, Element>;

  beforeEach(() => {
    mockRoute = newMockRoute();
    mockRouter = newMockRouter();
    product = new Product("1234", "name", 1000);
    productService = newProductServiceMock([product]);
    wrapper = mount(ProductEditForm, {
      provide(): ServiceInjection {
        return { productService };
      },
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
      propsData: {
        productId: product.code,
      },
      components: {
        ProductEditForm,
      },
    });
    form = wrapper.findComponent(ProductEditForm);
  });

  it("should render a form", () => {
    expect(productService.get).toHaveBeenCalledTimes(1);
    expect(productService.get).toHaveBeenCalledWith(product.code);
    expect(form.exists()).toBe(true);
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

  it("should fail on invalid product data", async () => {
    const priceInput = wrapper.find("input[name=price]");
    await priceInput.setValue("");
    const submitButton = form.find("button[type=submit]");
    submitButton.trigger("submit");
    expect(productService.update).toHaveBeenCalledTimes(0);
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  it("should update product on valid form submit", (done) => {
    const submitButton = form.find("button[type=submit]");
    submitButton.trigger("submit");
    setTimeout(() => {
      expect(productService.update).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledWith("/products");
      done();
    });
  });
});
