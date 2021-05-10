import { refetchUserQuery, useSignOutMutation } from '../types/generated-queries';

export default function SignOut() {
  const [signout] = useSignOutMutation({
    refetchQueries: [refetchUserQuery()],
  });
  async function handleClick() {
    await signout();
    window.location.href = '/';
  }
  return (
    <button
      type="button"
      onClick={handleClick}
    >
      Se déconnecter
    </button>
  );
}
