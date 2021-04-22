import { useContext } from "react";
import { LocalStateContext } from "../context/cartState";

// make a custom hook for accessing the cart local state
export default function useCart() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}