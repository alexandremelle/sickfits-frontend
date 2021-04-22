import { ApolloCache, Cache } from '@apollo/client';
import styled from 'styled-components';
import { useDeleteCartItemMutation, CartItem } from '../types/generated-queries';
import { IdProps } from '../types/types';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

type UpdateFnPayloadProps = {
  data: {
    deleteCartItem: CartItem;
  };
};

function update(cache: ApolloCache<any>, payload: UpdateFnPayloadProps) {
  cache.evict(cache.identify(payload.data.deleteCartItem) as Cache.EvictOptions);
}

export default function RemoveFromCart({ id }: IdProps) {
  const [removeFromCart, { loading }] =  useDeleteCartItemMutation({
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });

  async function handleClick() {
    await removeFromCart();
  }

  return (
    <BigButton
      type="button"
      onClick={handleClick}
      disabled={loading}
      title="Supprimer cet article du panier"
    >
      &times;
    </BigButton>
  );
}
