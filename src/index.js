const { leerConfiguracion } = require("./config/entorno");
const { crearServicioReservas } = require("./servicios/reservas");
const { crearControladorReservas } = require("./controladores/reservas");
const { crearApp } = require("./app");

const semillaReservas = [
  {
    id: 1,
    estudiante: "Gonzalo Ramos",
    email: "gonzalo@ejemplo.com",
    sala: "A-101",
    fecha: "2026-10-20",
    turno: "Mañana",
    personas: 3,
  },
  {
    id: 2,
    estudiante: "Mariana Costa",
    email: "mariana@ejemplo.com",
    sala: "B-202",
    fecha: "2026-10-21",
    turno: "Tarde",
    personas: 2,
  },
  {
    id: 3,
    estudiante: "Lucas Benítez",
    email: "lucas@ejemplo.com",
    sala: "C-303",
    fecha: "2026-10-22",
    turno: "Noche",
    personas: 4,
  },
  {
    id: 4,
    estudiante: "Sofía Albarracín",
    email: "sofia@ejemplo.com",
    sala: "D-404",
    fecha: "2026-10-23",
    turno: "Tarde",
    personas: 1,
  },
];

function main() {
  const { puerto, formatoRegistro } = leerConfiguracion();
  const servicioReservas = crearServicioReservas(semillaReservas);
  const controladorReservas = crearControladorReservas(servicioReservas);
  const app = crearApp({ controladorReservas, formatoRegistro });

  app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
  });
}

main();
