import Button from '@material-ui/core/Button';
import ProductItem from "../../types/ProductItem"
import { Wrapper } from './CartItem.styles';
import Container from "@material-ui/core/Container";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';

type Props = {
  product: ProductItem;
  addToCart: (selectedProduct: ProductItem) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ product, addToCart, removeFromCart }) => (
  <Wrapper>
    <Container>
      <Grid item xs={12}>
        <h3>{product.title}</h3>
      </Grid>
      <Grid item xs={12}>
        <img src={product.image} alt={product.title} />
      </Grid>
    </Container>
    <br />
    <Grid container direction="column" className='buttons'>
      <Grid container alignItems="center" justify="center" direction="row">
        <Grid item xs={4} md={4}>
          <Button size='small' onClick={() => removeFromCart(product.id)}>
            <RemoveIcon />
          </Button>
        </Grid>
        <Grid item xs={4} md={4}>
          <Button size='small' disabled>{product.quantity}</Button>
        </Grid>
        <Grid item xs={4} md={4}>
          <Button size='small' onClick={() => addToCart(product)}>
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid item className='information'>
        <p>Price: R{product.price}</p>
      </Grid>
    </Grid>

  </Wrapper>
);

export default CartItem;
