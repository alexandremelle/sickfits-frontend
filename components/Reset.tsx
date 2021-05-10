import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { useRedeemPasswordResetMutation } from '../types/generated-queries';
import { SyntheticEvent } from 'react';

export default function Reset({ token }: { token: string }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useRedeemPasswordResetMutation({
    variables: {
      email: inputs.email,
      password: inputs.password,
      token: inputs.token,
    },
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault(); // stop the form from submitting
    await reset().catch(console.error);
    resetForm();
    // Send the email and password to the graphqlAPI
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Réinitialiser votre mot de passe</h2>
      <Error error={error || successfulError} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>
            Mot de passe réinitialisé! Vous pouvez maintenant vous connecter
          </p>
        )}

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
            placeholder="Au moins 8 caractères"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Réinitialiser</button>
      </fieldset>
    </Form>
  );
}
