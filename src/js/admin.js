import {
    removeUserNow
} from "../js/client.js"

const userContainer =
    document.getElementById(
        "userContainer"
    );

const roomsContainer =
    document.getElementById("roomsContainer");

const reservationsContainer =
    document.getElementById("reservationsContainer");

const rooms =
    JSON.parse(localStorage.getItem("rooms")) || [];


// =========================
// RENDER USER CONTAINER
// =========================

function renderUserContainer() {

    // =========================
    // RENDER HTML
    // =========================

    userContainer.innerHTML = `

        <div class="userActions">

            <!-- =========================
                 GO HOME
            ========================== -->

            <button

                id="btnGoHome"

                class="userButton"

            >

                Ir a inicio

            </button>


            <!-- =========================
                 LOG OUT
            ========================== -->

            <button

                id="btnLogOut"

                class="userButton logoutButton"

            >

                Cerrar sesión

            </button>

        </div>

    `;


    // =========================
    // BTN GO HOME
    // =========================

    const btnGoHome =
        document.getElementById(
            "btnGoHome"
        );


    // =========================
    // EVENT GO HOME
    // =========================

    btnGoHome.addEventListener(

        "click",

        () => {

            // =========================
            // REDIRECTION
            // =========================

            window.location.href =
                "pag-01.html";

        }

    );


    // =========================
    // BTN LOG OUT
    // =========================

    const btnLogOut =
        document.getElementById(
            "btnLogOut"
        );


    // =========================
    // EVENT LOG OUT
    // =========================

    btnLogOut.addEventListener(

        "click",

        () => {

            // =========================
            // REMOVE USER NOW
            // =========================

            removeUserNow();


            // =========================
            // REDIRECTION
            // =========================

            window.location.href =
                "pag-01.html";

        }

    );

}


function renderRooms() {

    roomsContainer.innerHTML = "";


    rooms.forEach((room, index) => {

        roomsContainer.innerHTML += `

            <div class="roomCard">

                <h2>${room.tipo}</h2>

                <p>
                    Precio:
                    ${room.precio}
                </p>

                <p>
                    Capacidad máxima:
                    ${room.capacidadMaxima}
                </p>

                <p>
                    Capacidad minima:
                    ${room.capacidadMinima}
                </p>                

                <p>
                    ${room.descripcion}
                </p>

                <button
                    class="edit"
                    data-index="${index}"
                >
                    Editar
                </button>

            </div>

        `;

    });

}

function openEditCard(index) {

    const room = rooms[index];


    roomsContainer.innerHTML = `

        <div class="editCard">

            <input
                id="roomName"
                value="${room.tipo}"
            >

            <input
                id="roomPrice"
                value="${room.precio}"
            >

            <input
                id="roomCapacityMaxima"
                value="${room.capacidadMaxima}"
            >

            <input
                id="roomCapacityMinima"
                value="${room.capacidadMinima}"
            >

            <textarea
                id="roomDescription"
            >${room.descripcion}</textarea>

            <button 
                id="savingChanges"
                data-index="${index}"
            >

                Guardar cambios

            </button>

        </div>

    `;

}

