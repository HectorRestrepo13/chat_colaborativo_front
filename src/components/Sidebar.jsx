// src/components/Sidebar.js
import "../assets/css/Sidebar.css";
import searchIcon from "../../public/abai-logo.png";
import contactImg from "../../public/abai-logo.png";

import MiContexto from "./contex/datosUsuario";
import { useContext } from "react";

const Sidebar = ({ setChatSelecionado }) => {
  const { datoUsuario, setDatoUsuario } = useContext(MiContexto); // Usamos useContext para acceder al dato
  console.log(datoUsuario);

  const mandarDatosDelChat = (nombre, arregloMensajes) => {
    setChatSelecionado({
      nombreChat: nombre,
      mensajes: arregloMensajes,
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-search">
        <img src={searchIcon} alt="Buscar" className="icon" />
        <input type="text" placeholder="Busca un chat o inicia uno nuevo" />
      </div>
      <div className="chat-list">
        {datoUsuario.grupos.map((element) => (
          <div className="chat-item" key={element.id_grupo}>
            <img src={contactImg} alt="Contacto" className="chat-img" />
            <div
              onClick={() => {
                mandarDatosDelChat(element.nombre, element.mensajes);
              }}
              className="chat-info"
            >
              <span className="chat-name">{element.nombre}</span>
              <span className="chat-time">11:35 a. m.</span>
              <p className="chat-preview">{element.descripcion}</p>
            </div>
          </div>
        ))}

        {/* Repetir para cada chat */}
      </div>
    </div>
  );
};

export default Sidebar;
