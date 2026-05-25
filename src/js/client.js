

// =========================
// USER CONTAINER
// =========================

// Tomamos el contenedor
// que estará dentro del header

const userContainer =
    document.getElementById(
        "userContainer"
    );

const reservationsContainer =
    document.getElementById(
        "reservationsContainer"
    );

const userNow =
    JSON.parse(
        localStorage.getItem("userNow")
    );

const nameUser =
    userNow.fullName;

const identification =
    userNow.identification;


// =========================
// RENDER MY RESERVATIONS
// =========================

// =========================
// RENDER USER INFO
// =========================

function renderUserInfo() {

    // =========================
    // INSERTAR HTML
    // =========================

    // Creamos dinámicamente:
    // - Nombre usuario
    // - Botón inicio
    // - Botón cerrar sesión

    userContainer.innerHTML = `

        <p>
            ${nameUser}
        </p>

        <!-- =========================
             BOTÓN IR A INICIO
        ========================== -->

        <button id="btnGoHome">

            IrAInicio

        </button>


        <!-- =========================
             BOTÓN LOG OUT
        ========================== -->

        <button id="btnLogOut">

            Cerrar Sesión

        </button>

    `;


    // =========================
    // BTN GO HOME
    // =========================

    // Tomamos el botón
    // recién creado

    const btnGoHome =
        document.getElementById(
            "btnGoHome"
        );


    // =========================
    // EVENTO GO HOME
    // =========================

    btnGoHome.addEventListener(
        "click",

        () => {

            // =========================
            // REDIRECCIÓN
            // =========================

            window.location.href =
                "pag-01.html";

        }

    );


    // =========================
    // BTN LOG OUT
    // =========================

    // Tomamos el botón
    // recién creado

    const btnLogOut =
        document.getElementById(
            "btnLogOut"
        );


    // =========================
    // EVENTO LOG OUT
    // =========================

    btnLogOut.addEventListener(

        "click",

        () => {

            // =========================
            // REMOVE USER NOW
            // =========================

            removeUserNow();


            // =========================
            // REDIRECCIÓN
            // =========================

            window.location.href =
                "pag-01.html";

        }

    );

}


function renderMyReservations() {

    // =========================
    // KEY RESERVATIONS
    // =========================

    const reservationsKey =
        localStorage.getItem(
            "reservations"
        );


    // =========================
    // VALIDAR KEY
    // =========================

    // Si la key no existe

    if (!reservationsKey) {

        reservationsContainer.innerHTML = `

            <h2>
                No hay ninguna reservación
                hecha hasta el momento
            </h2>

        `;

        return;

    }


    // =========================
    // PARSE RESERVATIONS
    // =========================

    const reservations =
        JSON.parse(reservationsKey);


    // =========================
    // VALIDAR ARRAY VACÍO
    // =========================

    if (reservations.length === 0) {

        reservationsContainer.innerHTML = `

            <h2>
                No hay ninguna reservación
                hecha hasta el momento
            </h2>

        `;

        return;

    }


    // =========================
    // FILTRAR RESERVAS
    // =========================

    const myReservations =
        reservations.filter(reservation =>

            reservation.clientName ===
            nameUser

            &&

            reservation.identification ==
            identification

        );


    // =========================
    // VALIDAR RESERVAS USUARIO
    // =========================

    if (myReservations.length === 0) {

        reservationsContainer.innerHTML = `

            <h2>
                No has hecho ninguna
                reservación hasta el momento
            </h2>

        `;

        return;

    }


    // =========================
    // LIMPIAR CONTAINER
    // =========================

    reservationsContainer.innerHTML = "";


    // =========================
    // RECORRER RESERVAS
    // =========================

    myReservations.forEach(
        (reservation, index) => {


        // =========================
        // CREAR TARJETAS
        // =========================

        reservationsContainer.innerHTML += `

            <div class="reservationCard">

                <h2>
                    ${reservation.roomType}
                </h2>


                <p>
                    Check In:
                    ${reservation.fechaCheckIn}
                </p>


                <p>
                    Check Out:
                    ${reservation.fechaCheckOut}
                </p>


                <p>
                    Precio por noche:
                    ${reservation.nightPrice}
                </p>


                <p>
                    Precio total:
                    ${reservation.totalPrice}
                </p>


                <!-- =========================
                     BOTÓN CANCELAR
                ========================== -->

                <button

                    class="cancelReservation"

                    id="cancelReservation"

                    data-id="${reservation.id}"

                >

                    Cancelar

                </button>

            </div>

        `;

    });

}

// =========================
// CANCEL RESERVATION
// =========================

function cancelReservations(
    reservationId
) {

    // =========================
    // RESERVATIONS
    // =========================

    const reservations =
        JSON.parse(
            localStorage.getItem(
                "reservations"
            )
        ) || [];


    // =========================
    // FIND INDEX
    // =========================

    // Buscamos el index REAL
    // de la reserva dentro
    // del array original

    const index =
        reservations.findIndex(
            reservation =>

                reservation.id ==
                reservationId
        );


    // =========================
    // ELIMINAR RESERVA
    // =========================

    reservations.splice(index, 1);


    // =========================
    // GUARDAR LOCALSTORAGE
    // =========================

    localStorage.setItem(

        "reservations",

        JSON.stringify(reservations)

    );


    // =========================
    // RENDER RESERVATIONS
    // =========================

    renderMyReservations();


    // =========================
    // ALERT
    // =========================

    alert(
        "Reserva eliminada correctamente"
    );

}

// =========================
// EVENTO CANCELAR
// =========================

document.addEventListener(
    "click",

    (event) => {

        // =========================
        // CANCEL RESERVATION
        // =========================

        if (
            event.target.classList.contains(
                "cancelReservation"
            )
        ) {

            // =========================
            // RESERVATION ID
            // =========================

            const reservationId =
                event.target.dataset.id;


            // =========================
            // CONFIRMACIÓN
            // =========================

            const confirmation =
                confirm(

                    "¿Estás seguro de que deseas cancelar esta reservación?"

                );


            // =========================
            // VALIDAR CONFIRMACIÓN
            // =========================

            if (!confirmation) {

                return;

            }


            // =========================
            // CANCEL FUNCTION
            // =========================

            cancelReservations(
                reservationId
            );

        }

    }
);

function removeUserNow() {

    // =========================
    // ELIMINAR USER NOW
    // =========================

    localStorage.removeItem(
        "userNow"
    );

}

// =========================
// INVOCAR FUNCIÓN
// =========================

renderUserInfo();
renderMyReservations();


export {
    removeUserNow
}