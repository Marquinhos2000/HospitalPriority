const contenedorPacientes = document.querySelector(".container_cards"); // Contiene todos los cards
const contenedorPacientesTbody = document.querySelector(".container_card_consultorio_table__tbody"); // Contiene el Tbody dónde se ingresará data
const finalizarBtnStatus = document.querySelector(".finalizar_btn");
const pasarBtnStatus = document.querySelectorAll(".ingresar_btn");
const consultorioStatus = document.querySelector(".contenedor_status p");
let arrPacientes = [];

cargarEventListeners()

function cargarEventListeners() {
    contenedorPacientes.addEventListener("click", agregarPaciente);
    finalizarBtnStatus.disabled = true;

    finalizarBtnStatus.addEventListener("click", finalizarConsulta);
}

function agregarPaciente(evt) {
    if(evt.target.classList.contains("ingresar_btn")) {
        const pacienteSeleccionado = evt.target.parentElement.parentElement;
        leerDatosPaciente(pacienteSeleccionado);
        botonPasarInhabilitar();
    }
}

function botonPasarInhabilitar() {
    pasarBtnStatus[0].disabled = true;
    pasarBtnStatus[1].disabled = true;
    pasarBtnStatus[2].disabled = true;
    pasarBtnStatus[3].disabled = true;
    pasarBtnStatus[4].disabled = true;
    finalizarBtnStatus.disabled = false;
    consultorioStatus.textContent = "Estado: Ocupado";
}

// Ejecutar cuando se de clic a finalizar
function finalizarConsulta() {
    pasarBtnStatus[0].disabled = false;
    pasarBtnStatus[1].disabled = false;
    pasarBtnStatus[2].disabled = false;
    pasarBtnStatus[3].disabled = false;
    pasarBtnStatus[4].disabled = false;
    finalizarBtnStatus.disabled = true;
    consultorioStatus.textContent = "Estado: Disponible";
    limpiarHTML();
}

// Revisar
function leerDatosPaciente(paciente) {
    const info_p = paciente.querySelectorAll('.info_paciente p');
    const button = paciente.querySelector('.ingresar_btn');

    const infoPaciente = {
        nombre: info_p[0].innerText,
        edad: info_p[1].innerText,
        temperatura: info_p[2].innerText,
        peso: info_p[3].innerText,
        id: button.getAttribute("data-id")
    }

    // Validar si un paciente ya existe dentro de un array
    const pacienteExiste = arrPacientes.some(paciente => paciente.id === infoPaciente.id);
    
    if(pacienteExiste == true) {
        const contenedorBtnPasar = document.querySelectorAll(".contenedor_ingresar_btn");
        button.remove();
        const row2 = document.createElement("div");
        row2.className = "row2";
        row2.innerHTML = `
            <p> Atendido </p>
        `
        contenedorBtnPasar[infoPaciente.id].appendChild(row2);
    }

    console.log(pacienteExiste);

    console.log(infoPaciente);
    arrPacientes = [infoPaciente];
    consultorioHTML(pacienteExiste);
}

function consultorioHTML(pacienteExiste) {

    if(pacienteExiste == true) {
        limpiarHTML();
    } else {
        arrPacientes.forEach(paciente => {
            const {nombre, edad, temperatura, peso} = paciente
            const row = document.createElement("tr");
            row.innerHTML = `
                <td> ${nombre} </td>
                <td> ${edad} </td>
                <td> ${temperatura} </td>
                <td> ${peso} </td>
            `
            // Agrega al TBODY el HTML generado
            contenedorPacientesTbody.appendChild(row);
            
        });
    }
}

function limpiarHTML() {
    while(contenedorPacientesTbody.firstChild) {
        contenedorPacientesTbody.removeChild(contenedorPacientesTbody.firstChild);
    }
}