import {
    removeUserNow
} from "../js/app.js"

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