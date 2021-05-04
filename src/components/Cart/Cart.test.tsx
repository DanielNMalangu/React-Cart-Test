import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ProductItem from "../../types/ProductItem"
import { QueryClientProvider, QueryClient } from 'react-query';
import Cart from "./Cart";


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

const dummy = () => { return };

var testItem: ProductItem = { image: "test image", description: "test description", price: 5, title: "test title", id: 1, category: "test category", quantity: 1 };

it("renders all child properties", () => {
  act(() => {
    render(<QueryClientProvider client={queryClient}>
      <Cart cartItems={[testItem]} addToCart={dummy} removeFromCart={dummy} />
    </QueryClientProvider>, container);
  });
  expect(container).toHaveTextContent(testItem.title);
  expect(container).toHaveTextContent("Total Price: R" + testItem.price);
});

it("calulates total price correctly", () => {
  let items = [testItem, testItem, testItem];
  act(() => {
    render(<QueryClientProvider client={queryClient}>
      <Cart cartItems={items} addToCart={dummy} removeFromCart={dummy} />
    </QueryClientProvider>, container);
  });

  let totalPrice = testItem.price * items.length;
  expect(container).toHaveTextContent("Total Price: R" + totalPrice);
});
