import Head from 'next/head';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DisplayError from './ErrorMessage';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import { useProductQuery } from '../types/generated-queries';
import { IdProps } from '../types/types';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }: IdProps) {
  const { data, loading, error } = useProductQuery({
    variables: {
      id,
    },
  });
  if (loading) return <p>Chargement...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <ItemStyles>
        <img
          src={Product.photo.image.publicUrlTransformed}
          alt={Product.photo.altText}
        />
        <PriceTag>{formatMoney(Product.price)}</PriceTag>
      </ItemStyles>
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
        <AddToCart id={id} />
      </div>
    </ProductStyles>
  );
}
