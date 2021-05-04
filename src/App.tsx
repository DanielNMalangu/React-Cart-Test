import { useState } from 'react';
import { useQuery } from 'react-query';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Container from "@material-ui/core/Container";
import { Wrapper, StyledButton } from './App.styles';
import ProductItem from './types/ProductItem';
import ProductService from './services/ProductService';

const service = new ProductService("https://fakestoreapi.com");

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as ProductItem[]);
  const { data, isLoading, error } = useQuery<ProductItem[]>(
    'products',
    service.getAllProducts
  );

  const getTotalItems = (products: ProductItem[]) =>
    products.reduce((sum: number, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: ProductItem) => {
    setCartItems(prev => {   const isItemInCart = prev.find(item => item.id === product.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((cart, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return cart;
          return [...cart, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...cart, item];
        }
      }, [] as ProductItem[])
    );
  };


  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error. Please try again later.</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <ShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Container style={{ paddingTop: '50px', height: '600px' }} maxWidth="lg">
        <Grid container spacing={3}>
          {data?.map(item => (
            <Grid className="productContainer" item key={item.id} xs={12} sm={6} md={4}>
              <Product product={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default App;