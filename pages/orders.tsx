import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import ErrorMessage from '../components/ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from '../components/styles/OrderItemStyles';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((acc, item) => acc + item.quantity, 0);
}

export default function OrdersPage(): JSX.Element {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Chargement...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;
  return (
    <div>
      <Head>
        <title>Sick Fits | commandes)</title>
      </Head>
      <h2 style={{ textAlign: 'center' }}>
        {allOrders.length === 0
          ? "Vous n'avez pas encore passé de commande chez nous 😿"
          : `Vous avez passé ${allOrders.length} commande${
              allOrders.length > 1 ? 's' : ''
            } chez nous ! Merci ❤️`}
      </h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItemsInAnOrder(order)} produit
                    {countItemsInAnOrder(order) > 1 ? 's' : ''}
                  </p>
                  <p>
                    {order.items.length} référence
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
