import { mount, Wrapper } from "@vue/test-utils";
import ProductDeleteButton from "@/components/ProductDeleteButton.vue";
import { newMockRoute, newMockRouter, newProductServiceMock } from "./helpers";
import { Product } from "@/lib/models";
import { IProductService, ServiceInjection } from "@/lib/interfaces";

describe("ProductDeleteButton.vue", () => {
  let mockRoute: any;
  let mockRouter: any;
  let product: Product;
  let wrapper: Wrapper<Vue, Element>;
  let deleteButton: Wrapper<Vue, Element>;
  let productService: IProductService;

  beforeEach(() => {
    mockRoute = newMockRoute();
    mockRouter = newMockRouter();
    product = new Product("1234", "name", 1000);
    productService = newProductServiceMock([product]);
    wrapper = mount(ProductDeleteButton, {
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
    });
    deleteButton = wrapper.find("button");
  });

  it("should delete on click", () => {
    deleteButton.trigger("click");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith(
      `/products/${product.code}/delete`
    );
    // expect(productService.delete).toHaveBeenCalledTimes(1);
    // expect(productService.delete).toHaveBeenCalledWith(product.code);
  });

  // it("should redirect to delete form on click", (done) => {
  //   deleteButton.trigger("click");
  //   setTimeout(() => {
  //     expect(mockRouter.push).toHaveBeenCalledTimes(1);
  //     expect(mockRouter.push).toHaveBeenCalledWith("/products");
  //     done();
  //   });
  // });

  // it("should fail on if error on delete", (done) => {
  //   productService.delete = jest.fn(
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     (_productId: string): Promise<[Error?, string?]> => {
  //       return Promise.resolve([new Error("error"), ""]);
  //     }
  //   );
  //   deleteButton.trigger("click");
  //   // TODO: show explicit error of form validations
  //   setTimeout(() => {
  //     expect(productService.delete).toHaveBeenCalledTimes(1);
  //     expect(mockRouter.push).toHaveBeenCalledTimes(0);
  //     done();
  //   });
  // });
});
