import { getByDisplayValue, getByRole } from "@testing-library/dom";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { QueryClientProvider, QueryClient } from 'react-query';
import App from './App';
import ProductItem from "./types/ProductItem"

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
    queries: {
      retry: false,
    },
  },
});

let testItem1: ProductItem = { image: "testimage", description: "test description", price: 0, title: "test title", id: 1, category: "test category", quantity: 1 };
let testItem2: ProductItem = { image: "testimage", description: "test description", price: 0, title: "test title", id: 1, category: "test category", quantity: 1 };

it("renders all child properties", () => {
  act(() => {
    render(<QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>, container);
  });

  const badge = getByRole(container, 'progressbar');
  expect(container).toContainElement(document.querySelector("svg"));
});