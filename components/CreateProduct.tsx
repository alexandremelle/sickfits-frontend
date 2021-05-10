import Router from 'next/router';
import { SyntheticEvent } from 'react';
import useForm from '../lib/useForm';
import { refetchAllProductsQuery, useCreateProductMutation } from '../types/generated-queries';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm } = useForm({});
  const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
    variables: {
      name: inputs.name,
      price: inputs.price,
      description: inputs.description,
    },
    refetchQueries: [refetchAllProductsQuery()],
  });

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    await createProductMutation();
    clearForm();
    void Router.push({
      pathname: `/product/${data.createProduct.id}`,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
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
          Prix{' '}
          <span style={{ fontSize: '1rem' }}>
            (En centimes, on fait dans l'originalité ici 🙃)
          </span>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="4999 pour 49,99€"
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

        <button type="submit">Mettre en vente</button>
      </fieldset>
    </Form>
  );
}
