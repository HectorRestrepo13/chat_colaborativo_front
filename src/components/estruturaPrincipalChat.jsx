// src/App.js
import { useEffect, useState, useRef } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import '../assets/css/Principal.css';


// Inicializamos el webSocket.io en la parte del cliente

import { io } from "https://cdn.socket.io/4.8.0/socket.io.esm.min.js";



const Principal = () => {


    const [chatSelecionado, setChatSelecionado] = useState(null); // Este es donde se va guadar el id o nombre del chat que se seleciono para que se muestre 
    const socketRef = useRef(null); // Usamos useRef para crear un socket persistente


    useEffect(() => {
        // Inicializamos el socket solo una vez al montar el componente
        socketRef.current = io("http://localhost:3000");
        console.log("Conexión establecida");




        // Retornamos una función de limpieza
        return () => {
            // Esto se ejecuta automáticamente cuando el componente se desmonta
            socketRef.current.disconnect();
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
