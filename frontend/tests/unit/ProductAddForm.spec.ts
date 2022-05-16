import { mount, Wrapper } from "@vue/test-utils";
import ProductAddForm from "@/components/ProductAddForm.vue";
import ProductForm from "@/components/ProductForm.vue";
import { IProductService, ServiceInjection } from "@/lib/interfaces";
import { Product } from "@/lib/models";
import { newMockRoute, newMockRouter, newProductServiceMock } from "./helpers";

describe("ProductAddForm.vue", () => {
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
    wrapper = mount(ProductAddForm, {
      provide(): ServiceInjection {
        return { productService };
      },
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
      components: {
        ProductForm,
      },
      data() {
        return {
          productForCreate: product,
        };
      },
    });
    form = wrapper.find("form");
  });

  it("should render a form", () => {
    expect(form.exists()).toBe(true);
  });

  it("should fail on invalid product data", async () => {
    const priceInput = wrapper.find("input[name=price]");
    await priceInput.setValue("");
    const submitButton = wrapper.find("button[type=submit]");
    await submitButton.trigger("submit");
    expect(productService.create).toHaveBeenCalledTimes(0);
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  it("should create product on valid form submit", async () => {
    const priceInput = wrapper.find("input[name=price]");
    await priceInput.setValue("1000");
    const submitButton = wrapper.find("button[type=submit]");
    await submitButton.trigger("submit");
    expect(productService.create).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/products");
  });

  it("should return to list if cancel is pressed", async () => {
    const cancelButton = wrapper.find("button[type=button]");
    await cancelButton.trigger("click");
    expect(productService.delete).toHaveBeenCalledTimes(0);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/products");
  });
});
