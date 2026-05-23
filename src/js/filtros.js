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

        const roomId =
            event.target.dataset.id;


        // =========================
        // USER NOW
        // =========================

        const userNow =
            localStorage.getItem("userNow");


        // =========================
        // VALIDACIÓN
        // =========================

        if (userNow) {

            window.location.href =
                "irAPagar.html";

        }


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

                <button class="reserve" data-id="${room.id}>

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