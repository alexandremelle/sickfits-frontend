import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FaCartArrowDown, FaCartPlus } from 'react-icons/fa';
import BigButton from './styles/BigButton';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <BigButton disabled={loading} type="button" onClick={addToCart}>
      {loading ? <FaCartArrowDown /> : <FaCartPlus />}
    </BigButton>
  );
}
