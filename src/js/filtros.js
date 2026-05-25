const fechaCheckIn =
    document.getElementById("fechaCheckIn");

const fechaCheckOut =
    document.getElementById("fechaCheckOut");

const numeroDePersonas =
    document.getElementById("numeroDePersonas");



// =========================
// CONTENEDOR
// =========================

const roomsContainer =
    document.getElementById("roomsContainer");


// =========================
// EVENTS
// =========================

fechaCheckIn.addEventListener("change", () => {

    verifCheckIn();
    coherence();
    startFilters();

});

fechaCheckOut.addEventListener("change", () => {

    verifCheckOut();
    coherence();
    startFilters();

});

numeroDePersonas.addEventListener("change", () => {

    startFilters();

});

document.addEventListener("click", (event) => {

    // =========================
    // RESERVE
    // =========================

    if (
        event.target.classList.contains("reserve")
    ) {

        // =========================
        // ROOM ID
        // =========================

        // Tomamos el id de la
        // habitación seleccionada

        const roomId =
            event.target.dataset.id;




        // =========================
        // AVAILABILITY
        // =========================

        // Tomamos todas las habitaciones
        // disponibles desde localStorage

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
        // que coincida con el id
        // del botón al que el
        // usuario le dio reservar

        const roomFound =
            availability.find(room =>

                room.id == roomId

            );




        // =========================
        // VALIDAR HABITACIÓN
        // =========================

        // Si no encontramos
        // la habitación detenemos
        // todo el proceso

        if (!roomFound) {

            alert(
                "Habitación no encontrada"
            );

            return;

        }




        // =========================
        // FECHAS
        // =========================

        // Tomamos las fechas
        // seleccionadas por
        // el usuario

        const checkIn =
            fechaCheckIn.value;

        const checkOut =
            fechaCheckOut.value;




        // =========================
        // DATE OBJECTS
        // =========================

        // Convertimos los strings
        // de fecha en objetos Date
        // para poder calcular
        // la diferencia de días

        const dateCheckIn =
            new Date(checkIn);

        const dateCheckOut =
            new Date(checkOut);




        // =========================
        // DIFERENCIA
        // =========================

        // Calculamos la diferencia
        // entre ambas fechas
        // en milisegundos

        const differenceMs =
            dateCheckOut -
            dateCheckIn;




        // =========================
        // NOCHES
        // =========================

        // Convertimos la diferencia
        // de milisegundos a días

        const nights =
            differenceMs /
            (1000 * 60 * 60 * 24);




        // =========================
        // TOTAL PRICE
        // =========================

        // Multiplicamos
        // cantidad de noches
        // por el precio de la habitación

        const totalPrice =
            nights *
            roomFound.precio;




        // =========================
        // PRE RESERVATION
        // =========================

        // Creamos un objeto
        // con TODA la información
        // necesaria para el pago

        const preReservation = {

            // =========================
            // ROOM DATA
            // =========================

            id:
                roomFound.id,

            roomType:
                roomFound.tipo,

            description:
                roomFound.descripcion,

            location:
                roomFound.ubicacion,

            services:
                roomFound.servicios,

            nightPrice:
                roomFound.precio,


            // =========================
            // RESERVATION DATA
            // =========================

            fechaCheckIn:
                checkIn,

            fechaCheckOut:
                checkOut,

            nights,

            totalPrice

        };




        // =========================
        // GUARDAR PRE RESERVA
        // =========================

        // Guardamos TODA la
        // información temporal
        // de la reserva

        localStorage.setItem(

            "preReservation",

            JSON.stringify(preReservation)

        );




        // =========================
        // USER NOW
        // =========================

        // Verificamos si hay
        // un usuario autenticado

        const userNow =
            localStorage.getItem(
                "userNow"
            );




        // =========================
        // VALIDACIÓN
        // =========================

        // Si existe userNow
        // enviamos a pagar

        if (userNow) {

            window.location.href =
                "irAPagar.html";

        }




        // =========================
        // NO HAY SESIÓN
        // =========================

        // Si no hay usuario
        // enviamos al registro

        else {

            window.location.href =
                "registro.html";

        }

    }

});

// =========================
// FUNCTIONS
// =========================

