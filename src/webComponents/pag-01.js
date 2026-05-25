// ======================================================
// BTN SIGN UP
// ======================================================

// Tomamos el botón principal
// de registrarse que ya existe
// desde que carga pag-01

const btnSignUp =
    document.getElementById(
        "btnSignUp"
    );



// ======================================================
// EVENTO REDIRECCIÓN
// ======================================================

// Cuando el usuario
// le da clic al botón
// registrarse lo
// enviamos a la
// página registro.html

btnSignUp.addEventListener(

    "click",

    () => {

        window.location.href =
            "registro.html";

    }

);


const btnSignIn =
    document.getElementById("btnSignIn");



btnSignIn.addEventListener("click", () => {
    window.location.href = 
    "login.html"
})







// ======================================================
// CONTENEDOR CARRUSEL
// ======================================================

// Tomamos el contenedor donde
// vamos a insertar todas las
// tarjetas dinámicamente

const carruselHabitaciones =
    document.getElementById(
        "carruselHabitaciones"
    );




// ======================================================
// ROOMS
// ======================================================

// Tomamos todas las habitaciones
// guardadas en localStorage.rooms

const rooms =
    JSON.parse(
        localStorage.getItem("rooms")
    ) || [];




// ======================================================
// VALIDACIÓN
// ======================================================

// Si no hay habitaciones,
// mostramos un mensaje

if (rooms.length === 0) {

    carruselHabitaciones.innerHTML = `

        <h2>
            No hay habitaciones disponibles
        </h2>

    `;

}




// ======================================================
// RECORRER HABITACIONES
// ======================================================

// Recorremos todas las habitaciones
// para crear una tarjeta por cada una

rooms.forEach(room => {

    // ======================================================
    // CREAR TARJETA
    // ======================================================

    carruselHabitaciones.innerHTML += `

        <article
            class="roomCard"
            data-id="${room.id}"
        >

            <!-- =========================
                IMAGEN
            ========================== -->

            <img

                src="${room.ruta_imagen}"

                alt="${room.tipo}"

                class="roomImage"

                data-id="${room.id}"

            >



            <!-- =========================
                CONTENIDO
            ========================== -->

            <div class="roomContent">

                <h3>

                    ${room.tipo}

                </h3>


                <!-- =========================
                    BTN RESERVE
                ========================== -->

                <button
                    class="btnReserve"
                    data-id="${room.id}"
                >

                    Reservar

                </button>

            </div>

        </article>

    `;

});

// =========================
// EVENTOS
// =========================

document.addEventListener("click", (event) => {

    // =========================
    // BTN RESERVE
    // =========================

    if (
        event.target.classList.contains(
            "btnReserve"
        )
    ) {

        // =========================
        // REDIRECCIÓN
        // =========================

        window.location.href =
            "pag-02.html";

    }

});