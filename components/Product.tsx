import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import { Product as productType } from '../types/generated-queries';

type ProductProps = { product: productType };

export default function Product({ product }: ProductProps) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <AddToCart id={product.id} />
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id,
            },
          }}
        >
          <button type="button">Modifier ✏️</button>
        </Link>
        <DeleteProduct id={product.id}>Supprimer 💣</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