function startFilters() {

    // =========================
    // VALUES
    // =========================

    const checkIn =
        fechaCheckIn.value;

    const checkOut =
        fechaCheckOut.value;

    const people =
        Number(numeroDePersonas.value);


    // =========================
    // VALIDAR INPUTS
    // =========================

    // Si falta alguno
    // detenemos todo

    if (!checkIn || !checkOut || !people) {

        return;

    }


    // =========================
    // FILTRAR CAPACIDAD
    // =========================

    // Esta función devuelve
    // habitaciones compatibles
    // con la cantidad de personas

    const posiblesCandidatas =
        filtrarCapacidad(people);


    // =========================
    // FILTRAR DISPONIBLES
    // =========================

    // Aquí eliminamos
    // habitaciones sin stock

    const candidatasFinales =
        filtrarDisponibles(
            posiblesCandidatas
        );


    // =========================
    // RENDERIZAR
    // =========================

    renderRooms(candidatasFinales);

}

// =========================
// FILTRAR CAPACIDAD
// =========================

function filtrarCapacidad(people) {

    // =========================
    // OBTENER AVAILABILITY
    // =========================

    const availability =
        JSON.parse(
            localStorage.getItem("availability")
        ) || [];


    // =========================
    // FILTRAR HABITACIONES
    // =========================

    // filter devuelve
    // un nuevo array

    const posiblesCandidatas =
        availability.filter(room =>

            people >= room.capacidadMinima &&
            people <= room.capacidadMaxima

        );


    // =========================
    // RETURN
    // =========================

    return posiblesCandidatas;

}




// =========================
// FILTRAR DISPONIBLES
// =========================

function filtrarDisponibles(
    posiblesCandidatas
) {

    // =========================
    // FILTRAR STOCK
    // =========================

    // Solo dejamos
    // habitaciones que tengan
    // disponibilidad mayor a 0

    const candidatasFinales =
        posiblesCandidatas.filter(room =>

            room.cantidadDisponibles > 0

        );


    // =========================
    // RETURN
    // =========================

    return candidatasFinales;

}




// =========================
// RENDERIZAR HABITACIONES
// =========================

function renderRooms(
    candidatasFinales
) {

    // =========================
    // LIMPIAR CONTENEDOR
    // =========================

    roomsContainer.innerHTML = "";


    // =========================
    // RECORRER HABITACIONES
    // =========================

    candidatasFinales.forEach(room => {


        // =========================
        // CREAR TARJETAS
        // =========================

        roomsContainer.innerHTML += `

            <div class="roomCard">

                <h2>
                    ${room.tipo}
                </h2>

                <p>
                    ${room.descripcion}
                </p>

                <p>
                    ${room.ubicacion}
                </p>

                <p>
                    Precio:
                    ${room.precio}
                </p>

                <p>
                    Capacidad:
                    ${room.capacidadMinima}
                    -
                    ${room.capacidadMaxima}
                    personas
                </p>

                <p>
                    Disponibles:
                    ${room.cantidadDisponibles}
                </p>

                <p>
                    Servicios:
                    ${room.servicios.join(" • ")}
                </p>

                <button class="reserve" data-id="${room.id}">

                Reservar

                </button>

            </div>

        `;

    });

}


function verifCheckIn() {

    // =========================
    // FECHA DE HOY
    // =========================

    const today =
        new Date().toISOString().split("T")[0];


    // =========================
    // FECHA CHECK IN
    // =========================

    const checkIn =
        fechaCheckIn.value;


    // =========================
    // VALIDACIÓN
    // =========================

    if (checkIn <= today) {

        alert(
            "Es imposible hacer una reserva para hoy mismo o antes de hoy"
        );

        fechaCheckIn.value = "";

    }

}

function verifCheckOut() {

    // =========================
    // FECHA DE HOY
    // =========================

    const today =
        new Date().toISOString().split("T")[0];


    // =========================
    // FECHA CHECK OUT
    // =========================

    const checkOut =
        fechaCheckOut.value;


    // =========================
    // VALIDACIÓN
    // =========================

    if (checkOut <= today) {

        alert(
            "Es imposible que la fecha de tu checkout sea hoy mismo o antes de hoy"
        );

        fechaCheckOut.value = "";

    }

}

function coherence() {

    // =========================
    // FECHAS
    // =========================

    const checkIn =
        fechaCheckIn.value;

    const checkOut =
        fechaCheckOut.value;


    // =========================
    // VALIDAR EXISTENCIA
    // =========================

    if (!checkIn || !checkOut) {

        return;

    }


    // =========================
    // VALIDACIÓN
    // =========================

    if (checkOut <= checkIn) {

        alert(
            "La fecha de checkout debe ser posterior al checkin"
        );

        fechaCheckOut.value = "";

        return;

    }

}