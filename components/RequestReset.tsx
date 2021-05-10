import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { useRequestResetMutation } from '../types/generated-queries';
import { SyntheticEvent } from 'react';

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [requestReset, { data, loading, error }] = useRequestResetMutation({
      variables: {email: inputs.email},
      // refectch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault(); // stop the form from submitting
    await requestReset().catch(console.error);
    resetForm();
    // Send the email and password to the graphqlAPI
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Mot de passe oublié?</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Lien de réinitialisation envoyé! Vérifiez votre boite mail!</p>
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
        <button type="submit">Valider</button>
      </fieldset>
    </Form>
  );
}
