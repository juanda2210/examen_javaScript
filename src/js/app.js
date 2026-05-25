const usersDefault = [
    {
        identification: 1097489524,
        fullName: "Juan Arias",
        country: "Colombia",
        email: "juandarias2204@gmail.com",
        phoneNumber: 3007447034,
        password:"Juanda.2210",
        role: "admin" 
    }
];

const infoRoomsDefault = [
    {
        "id": 1,
        "ruta_imagen": "../images/estandar_king.jpeg",
        "tipo": "Estandar King",
        "cantidadDisponibles": 40,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": 1,
        "capacidadMaxima": 2,
        "precio": 220000,
        "servicios": [
        "WiFi",
        "TV",
        "Jacuzzi",
        "Mini bar"
        ]
    },

    {
        "id": 2,
        "ruta_imagen": "../images/estandar_double.jpeg",
        "tipo": "Estandar Double",
        "cantidadDisponibles": 40,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": 2,
        "capacidadMaxima": 4,
        "precio": 340000,
        "servicios": [
        "WiFi",
        "TV",
        "Jacuzzi",
        "Mini bar"
        ]    
    },

    {
        "id": 3,
        "ruta_imagen": "../images/ejecutiva_king.jpeg",
        "tipo": "Ejecutiva King",
        "cantidadDisponibles": 30,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": 1,
        "capacidadMaxima": 2,
        "precio": 420000,
        "servicios": [
        "WiFi",
        "TV",
        "Jacuzzi",
        "Mini bar"
        ]
    },

    {
        "id": 4,
        "ruta_imagen": "../images/habitacion_premium.jpeg",
        "tipo": "Habitacion premium",
        "cantidadDisponibles": 30,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": 2,
        "capacidadMaxima": 3,
        "precio": 520000,
        "servicios": [
        "WiFi",
        "TV",
        "Jacuzzi",
        "Mini bar"
        ]
    },

    {
        "id": 5,
        "ruta_imagen": "../images/apart_hotel.jpeg",
        "tipo": "Apart Hotel",
        "cantidadDisponibles": 30,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": 2,
        "capacidadMaxima": 4,
        "precio": 650000,
        "servicios": [
        "WiFi",
        "TV",
        "Jacuzzi",
        "Mini bar"
        ]
    },

    {
        "id": 6,
        "ruta_imagen": "../images/suite_junior.jpeg",
        "tipo": "Junior Suite",
        "cantidadDisponibles": 40,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": 2,
        "capacidadMaxima": 3,
        "precio": 780000,
        "servicios": [
        "WiFi",
        "TV",
        "Jacuzzi",
        "Mini bar"
        ]
    },

    {
        "id": 7,
        "ruta_imagen": "../images/suite_familiar.jpeg",
        "tipo": "Suite Familiar",
        "cantidadDisponibles": 20,
        "descripcion": "Ideal para familias",
        "ubicacion": "Torre Sur",
        "capacidadMinima": 4,
        "capacidadMaxima": 6,
        "precio": 1050000,
        "servicios": [
        "WiFi",
        "TV",
        "Cocina"
        ]
    },

    {
        "id": 8,
        "ruta_imagen": "../images/suite_presidencial.jpeg",
        "tipo": "Suite Presidencial",
        "cantidadDisponibles": 20,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": 4,
        "capacidadMaxima": 6,
        "precio": 2400000,
        "servicios": [
        "WiFi",
        "TV",
        "Jacuzzi",
        "Mini bar"
        ]
    },

    {
        "id": 9,
        "ruta_imagen": "../images/habitacion_premium.jpeg",
        "tipo": "Habitacion Accesible",
        "cantidadDisponibles": 20,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": 1,
        "capacidadMaxima": 2,
        "precio": 240000,
        "servicios": [
        "WiFi",
        "TV",
        "Jacuzzi",
        "Mini bar"
        ]
    }
];

function inicializarUsersDefault() {

    if (!localStorage.getItem("users")) {

        localStorage.setItem(
            "users",
            JSON.stringify(usersDefault)
        );

    }

}

function inicializarRoomsDefault() {

    if (!localStorage.getItem("rooms")) {

        localStorage.setItem(
            "rooms",
            JSON.stringify(infoRoomsDefault)
        );

    }

}

function inicializarAvailability() {
    
    if (!localStorage.getItem("availability")) {

        localStorage.setItem(
            "availability",
            JSON.stringify(infoRoomsDefault)
        );
    }
}

// =========================
// HERO BUTTONS
// =========================

const heroButtons =
    document.querySelector(
        ".heroButtons"
    );




// =========================
// USER NOW
// =========================

const userNow =
    JSON.parse(
        localStorage.getItem(
            "userNow"
        )
    );




inicializarUsersDefault();
inicializarRoomsDefault();
inicializarAvailability();
renderUserButtons();






// =========================
// RENDER USER
// =========================

function renderUserButtons() {

    // =========================
    // VALIDAR USER
    // =========================

    // Si no hay sesión
    // detenemos el proceso

    if (!userNow) {

        return;

    }




    // =========================
    // RENDER USER CONTAINER
    // =========================

    heroButtons.innerHTML = `

        <div class="userContainer">

            <p class="userGreeting">

                Hola,
                ${userNow.fullName}

            </p>


            <div class="userButtons">


                <!-- =========================
                     ADMIN PANEL
                ========================== -->

                ${userNow.role === "admin"

                    ?

                    `

                    <button id="btnAdminPanel">

                        Admin

                    </button>

                    `

                    :

                    ""

                }


                <!-- =========================
                     LOGOUT
                ========================== -->

                <button id="btnLogOut">

                    Cerrar sesión

                </button>

            </div>

        </div>

    `;

}


// =========================
// BTN LOCATION
// =========================

const btnLocation =
    document.getElementById(
        "btnLocation"
    );




// =========================
// EVENTO UBICACIÓN
// =========================

btnLocation.addEventListener(

    "click",

    () => {

        // =========================
        // REDIRECCIÓN
        // =========================

        window.location.href =
            "pag-03.html";

    }

);


// =========================
// EVENTOS USER
// =========================

document.addEventListener("click", (event) => {

    // =========================
    // LOG OUT
    // =========================

    if (event.target.id === "btnLogOut") {

        localStorage.removeItem(
            "userNow"
        );

        window.location.reload();

    }




    // =========================
    // ADMIN PANEL
    // =========================

    if (event.target.id === "btnAdminPanel") {

        window.location.href =
            "admin.html";

    }

});