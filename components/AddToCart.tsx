import { FaCartArrowDown, FaCartPlus } from 'react-icons/fa';
import BigButton from './styles/BigButton';
import {
  useAddToCartMutation,
  refetchUserQuery,
} from '../types/generated-queries';
import { IdProps } from '../types/types';

export default function AddToCart({ id }: IdProps) {
  const [addToCart, { loading }] = useAddToCartMutation({
    variables: { id },
    refetchQueries: [refetchUserQuery()],
  });

  async function handleClick() {
    await addToCart();
  }

  return (
    <BigButton disabled={loading} type="button" onClick={handleClick}>
      {loading ? <FaCartArrowDown /> : <FaCartPlus />}
    </BigButton>
  );
}
