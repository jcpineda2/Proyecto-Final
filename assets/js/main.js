//funcion para mostrar modal
document.getElementById("btnLogin").addEventListener("click", async () => {
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

        console.log("Formulario válido:", { email, password });
    });

})