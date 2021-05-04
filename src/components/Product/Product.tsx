import Button from '@material-ui/core/Button';
import ProductItem from '../../types/ProductItem';
import { ProductWrapper } from './Product.styles';
import Container from "@material-ui/core/Container";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';

type Props = {
  product: ProductItem;
  handleAddToCart: (selectedItem: ProductItem) => void;
};

const Product: React.FC<Props> = ({ product, handleAddToCart }) => (
  <ProductWrapper>
    <Container>
      <Grid container justify="center" alignItems="center">
        <img src={product.image} alt={product.title} />
      </Grid>
      <Grid item>
        <Grid item className="title" xs={12} md={12}>
          <h3>{product.title}</h3>
        </Grid>
        <Grid item xs={12} md={12} className="description">
          <p>{product.description}</p>
        </Grid>
      </Grid>
      <Grid container className="productFooter" direction="row">
        <Grid item xs={6} md={6}>
          <h4>R{product.price}</h4>
        </Grid>
        <Grid item xs={6} md={6}>
          <Button onClick={() => handleAddToCart(product)}><AddShoppingCartIcon /> Add to Cart</Button>
        </Grid>
      </Grid>
    </Container>
  </ProductWrapper>
);

export default Product;
