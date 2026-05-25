const btnSignUp_dos =
    document.getElementById("btnSignUp_dos");

// =========================
// EVENTO REGISTRO
// =========================

btnSignUp_dos.addEventListener(

    "click",

    () => {

        // ======================================================
        // REGISTRAR USUARIO
        // ======================================================

        // Guardamos el usuario
        // dentro de localStorage

        saveRegisteredUser();




        // ======================================================
        // PRE RESERVATION
        // ======================================================

        // Verificamos si existe
        // una pre reservación

        const preReservation =
            localStorage.getItem(
                "preReservation"
            );




        // ======================================================
        // VALIDACIÓN
        // ======================================================

        // Si existe una
        // pre reservación
        // enviamos a pagar

        if (preReservation) {

            redirectionToPaying();

        }




        // ======================================================
        // NO PRE RESERVATION
        // ======================================================

        // Si NO existe una
        // pre reservación
        // enviamos al panel
        // del cliente

        else {

            window.location.href =
                "client.html";

        }

    }

);

function saveRegisteredUser() {

    // =========================
    // INPUTS
    // =========================

    const identification =
        document.getElementById("identification").value.trim();

    const fullName =
        document.getElementById("fullName").value.trim();

    const country =
        document.getElementById("country").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phoneNumber =
        document.getElementById("phoneNumber").value.trim();

    const password =
        document.getElementById("password").value.trim();


    // =========================
    // USERS
    // =========================

    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    // =========================
    // VALIDACIONES
    // =========================

    // Identification solo números

    if (isNaN(identification)) {

        alert("La identificación solo debe contener números");

        return;

    }


    // FullName solo letras

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(fullName)) {

        alert("El nombre completo solo debe contener letras");

        return;

    }


    // Country solo letras

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(country)) {

        alert("El país solo debe contener letras");

        return;

    }


    // Email válido

    if (!email.includes("@")) {

        alert("El correo electrónico no es válido");

        return;

    }


    // =========================
    // DUPLICADOS
    // =========================

    const identificationExists =
        users.some(user =>
            user.identification == identification
        );

    if (identificationExists) {

        alert("Este usuario ya está registrado");

        return;

    }


    const emailExists =
        users.some(user =>
            user.email == email
        );

    if (emailExists) {

        alert("Este email ya fue registrado anteriormente");

        return;

    }


    // =========================
    // NUEVO USUARIO
    // =========================

    const newUser = {

        identification: Number(identification),

        fullName,

        country,

        email,

        phoneNumber,

        password,

        role: "client"

    };


    // =========================
    // AGREGAR USUARIO
    // =========================

    users.push(newUser);


    // =========================
    // GUARDAR EN LOCALSTORAGE
    // =========================

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    // =========================
    // USER NOW
    // =========================

    // El usuario queda
    // autenticado automáticamente

    localStorage.setItem(

        "userNow",

        JSON.stringify(newUser)

    );



    // =========================
    // MENSAJE
    // =========================

    alert("Usuario registrado correctamente");

}

// ======================================================
// REDIRECTION TO PAYING
// ======================================================

function redirectionToPaying() {

    // ======================================================
    // USER NOW
    // ======================================================

    // Verificamos si existe
    // un usuario autenticado

    const userNow =
        localStorage.getItem(
            "userNow"
        );




    // ======================================================
    // VALIDACIÓN
    // ======================================================

    // Si existe userNow
    // redireccionamos

    if (userNow) {

        window.location.href =
            "irAPagar.html";

    }




    // ======================================================
    // NO USER
    // ======================================================

    // Si no existe
    // detenemos el proceso

    else {

        return;

    }

}

