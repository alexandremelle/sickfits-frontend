import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

type ProductPageProps = {
  query: {
    page?: string;
  };
};

export default function ProductsPage({ query }: ProductPageProps) {
  const page = Number(query.page);
  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
