const btnSignIn_dos =
    document.getElementById("btnSignIn_dos");


btnSignIn_dos.addEventListener("click", () => {

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

        alert("Bienvenido administrador")
        window.location.href =
        "admin.html";

    }


    if (role === "client") {

        alert("Bienvenido usuario")
        window.location.href =
        "client.html";
    }

});


function verifCredentials() {

    const identification =
        document.getElementById("idSignIn").value;

    const password =
        document.getElementById("passSignIn").value;


    // =========================
    // USERS
    // =========================

    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    // =========================
    // VERIFICACIÓN
    // =========================

    const userFound =
        users.find(user =>

            user.identification == identification &&
            user.password == password

        );


    // =========================
    // RESULTADO
    // =========================

    if (!userFound) {

        alert("Identificación o contraseña incorrecta");

        return;

    }


    // =========================
    // RETURN USER
    // =========================

    return userFound;

}

function roleVerification(user) {

    return user.role;

}


