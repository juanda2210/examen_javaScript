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


export {
    verifCredentials,
    roleVerification
}