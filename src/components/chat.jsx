// src/components/Chat.js
import { useEffect, useRef, useState, useContext } from "react";
import "../assets/css/Chat.css";
import callIcon from "../../public/abai-logo.png";
import videoIcon from "../../public/abai-logo.png";
import menuIcon from "../../public/abai-logo.png";
import profileImg from "../../public/abai-logo.png";

import MiContexto from "./contex/datosUsuario";

const Chat = ({ chatSelecionado, socket }) => {
  const { datoUsuario, setDatoUsuario } = useContext(MiContexto);
  console.log(datoUsuario);

  const inputMensaje = useRef("");
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes
  // Función para unirse a una sala específica
  function joinRoom(chatSelecionado, nombreUsu) {
    // Emitir el evento para unirse a la sala en el servidor
    socket.emit("joinRoom", { chatSelecionado, nombreUsu });

    // Limpiar cualquier listener duplicado del evento 'message'
    socket.off("message");
    socket.on("message", (message) => {
      // Agregar el mensaje recibido al estado
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }

  // Enviar mensaje al servidor
  const enviarMensaje = () => {
    if (inputMensaje.current.value !== "") {
      const messageData = {
        chatSelecionado: chatSelecionado.nombreChat,
        nombreUsu: datoUsuario.nombre,
        mensaje: inputMensaje.current.value,
      };
      socket.emit("message", messageData); // Emitir el mensaje al servidor
      inputMensaje.current.value = ""; // Limpiar el campo de entrada
    }
  };

  // Unirse a la sala cuando se selecciona un chat
  useEffect(() => {
    if (chatSelecionado != null) {
      joinRoom(chatSelecionado.nombreChat, datoUsuario.nombre);
    }

    // Limpiar los listeners cuando el componente se desmonta o cambia de sala
    return () => {
      if (socket) {
        socket.off("message"); // Verificación para evitar error si socket es null
        socket.off("userJoined");
      }
    };
  }, [chatSelecionado, socket]);

  return (
    <div className="chat">
      {chatSelecionado != null ? (
        <>
          <div className="chat-header">
            <img src={profileImg} alt="Perfil" className="profile-img" />
            <h2>{chatSelecionado.nombreChat}</h2>
            <div className="chat-header-icons">
              <img src={callIcon} alt="Llamada" className="icon" />
              <img src={videoIcon} alt="Video" className="icon" />
              <img src={menuIcon} alt="Menú" className="icon" />
            </div>
          </div>
          <div className="chat-messages">
            {
              chatSelecionado.mensajes.length > 0 ? (
                chatSelecionado.mensajes.map((dato, index) => (
                  <div
                    key={index}
                    className={`message ${
                      dato.usuario.nombre === datoUsuario.nombre
                        ? "sent"
                        : "received"
                    }`}
                  >
                    <strong>{dato.usuario.nombre}:</strong> {dato.contenido}
                  </div>
                ))
              ) : (
                <p className="no-messages">No hay mensajes en esta sala.</p>
              )

              // messages.length > 0 ? (
              //     messages.map((message, index) => (
              //         <div key={index} className={`message ${message.nombreUsu === nombreDelUsuarioConectado.current ? 'sent' : 'received'}`}>
              //             <strong>{message.nombreUsu}:</strong> {message.mensaje}
              //         </div>
              //     ))
              // ) : (
              //     <p className="no-messages">No hay mensajes en esta sala.</p>
              // )
            }
          </div>
          <div className="chat-input">
            <input
              ref={inputMensaje}
              type="text"
              placeholder="Escribe un mensaje"
            />
            <button onClick={enviarMensaje}>Enviar</button>
          </div>
        </>
      ) : (
        <div className="no-chat-selected">
          <img
            src="https://mailrelay.com/wp-content/uploads/2020/07/How-to-Enhance-Your-Customer-Experience-using-Live-Chat.jpg"
            alt="Icono de chat"
            className="chat-icon"
          />
          <h2>¡Bienvenido al Chat!</h2>
          <p>Seleccione un chat para comenzar a conversar.</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
