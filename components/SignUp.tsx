import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { useSignUpMutation } from '../types/generated-queries';
import { SyntheticEvent } from 'react';

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [signup, { data, loading, error }] = useSignUpMutation({
    variables: {
      email: inputs.email,
      name: inputs.name,
      password: inputs.password
    },
    // refectch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault(); // stop the form from submitting
    await signup();
    resetForm();
    // Send the email and password to the graphqlAPI
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Créer un compte</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Compte créé avec le mail {data.createUser.email} - Vous pouvez
            maintenant vous connecter!
          </p>
        )}
        <label htmlFor="email">
          Nom et prénom
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Créer un compte</button>
      </fieldset>
    </Form>
  );
}
