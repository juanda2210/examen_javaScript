const containerDatos = document.getElementById("containerDatos")


function renderDatosFactura() {
    const factura = JSON.parse (localStorage.getItem("factura"))




    if (!factura) {
        containerDatos.innerHTML = `

                <h2>
                    No hay ninguna reservación pendiente
                </h2>

                <p>
                    Primero debes seleccionar
                    una habitación.
                </p>

            `;

            return;

    }


    containerDatos.innerHTML = `

        <div class="facturaCard">

            <h2>
                ${factura.roomType}
            </h2>

            <p>
                Usuario:
                ${factura.clientName}
            </p>

            <p>
                Identificacion:
                ${factura.identification}
            </p>

            <p>
                Precio por noche:
                ${factura.nightPrice}
            </p>

            <p>
                Check In:
                ${factura.fechaCheckIn}
            </p>

            <p>
                Check Out:
                ${factura.fechaCheckOut}
            </p>

            <p>
                Noches:
                ${factura.nights}
            </p>

            <p>
                Total a pagar:
                ${factura.totalPrice}
            </p>


            <!-- =========================
                 BOTONES
            ========================== -->

            <div class="buttonsContainer">

                <button

                    class="printReservation"

                    id="printReservation"

                >

                    Imprimir

                </button>

            </div>

        </div>

    `;

}