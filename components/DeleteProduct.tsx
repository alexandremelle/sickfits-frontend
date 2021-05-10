import { ApolloCache, Cache } from "@apollo/client";
import { ReactNode } from "react";
import { Product, useDeleteProductMutation } from "../types/generated-queries";

type DeleteProductProps = {
  id: string;
  children: ReactNode;
};

type UpdatePayloadProps = {
  data: {
    deleteProduct: Product;
  };
};

function update(cache: ApolloCache<any>, payload: UpdatePayloadProps) {
  cache.evict(cache.identify(payload.data.deleteProduct) as Cache.EvictOptions);
}

export default function DeleteProduct({ id, children }: DeleteProductProps) {
  const [deleteProductMutation, { loading }] = useDeleteProductMutation({
    variables: { id },
      update,
  });

  async function handleClick() {
    const response = confirm('Êtes vous sûr de vouloir supprimer le produit ?')
    if (response) {
      await deleteProductMutation().catch((err) => alert(err.message));
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
