import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { QueryClientProvider, QueryClient } from 'react-query';
import { getAllByRole } from "@testing-library/react";
import Product from "./Product";
import ProductItem from "../../types/ProductItem";


var container: any;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {retry: false},
  },
})

const addToCartMock = jest.fn();

var testItem: ProductItem = { image: "testimage", description: "test description", price: 0, title: "test title", id: 1, category: "test category", quantity: 1 };

it("renders all child properties", () => {
  act(() => {
    render(<QueryClientProvider client={queryClient}>
      <Product product={testItem} handleAddToCart={addToCartMock} />
    </QueryClientProvider>, container);
  });
  const displayedImage = document.querySelector("img") as HTMLImageElement;

  expect(container).toHaveTextContent(testItem.title);
  expect(container).toHaveTextContent(testItem.description);
  expect(container).toHaveTextContent("R" + testItem.price);
  expect(displayedImage.src).toContain(testItem.image);
});

it("calls function on add to cart click", () => {
  act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Product product={testItem} handleAddToCart={addToCartMock} />
      </QueryClientProvider>, container);
  });

  const [AddToCart] = getAllByRole(container, 'button');
  AddToCart.click();
  expect(addToCartMock).toHaveBeenCalledTimes(1);
});