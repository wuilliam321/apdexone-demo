import { mount, Wrapper } from "@vue/test-utils";
import ProductListItem from "@/components/ProductListItem.vue";
import ProductEditButton from "@/components/ProductEditButton.vue";
import ProductDeleteButton from "@/components/ProductDeleteButton.vue";
import { Product } from "@/lib/models";
import { IProductService, ServiceInjection } from "@/lib/interfaces";
import { newProductServiceMock } from "./helpers";

describe("ProductListItem.vue", () => {
  let products: Product[];
  let productService: IProductService;
  let wrapper: Wrapper<Vue, Element>;
  let editButton: Wrapper<Vue, Element>;
  let deleteButton: Wrapper<Vue, Element>;

  beforeEach(() => {
    const product = new Product("1234", "Test product", 10);
    products = [product];
    productService = newProductServiceMock(products);
    wrapper = mount(ProductListItem, {
      propsData: { product },
      provide(): ServiceInjection {
        return { productService };
      },
    });
    editButton = wrapper.findComponent(ProductEditButton);
    deleteButton = wrapper.findComponent(ProductDeleteButton);
  });

  it("should render product list item", () => {
    expect(wrapper.exists()).toBe(true);
    expect(editButton.exists()).toBe(true);
    expect(deleteButton.exists()).toBe(true);
  });
});
