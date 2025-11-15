//funcion para mostrar modal
document.querySelectorAll("#btnLogin, #btnLoginMobile").forEach(button => {
    button.addEventListener("click", async () => {
        abrirModalLogin();
    });
});


async function abrirModalLogin() {
    const modal = document.createElement("div");
    modal.id = "modalLogin";
    modal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"

    // Cargar el formulario desde archivo externo
    const formHTML = await fetch("login-form.html").then(res => res.text());
    modal.innerHTML = `<div class="bg-white p-8 rounded-xl w-full max-w-sm shadow-xl">${formHTML}</div>`;

    //agrega en el body del html
    document.body.appendChild(modal);

    //cierra el modal
    modal.querySelector("#closeModal").addEventListener("click", () => {
        modal.remove();
    })
    // Validar formulario al enviar
    modal.querySelector("#login").addEventListener("submit", (e) => {
        e.preventDefault();

        const email = modal.querySelector("#email").value.trim();
        const password = modal.querySelector("#password").value.trim();
        const errorMsg = modal.querySelector("#errorMsg");

        errorMsg.textContent = "";
        errorMsg.classList.add("hidden");

        if (!email) {
            errorMsg.textContent = "El email es obligatorio";
            errorMsg.classList.remove("hidden");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMsg.textContent = "Ingresa un email válido";
            errorMsg.classList.remove("hidden");
            return;
        }

        if (!password) {
            errorMsg.textContent = "La contraseña es obligatoria";
            errorMsg.classList.remove("hidden");
            return;
        }

        if (password.length < 6) {
            errorMsg.textContent = "La contraseña debe tener al menos 6 caracteres";
            errorMsg.classList.remove("hidden");
            return;
        }

        //Elimina el modal una vez que los datos son enviados
        modal.remove();
        //Muestra mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Listo!',
            text: 'Usted ha iniciado sesión'
        });

    });

}

//Funcion para mostrar mensaje de validación y mensaje de éxito del botón suscribir
document.getElementById("suscripcion").addEventListener("submit", (e) => {
    // 1. Evitar que el formulario se envíe de forma predeterminada (recarga la página)
    e.preventDefault();

    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa tu email para suscribirte.',
            confirmButtonColor: '#d33'
        });
        return; // Detiene la ejecución
    }

    // Validar formato de email
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Email Inválido',
            text: 'Ingresa un formato de email válido.',
            confirmButtonColor: '#d33'
        });
        return; // Detiene la ejecución
    }

    Swal.fire({
        icon: 'success',
        title: '¡Suscripción Exitosa!',
        text: `El email "${email}" se ha suscrito correctamente.`,
        confirmButtonColor: '#28a745'
    });

    emailInput.value = '';
});

//función que oculta el botón movil

const boton = document.querySelector('#btnMenu');
const menu = document.querySelector('#contenedorMenu');

function alternarMenu() {
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex')
}

boton.addEventListener('click', alternarMenu);