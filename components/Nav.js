import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Produits</Link>
      {user && (
        <>
          <Link href="/sell">Vendre</Link>
          <Link href="/orders">Commandes</Link>
          <Link href="/account">Compte</Link>
          <button type="button" onClick={openCart}>
            <FaShoppingCart />
            <CartCount
              count={user.cart.reduce(
                (acc, cartItem) =>
                  acc + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Se connecter</Link>
        </>
      )}
    </NavStyles>
  );
}
