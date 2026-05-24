import { 
    saveRegisteredUser,
 } from "./signUp_toRegistro.js";

 import {
    verifCredentials,
    roleVerification
 } from "./signIn.js"


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
        "tipo": "Estandar King",
        "cantidadDisponibles": 40,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": "1",
        "capacidadMaxima": "2",
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
        "tipo": "Estandar Double",
        "cantidadDisponibles": 40,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": "2",
        "capacidadMaxima": "4",
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
        "tipo": "Ejecutiva King",
        "cantidadDisponibles": 30,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": "1",
        "capacidadMaxima": "2",
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
        "tipo": "Habitacion premium",
        "cantidadDisponibles": 30,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": "2",
        "capacidadMaxima": "3",
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
        "tipo": "Apart Hotel",
        "cantidadDisponibles": 30,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": "2",
        "capacidadMaxima": "4",
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
        "tipo": "Junior Suite",
        "cantidadDisponibles": 40,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": "2",
        "capacidadMaxima": "3",
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
        "tipo": "Suite Familiar",
        "cantidadDisponibles": 20,
        "descripcion": "Ideal para familias",
        "ubicacion": "Torre Sur",
        "capacidadMinima": "4",
        "capacidadMaxima": "6",
        "precio": 1050000,
        "servicios": [
        "WiFi",
        "TV",
        "Cocina"
        ]
    },

    {
        "id": 8,
        "tipo": "Suite Presidencial",
        "cantidadDisponibles": 20,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": "4",
        "capacidadMaxima": "6",
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
        "tipo": "Habitacion Accesible",
        "cantidadDisponibles": 20,
        "descripcion": "Habitación amplia con vista al mar",
        "ubicacion": "Torre Norte",
        "capacidadMinima": "1",
        "capacidadMaxima": "2",
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

function removeUserNow() {

    // =========================
    // ELIMINAR USER NOW
    // =========================

    localStorage.removeItem(
        "userNow"
    );

}


inicializarUsersDefault();
inicializarRoomsDefault();
inicializarAvailability();


const btnSignUp =
    document.getElementById("btnSignUp");


btnSignUp.addEventListener("click", () => {

    saveRegisteredUser();

});

const btnSignIn =
    document.getElementById("btnSignIn");


btnSignIn.addEventListener("click", () => {

    const userFound = verifCredentials();

    // =========================
    // VALIDAR USER
    // =========================

    if (!userFound) {

        return;

    }


    // =========================
    // USER NOW
    // =========================

    localStorage.setItem(
        "userNow",
        JSON.stringify(userFound)
    );

    // =========================
    // ROLE
    // =========================

    const role =
        roleVerification(userFound);


    // =========================
    // REDIRECCIONES
    // =========================

    if (role === "admin") {

        window.location.href =
        "admin.html";

    }


    if (role === "client") {

        window.location.href =
        "client.html";
    }

});

document.addEventListener("click", (event) => {

    if (event.target.id === "btnLogOut") {

        removeUserNow();

    }

});

export {
    removeUserNow
}