// src/App.js
import { useEffect, useState, useRef, useContext } from "react";
import Sidebar from "./Sidebar";
import Chat from "./chat";
import "../assets/css/Principal.css";
import MiContexto from "./contex/datosUsuario";

// Inicializamos el webSocket.io en la parte del cliente

import { io } from "https://cdn.socket.io/4.8.0/socket.io.esm.min.js";

const Principal = () => {
  const [chatSelecionado, setChatSelecionado] = useState(null); // Este es donde se va guadar el id o nombre del chat que se seleciono para que se muestre
  const socketRef = useRef(null); // Usamos useRef para crear un socket persistente
  const { datoUsuario, setDatoUsuario } = useContext(MiContexto);

  // Emitir evento cuando el usuario se conecta al servidor (independientemente de la sala)
  function usuarioSeConecto(nombreUsu) {
    if (socketRef.current) {
      // Verificar si el socket está disponible
      socketRef.current.emit("joinServer", { nombreUsu });
    } else {
      console.error("El socket no está disponible");
    }
  }

  useEffect(() => {
    // Inicializamos el socket solo una vez al montar el componente
    socketRef.current = io("http://localhost:3000");
    console.log("Conexión establecida");

    if (socketRef.current && datoUsuario.usuario_red) {
      usuarioSeConecto(datoUsuario.usuario_red);
    }

    if (socketRef.current) {
      socketRef.current.on("usuarioEnLinea", (data) => {
        const { nombreUsu, estado } = data;
        console.log(data);
        if (estado === "en línea") {
          console.log(`${nombreUsu} está en línea`);
        } else {
          console.log(`${nombreUsu} ha desconectado`);
        }
      });
    } else {
      console.log("no da");
    }

    // Retornamos una función de limpieza
    return () => {
      // Esto se ejecuta automáticamente cuando el componente se desmonta
      socketRef.current.disconnect();
      socketRef.current.off("usuarioEnLinea"); // Limpiar el listener cuando se desmonte

      console.log("Conexión cerrada");
    };
  }, []);

  return (
    <div className="app">
      <Sidebar setChatSelecionado={setChatSelecionado} />
      <Chat chatSelecionado={chatSelecionado} socket={socketRef.current} />
    </div>
  );
};

export default Principal;
