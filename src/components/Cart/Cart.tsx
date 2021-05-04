import CartItem from '../CartItem/CartItem';
import { CartRoot } from './Cart.styles';
import ProductItem from "../../types/ProductItem"

type Props = {
  cartItems: ProductItem[];
  addToCart: (selectedItem: ProductItem) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: ProductItem[]) =>
    items.reduce((sumTotal, item) => sumTotal + item.quantity * item.price, 0);

  return (
    <CartRoot>
      <h2>E-Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Cart is empty.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          product={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total Price: R{calculateTotal(cartItems).toFixed(2)}</h2>
    </CartRoot>
  );
};

export default Cart;
