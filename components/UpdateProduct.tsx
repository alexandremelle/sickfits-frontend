import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { useProductQuery, useUpdateProductMutation } from '../types/generated-queries';
import { IdProps } from '../types/types';
import { SyntheticEvent } from 'react';

export default function UpdateProduct({ id }: IdProps) {
  // 1. We need to get the existing product
  const { data, error, loading } = useProductQuery({
    variables: { id },
  });
  // 2. We need to get the mutation to update the product
  const [
    updateProduct,
    { error: updateError, loading: updateLoading },
  ] = useUpdateProductMutation();
  // 2.5 Create some state for the form inputs:
  const { inputs, handleChange } = useForm(
    data?.Product || {
      name: '',
      description: '',
      price: '',
    }
  );
  console.log(inputs);
  if (loading) return <p>Chargement...</p>;
  // 3. We need the form to handle the updates
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      },
    });
  }
  return (
    <Form
      onSubmit={handleSubmit}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Titre
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Prix
          <input
            type="number"
            id="price"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Mettre à jour</button>
      </fieldset>
    </Form>
  );
}