document.addEventListener("click", (event) => {

    // =========================
    // EDITAR
    // =========================

    if (event.target.classList.contains("edit")) {

        const index =
            event.target.dataset.index;

        openEditCard(index);

    }


    // =========================
    // GUARDAR CAMBIOS
    // =========================

    if (event.target.id === "savingChanges") {

        const index =
            event.target.dataset.index;


        // =========================
        // INPUTS
        // =========================

        const roomName =
            document.getElementById("roomName").value;

        const roomPrice =
            document.getElementById("roomPrice").value;


        // =========================
        // SOBREESCRIBIR ROOMS
        // =========================

        rooms[index].tipo =
            roomName;

        rooms[index].precio =
            roomPrice;



        // =========================
        // GUARDAR ROOMS
        // =========================

        localStorage.setItem(
            "rooms",
            JSON.stringify(rooms)
        );


        // =========================
        // ACTUALIZAR AVAILABILITY
        // =========================

        localStorage.setItem(
            "availability",
            JSON.stringify(rooms)
        );


        // =========================
        // OBTENER RESERVATIONS
        // =========================

        const reservations =
            JSON.parse(
                localStorage.getItem("reservations")
            );


        // =========================
        // SI NO HAY RESERVATIONS
        // =========================

        if (!reservations) {

            renderRooms();

            alert("Cambios guardados");

            return;

        }


        // =========================
        // OBTENER AVAILABILITY
        // =========================

        const availability =
            JSON.parse(
                localStorage.getItem("availability")
            );


        // =========================
        // RECORRER RESERVATIONS
        // =========================

        reservations.forEach((reservation) => {


            // =========================
            // BUSCAR HABITACIÓN
            // =========================

            const roomFound =
                availability.find(room =>

                    room.id === reservation.roomId

                );


            // =========================
            // RESTAR DISPONIBILIDAD
            // =========================

            if (roomFound) {

                roomFound.cantidadDisponibles -= 1;

            }

        });


        // =========================
        // GUARDAR AVAILABILITY FINAL
        // =========================

        localStorage.setItem(
            "availability",
            JSON.stringify(availability)
        );


        // =========================
        // RENDERIZAR NUEVAMENTE
        // =========================

        renderRooms();


        // =========================
        // ALERT
        // =========================

        alert("Cambios guardados");

    }

});





// =========================
// RENDER RESERVATIONS
// =========================

function renderReservations() {

    // =========================
    // OBTENER RESERVATIONS
    // =========================

    const reservations =
        JSON.parse(
            localStorage.getItem("reservations")
        ) || [];


    // =========================
    // VALIDAR RESERVATIONS
    // =========================

    // Si no existen reservas
    // mostramos mensaje

    if (reservations.length === 0) {

        reservationsContainer.innerHTML = `

            <h2>
                No hay reservaciones hechas
                hasta el momento
            </h2>

            <p>
                En cuanto hayan reservaciones,
                aquí se mostrarán cada una
                de ellas
            </p>

        `;

        return;

    }


    // =========================
    // LIMPIAR CONTENEDOR
    // =========================

    reservationsContainer.innerHTML = "";


    // =========================
    // RECORRER RESERVAS
    // =========================

    reservations.forEach((reservation, index) => {


        // =========================
        // CREAR TARJETA
        // =========================

        reservationsContainer.innerHTML += `

            <div class="reservationCard">

                <h2>
                    ${reservation.clientName}
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
                    Habitación:
                    ${reservation.roomType}
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
                     BOTONES
                ========================== -->

                <div class="buttonsContainer">

                    <button
                        class="editReservation"
                        data-index="${index}"
                    >

                        Editar

                    </button>


                    <button
                        class="cancelReservation"
                        data-index="${index}"
                    >

                        Cancelar

                    </button>

                    <button
                        class="generarFactura"
                        data-index="${index}"
                    >

                        Generar factura

                    </button>

                </div>

            </div>

        `;

    });

}

// =========================
// OPEN EDIT RESERVATION
// =========================

function openEditReservationCard(index) {

    // =========================
    // RESERVATIONS
    // =========================

    const reservations =
        JSON.parse(
            localStorage.getItem("reservations")
        ) || [];


    // =========================
    // RESERVATION
    // =========================

    const reservation =
        reservations[index];


    // =========================
    // RENDER EDIT CARD
    // =========================

    reservationsContainer.innerHTML = `

        <div class="editReservationCard">

            <h2>
                Reserva de
                ${reservation.clientName}
            </h2>


            <!-- =========================
                 CHECK IN
            ========================== -->

            <label>
                Fecha Check In
            </label>

            <input
                type="date"
                id="editCheckIn"
                value="${reservation.fechaCheckIn}"
            >


            <!-- =========================
                 CHECK OUT
            ========================== -->

            <label>
                Fecha Check Out
            </label>

            <input
                type="date"
                id="editCheckOut"
                value="${reservation.fechaCheckOut}"
            >


            <!-- =========================
                 TOTAL PRICE
            ========================== -->

            <label>
                Precio Total
            </label>

            <input
                type="number"
                id="editTotalPrice"
                value="${reservation.totalPrice}"
            >


            <!-- =========================
                 SAVE CHANGES
            ========================== -->

            <button
                id="saveReservationChanges"
                data-index="${index}"
            >

                Guardar Cambios

            </button>

        </div>

    `;

}




