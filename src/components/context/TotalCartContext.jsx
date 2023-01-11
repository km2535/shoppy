import React, { createContext, useContext, useState } from "react";

const TotalCartContext = createContext();

export default function TotalCartContextProvider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <TotalCartContext.Provider
      value={{ setTotalPrice, totalPrice, setTotal, total }}
    >
      {children}
    </TotalCartContext.Provider>
  );
}
export function useTotalCartContext() {
  return useContext(TotalCartContext);
}
