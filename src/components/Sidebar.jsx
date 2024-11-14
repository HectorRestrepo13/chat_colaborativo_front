// src/components/Sidebar.js
import '../assets/css/Sidebar.css';
import searchIcon from '../../public/abai-logo.png';
import contactImg from '../../public/abai-logo.png';


const Sidebar = ({ setChatSelecionado }) => {

    const mandarDatosDelChat = (nombre, arregloMensajes) => {

        setChatSelecionado({
            nombreChat: nombre,
            mensajes: arregloMensajes
        })
    }



    return (
        <div className="sidebar">
            <div className="sidebar-search">
                <img src={searchIcon} alt="Buscar" className="icon" />
                <input type="text" placeholder="Busca un chat o inicia uno nuevo" />
            </div>
            <div className="chat-list">
                <div className="chat-item">
                    <img src={contactImg} alt="Contacto" className="chat-img" />
                    <div onClick={() => { mandarDatosDelChat('Esteban', ['hola como estas', 'muy bien gracias', 'de nada']) }} className="chat-info">
                        <span className="chat-name">Esteban</span>
                        <span className="chat-time">10:33 a. m.</span>
                        <p className="chat-preview">Nuevo mensaje</p>
                    </div>
                </div>
                <div className="chat-item">
                    <img src={contactImg} alt="Contacto" className="chat-img" />
                    <div onClick={() => { mandarDatosDelChat('Kevin Alzate', ['todo Bien', 'si claro']) }} className="chat-info">
                        <span className="chat-name">Kevin Alzate</span>
                        <span className="chat-time">11:35 a. m.</span>
                        <p className="chat-preview">Nuevo mensaje</p>
                    </div>
                </div>
                {/* Repetir para cada chat */}
            </div>
        </div>
    );
};

export default Sidebar;
