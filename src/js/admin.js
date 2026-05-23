import {
    removeUserNow
} from "../js/app.js"

const roomsContainer =
    document.getElementById("roomsContainer");


const rooms =
    JSON.parse(localStorage.getItem("rooms")) || [];


function renderRooms() {

    roomsContainer.innerHTML = "";


    rooms.forEach((room, index) => {

        roomsContainer.innerHTML += `

            <div class="roomCard">

                <h2>${room.name}</h2>

                <p>
                    Precio:
                    ${room.price}
                </p>

                <p>
                    Capacidad:
                    ${room.capacity}
                </p>

                <p>
                    ${room.description}
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
                value="${room.name}"
            >

            <input
                id="roomPrice"
                value="${room.price}"
            >

            <input
                id="roomCapacity"
                value="${room.capacity}"
            >

            <textarea
                id="roomDescription"
            >${room.description}</textarea>

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

        const roomCapacity =
            document.getElementById("roomCapacity").value;

        const roomDescription =
            document.getElementById("roomDescription").value;


        // =========================
        // SOBREESCRIBIR ROOMS
        // =========================

        rooms[index].name =
            roomName;

        rooms[index].price =
            roomPrice;

        rooms[index].capacity =
            roomCapacity;

        rooms[index].description =
            roomDescription;


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

const btnLogOut =
    document.getElementById("btnLogOut");


btnLogOut.addEventListener("click", () => {

    // =========================
    // REMOVE USER
    // =========================

    removeUserNow();


    // =========================
    // REDIRECCIÓN
    // =========================

    window.location.href =
        "index.html";

});

renderRooms();