import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

export const HomeRoot = styled.div`
  margin: 40px;
  
  .productContainer{
    height: 100%;
  }
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;