// =========================
// EVENTOS
// =========================

document.addEventListener("click", (event) => {

    // =========================
    // EDIT RESERVATION
    // =========================

    if (
        event.target.classList.contains(
            "editReservation"
        )
    ) {

        // =========================
        // INDEX
        // =========================

        const index =
            event.target.dataset.index;


        // =========================
        // OPEN CARD
        // =========================

        openEditReservationCard(index);

    }

    // =========================
    // CANCEL RESERVATION
    // =========================

    if (
        event.target.classList.contains(
            "cancelReservation"
        )
    ) {

        // =========================
        // INDEX
        // =========================

        const index =
            event.target.dataset.index;


        // =========================
        // CONFIRMAR ELIMINACIÓN
        // =========================

        const confirmation =
            confirm(

                "¿Estás seguro de que deseas eliminar esta reservación?"

            );


        // =========================
        // VALIDAR CONFIRMACIÓN
        // =========================

        // Si el admin cancela
        // detenemos todo

        if (!confirmation) {

            return;

        }


        // =========================
        // CANCEL FUNCTION
        // =========================

        cancelReservations(index);

    }

    if ( event.target.classList.contains("generarFactura")) {
        const index = event.target.dataset.index;

        const confirmation = confirm ("Estas seguro de que deseas generar factura de esta reservacion?")
    }

    if (!confirmation) {
        return;
    }

    const reservations =
        JSON.parse(
            localStorage.getItem("reservations")
        ) || [];


    // =========================
    // RESERVATION
    // =========================

    const newFactura = {
        clientName : reservations[index].clientName,
        identification : reservations[index].identification,
        roomType : reservations[index].roomType,
        fechaCheckIn : reservations[index].fechaCheckIn,
        fechaCheckOut : reservations[index].fechaCheckOut,
        nightPrice : reservations[index].nightPrice,
        totalPrice : reservations[index].totalPrice
    }

    const factura = getItem(localStorage.factura)

    factura.push(newFactura);

    localStorage.setItem("reservations", JSON.stringify(factura))
    window.location.href = facturacion.html;




    // =========================
    // SAVE RESERVATION CHANGES
    // =========================

    if (
        event.target.id ===
        "saveReservationChanges"
    ) {

        // =========================
        // INDEX
        // =========================

        const index =
            event.target.dataset.index;


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
        // INPUTS
        // =========================

        const editCheckIn =
            document.getElementById(
                "editCheckIn"
            ).value;

        const editCheckOut =
            document.getElementById(
                "editCheckOut"
            ).value;

        const editTotalPrice =
            document.getElementById(
                "editTotalPrice"
            ).value;


        // =========================
        // SOBREESCRIBIR
        // =========================

        reservations[index].fechaCheckIn =
            editCheckIn;

        reservations[index].fechaCheckOut =
            editCheckOut;

        reservations[index].totalPrice =
            editTotalPrice;


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

        renderReservations();


        // =========================
        // ALERT
        // =========================

        alert(
            "Reserva actualizada correctamente"
        );

    }

});

// =========================
// CANCEL RESERVATION
// =========================

function cancelReservations(index) {

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
    // ELIMINAR RESERVA
    // =========================

    // splice elimina
    // un elemento del array

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

    renderReservations();


    // =========================
    // ALERT
    // =========================

    alert(
        "Reserva eliminada correctamente"
    );

}


// =========================
// INVOCAR FUNCIONES
// =========================



renderRooms();
renderReservations();