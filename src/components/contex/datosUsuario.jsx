import React, { createContext, useState } from "react";

// Crear el Contexto
const MiContexto = createContext();

// Crear un componente proveedor para el contexto
export const MiContextoProvider = ({ children }) => {
  // Aquí guardamos el valor que queramos compartir
  const [datoUsuario, setDatoUsuario] = useState("Valor inicial");

  return (
    <MiContexto.Provider value={{ datoUsuario, setDatoUsuario }}>
      {children}
    </MiContexto.Provider>
  );
};

export default MiContexto;
