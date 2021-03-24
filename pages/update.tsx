import UpdateProduct from '../components/UpdateProduct';

type UpdatePageProps = {
  query: {
    id: string;
  }
}

export default function UpdatePage({ query }: UpdatePageProps): JSX.Element {
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
