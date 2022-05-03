import { shallowMount } from "@vue/test-utils";
import TheCatalog from "@/components/TheCatalog.vue";
import ProductList from "@/components/ProductList.vue";
import {
  IProductService,
  ListProductParams,
  ListProductResponse,
  ServiceInjection,
} from "@/lib/interfaces";
import { Product } from "@/lib/models";

const productServiceMock: IProductService = {
  list: jest.fn(
    (_params: ListProductParams): Promise<[Error?, ListProductResponse?]> => {
      return Promise.resolve([,]);
    }
  ),
  create: jest.fn((_product: Product): Promise<[Error?, string?]> => {
    return Promise.resolve([,]);
  }),
};

describe("TheCatalog.vue", () => {
  let productService: IProductService;

  beforeEach(() => {
    productService = productServiceMock;
  });

  it("should render the catalog", async () => {
    const wrapper = shallowMount(TheCatalog, {
      provide(): ServiceInjection {
        return { productService };
      },
    });
    expect(wrapper.findAllComponents(ProductList).length).toBe(1);
    expect(productService.list).toHaveBeenCalledTimes(1);
  });
});
