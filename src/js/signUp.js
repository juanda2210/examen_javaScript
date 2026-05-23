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
    // MENSAJE
    // =========================

    alert("Usuario registrado correctamente");

}

export {
    saveRegisteredUser
}