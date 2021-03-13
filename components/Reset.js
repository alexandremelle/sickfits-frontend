import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  console.log(error);
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await reset().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // Send the email and password to the graphqlAPI
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Réinitialiser votre mot de passe</h2>
      <Error error={error || successfulError} />
      <fieldset>
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
