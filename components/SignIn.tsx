import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { useSignInMutation, refetchUserQuery } from '../types/generated-queries';
import { SyntheticEvent } from 'react';

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data, loading }] = useSignInMutation({
    variables: {
      email: inputs.email,
      password: inputs.password
    },
    // refetch the currently logged in user
    refetchQueries: [refetchUserQuery()],
  });
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault(); // stop the form from submitting
    await signin();
    resetForm();
    window.location.href = '/';
    // Send the email and password to the graphqlAPI
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            name="password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Se connecter</button>
      </fieldset>
    </Form>
  );
}
