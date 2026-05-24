// =========================
// RESERVATION CONTAINER
// =========================

// Contenedor donde vamos
// a renderizar toda la
// información de la reserva

const reservationData =
    document.getElementById(
        "reservationData"
    );




// =========================
// RENDER PRE RESERVATION
// =========================

function renderPreReservation() {

    // =========================
    // PRE RESERVATION
    // =========================

    // Tomamos la información
    // temporal de la reserva

    const preReservation =
        JSON.parse(
            localStorage.getItem(
                "preReservation"
            )
        );




    // =========================
    // VALIDACIÓN
    // =========================

    // Si no existe una
    // pre reservación
    // mostramos mensaje

    if (!preReservation) {

        reservationData.innerHTML = `

            <h2>
                No hay ninguna reservación pendiente
            </h2>

            <p>
                Primero debes seleccionar
                una habitación.
            </p>

        `;

        return;

    }




    // =========================
    // RENDER CARD
    // =========================

    // Renderizamos toda
    // la información de
    // la pre reservación

    reservationData.innerHTML = `

        <div class="reservationCard">

            <h2>
                ${preReservation.roomType}
            </h2>

            <p>
                ${preReservation.description}
            </p>

            <p>
                Ubicación:
                ${preReservation.location}
            </p>

            <p>
                Servicios:
                ${preReservation.services.join(" • ")}
            </p>

            <p>
                Precio por noche:
                ${preReservation.nightPrice}
            </p>

            <p>
                Check In:
                ${preReservation.fechaCheckIn}
            </p>

            <p>
                Check Out:
                ${preReservation.fechaCheckOut}
            </p>

            <p>
                Noches:
                ${preReservation.nights}
            </p>

            <p>
                Total a pagar:
                ${preReservation.totalPrice}
            </p>


            <!-- =========================
                 BOTONES
            ========================== -->

            <div class="buttonsContainer">

                <button

                    class="cancelPreReservation"

                    id="cancelPreReservation"

                >

                    Cancelar reservación

                </button>


                <button

                    class="payReservation"

                    id="payReservation"

                >

                    Pagar y reservar

                </button>

            </div>

        </div>

    `;

}

// =========================
// EVENTO CANCELAR RESERVA
// =========================

document.addEventListener("click", (event) => {

    // =========================
    // CANCEL PRE RESERVATION
    // =========================

    if (
        event.target.id ===
        "cancelPreReservation"
    ) {

        // =========================
        // CONFIRMACIÓN
        // =========================

        // Preguntamos al usuario
        // si realmente desea
        // cancelar la reservación

        const confirmation =
            confirm(

                "¿Estás seguro de cancelar por completo esta reservación?"

            );




        // =========================
        // CANCELAR CONFIRMACIÓN
        // =========================

        // Si el usuario da cancelar
        // detenemos todo el proceso

        if (!confirmation) {

            return;

        }




        // =========================
        // ELIMINAR PRE RESERVATION
        // =========================

        // Eliminamos la reserva
        // temporal del localStorage

        localStorage.removeItem(
            "preReservation"
        );




        // =========================
        // REDIRECCIÓN
        // =========================

        // Regresamos al usuario
        // a la página de filtros

        window.location.href =
            "pag-02.html";

    }

});

// =========================
// EVENTOS PAYING
// =========================

document.addEventListener("click", (event) => {

    // =========================
    // PAGAR Y RESERVAR
    // =========================

    if (
        event.target.id ===
        "payReservation"
    ) {

        // =========================
        // PRE RESERVATION
        // =========================

        // Tomamos toda la
        // información temporal
        // de la reservación

        const preReservation =
            JSON.parse(
                localStorage.getItem(
                    "preReservation"
                )
            );




        // =========================
        // USER NOW
        // =========================

        // Tomamos el usuario
        // actualmente autenticado

        const userNow =
            JSON.parse(
                localStorage.getItem(
                    "userNow"
                )
            );




        // =========================
        // AVAILABILITY
        // =========================

        // Tomamos todas las
        // habitaciones disponibles

        const availability =
            JSON.parse(
                localStorage.getItem(
                    "availability"
                )
            ) || [];




        // =========================
        // ROOM FOUND
        // =========================

        // Buscamos la habitación
        // actual dentro de availability
        // usando el mismo id
        // de preReservation

        const roomFound =
            availability.find(room =>

                room.id ==
                preReservation.id

            );




        // =========================
        // VALIDAR HABITACIÓN
        // =========================

        // Si la habitación ya
        // no existe detenemos
        // el proceso

        if (!roomFound) {

            alert(
                "La habitación ya no existe"
            );

            return;

        }




        // =========================
        // VALIDAR DISPONIBILIDAD
        // =========================

        // Si la cantidad disponible
        // es igual a 0 entonces
        // ya no puede reservarse

        if (
            roomFound.cantidadDisponibles <= 0
        ) {

            alert(
                "Ya no hay disponibilidad para esta habitación"
            );

            return;

        }




        // =========================
        // RESTAR DISPONIBILIDAD
        // =========================

        // Restamos 1 habitación
        // disponible porque acaba
        // de ser reservada

        roomFound.cantidadDisponibles--;




        // =========================
        // ACTUALIZAR AVAILABILITY
        // =========================

        // Guardamos nuevamente
        // availability ya actualizado

        localStorage.setItem(

            "availability",

            JSON.stringify(
                availability
            )

        );




        // =========================
        // RESERVATIONS
        // =========================

        // Tomamos todas las
        // reservaciones actuales

        const reservations =
            JSON.parse(
                localStorage.getItem(
                    "reservations"
                )
            ) || [];




        // =========================
        // NEW RESERVATION
        // =========================

        // Creamos el nuevo objeto
        // de reservación oficial

        const newReservation = {

            clientName:
                userNow.fullName,

            identification:
                userNow.identification,

            roomType:
                preReservation.roomType,

            fechaCheckIn:
                preReservation.fechaCheckIn,

            fechaCheckOut:
                preReservation.fechaCheckOut,

            nightPrice:
                preReservation.nightPrice,

            totalPrice:
                preReservation.totalPrice

        };




        // =========================
        // PUSH RESERVATION
        // =========================

        // Agregamos la nueva
        // reservación al array

        reservations.push(
            newReservation
        );




        // =========================
        // GUARDAR RESERVATIONS
        // =========================

        // Guardamos nuevamente
        // el array actualizado

        localStorage.setItem(

            "reservations",

            JSON.stringify(
                reservations
            )

        );




        // =========================
        // REMOVE PRE RESERVATION
        // =========================

        // Eliminamos la reserva
        // temporal porque ahora
        // ya es una reserva oficial

        localStorage.removeItem(
            "preReservation"
        );




        // =========================
        // MENSAJE
        // =========================

        alert(
            "Su reservación ha sido hecha satisfactoriamente"
        );




        // =========================
        // REDIRECCIÓN
        // =========================

        // Enviamos al usuario
        // nuevamente a pag-01

        window.location.href =
            "pag-01.html";

    }

});




// =========================
// INVOCAR FUNCIÓN
// =========================

renderPreReservation();