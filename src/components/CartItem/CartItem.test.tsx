import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ProductItem from "../../types/ProductItem";
import { QueryClientProvider, QueryClient } from 'react-query';
import { shallow } from 'enzyme';
import CartItem from "./CartItem";
import { getAllByRole, getByDisplayValue, getByRole, getByTestId } from "@testing-library/react";
import sinon from 'sinon';

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
    queries: { retry: false },
  },
})

const addToCartMock = jest.fn();
const removeFromCartMock = jest.fn();

const testItem: ProductItem = { image: "testimage", description: "test description", price: 0, title: "test title", id: 1, category: "test category", quantity: 1 };

it("renders all child properties", () => {
  act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartItem product={testItem} addToCart={addToCartMock} removeFromCart={removeFromCartMock} />
      </QueryClientProvider>, container);
  });
  const [minusButton, displayButton, plusButton] = getAllByRole(container, 'button');
  const displayedImage = document.querySelector("img") as HTMLImageElement;

  expect(container).toHaveTextContent("Price: R" + testItem.price);
  expect(container).toHaveTextContent(testItem.title);
  expect(displayButton).toHaveTextContent("1");
  expect(displayedImage.src).toContain(testItem.image);
});

it("calls function on minus click", () => {
  act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartItem product={testItem} addToCart={addToCartMock} removeFromCart={removeFromCartMock} />
      </QueryClientProvider>, container);
  });
  const [minusButton, displayButton, plusButton] = getAllByRole(container, 'button');
  minusButton.click();
  expect(removeFromCartMock).toHaveBeenCalledTimes(1);
});

it("calls function on plus click", () => {
  act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartItem product={testItem} addToCart={addToCartMock} removeFromCart={removeFromCartMock} />
      </QueryClientProvider>, container);
  });
  const [minusButton, displayButton, plusButton] = getAllByRole(container, 'button');
  plusButton.click();
  expect(addToCartMock).toHaveBeenCalledTimes(1);
});