import { useUser } from '../hooks/useUser';
import SignIn from './SignIn';

export default function ({ children }: { children: JSX.Element}) {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
}
