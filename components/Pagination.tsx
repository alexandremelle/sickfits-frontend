import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';
import { useAllProductsCountQuery } from '../types/generated-queries';


export default function Pagination({ page }: { page: number}) {
  const { data, loading, error } = useAllProductsCountQuery();
  if (loading) return 'Chargement...';
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} sur {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prec</a>
      </Link>
      <p>
        Page {page} sur {pageCount}
      </p>
      <p>{count} articles au total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Suiv →</a>
      </Link>
    </PaginationStyles>
  );
}
