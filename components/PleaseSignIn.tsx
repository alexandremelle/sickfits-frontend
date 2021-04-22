import { useUser } from '../hooks/useUser';
import SignIn from './SignIn';
import { ReactNode } from 'react';

export default function ({ children }: { children: ReactNode}) {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
}
