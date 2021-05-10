import UpdateProduct from '../components/UpdateProduct';
import { QueryIdProps } from '../types/types';

export default function UpdatePage({ query }: QueryIdProps) {
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
