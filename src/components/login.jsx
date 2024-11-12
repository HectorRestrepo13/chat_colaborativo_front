import { useRef } from 'react';
import Swal from 'sweetalert2';
import '../assets/css/login.css';

const Login = ({ setNevegarPagina }) => {
    const inputUsuario = useRef("");
    const inputContra = useRef("");

    // Función para iniciar sesión
    const iniciarSesion = async () => {
        if (inputUsuario.current.value !== "" && inputContra.current.value !== "") {
            try {
                const respuesta = await fetch('/api/login/iniciarSesion', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usuario: inputUsuario.current.value,
                        password: inputContra.current.value
                    })
                });

                if (!respuesta.ok) {
                    throw new Error(`Hubo un Error al Iniciar Sesión: ${respuesta.status}`);
                }

                const jsonRespuesta = await respuesta.json();
                console.log(jsonRespuesta);
                // Aquí puedes agregar lógica para manejar el éxito, como redirigir o mostrar una alerta
            } catch (error) {
                console.log(`Error: ${error}`);

                Swal.fire({
                    icon: "error",
                    title: "Error de Inicio de Sesión",
                    text: "Revise la consola para más detalles.",
                    timer: 3000,
                    showConfirmButton: false,
                    position: "top-end",
                    timerProgressBar: true,
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Faltan Casillas por Llenar",
                text: "Por favor, complete ambos campos antes de iniciar sesión.",
                timer: 3000,
                showConfirmButton: false,
                position: "top-end",
                timerProgressBar: true,
            });
        }
    };

    return (
        <div className="wrapper">
            <div className="logo">
                <img style={{ objectFit: 'contain' }} src="abai-logo.png" alt="logoEmpresa" />
            </div>
            <div className="text-center mt-4 name">
                ABAI GROUP
            </div>
            <form className="p-3 mt-3">
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input ref={inputUsuario} type="text" name="userName" id="userName" placeholder="Usuario" />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input ref={inputContra} type="password" name="password" id="pwd" placeholder="Contraseña" />
                </div>
                <button type='button' onClick={iniciarSesion} className="btn mt-3">Iniciar</button>
            </form>
            <div className="text-center fs-6">
                <a href="#">Sin Cuenta?</a>  <a href="#">Registrate</a>
            </div>
        </div>
    );
};

export default Login;
