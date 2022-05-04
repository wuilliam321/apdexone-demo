import { shallowMount, Wrapper } from "@vue/test-utils";
import TheCatalog from "@/components/TheCatalog.vue";
import ProductList from "@/components/ProductList.vue";
import TheErrorMessage from "@/components/TheErrorMessage.vue";
import {
  IProductService,
  ListProductParams,
  ListProductResponse,
  ServiceInjection,
} from "@/lib/interfaces";
import { Product } from "@/lib/models";

const products = [new Product("1234", "name", 1000)];

describe("TheCatalog.vue", () => {
  let productService: IProductService;
  let wrapper: Wrapper<Vue, Element>;

  beforeEach(() => {
    const productServiceMock: IProductService = {
      list: jest.fn((): Promise<[Error?, ListProductResponse?]> => {
        return Promise.resolve([, { products: products }]);
      }),
      create: jest.fn((_product: Product): Promise<[Error?, string?]> => {
        return Promise.resolve([,]);
      }),
    };
    productService = productServiceMock;
    wrapper = shallowMount(TheCatalog, {
      provide(): ServiceInjection {
        return { productService };
      },
    });
  });

  it("should render the catalog", () => {
    expect(wrapper.findAllComponents(ProductList).length).toBe(1);
    expect(wrapper.findComponent(TheErrorMessage).exists()).toBe(false);
  });

  it("should fetch products and send them to the product list", (done) => {
    expect(productService.list).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(wrapper.findComponent(ProductList).props().products).toEqual(
        products
      );
      done();
    });
  });

  it("should show an error when fetch products fails", (done) => {
    productService.list = jest.fn(
      (): Promise<[Error?, ListProductResponse?]> => {
        return Promise.resolve([new Error("an error")]);
      }
    );
    const wrapper = shallowMount(TheCatalog, {
      provide(): ServiceInjection {
        return { productService };
      },
    });
    setTimeout(() => {
      const el = wrapper.findComponent(TheErrorMessage);
      expect(el.exists()).toBe(true);
      expect(el.props().error).toBeInstanceOf(Error);
      done();
    });
  });
});
