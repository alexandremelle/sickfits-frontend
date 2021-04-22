import SingleProduct from '../../components/SingleProduct';
import { QueryIdProps } from '../../types/types';

export default function SingleProductPage({ query }: QueryIdProps) {
  return <SingleProduct id={query.id} />;
}
