const express = require("express");
const path = require("node:path");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");

const {
  identificarSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");
const { crearRouterReservas } = require("./rutas/reservas");

function crearApp({ controladorReservas, formatoRegistro }) {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.use(expressLayouts);
  app.set("layout", "layouts/main");

  app.use(morgan(formatoRegistro));
  app.use(identificarSolicitud);
  app.use(medirDuracion);
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", controladorReservas.mostrarInicio);
  app.get("/estado", controladorReservas.obtenerEstado);

  app.use("/reservas", crearRouterReservas(controladorReservas));

  app.use((_req, res) => {
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "El recurso solicitado no existe.",
    });
  });

  return app;
}

module.exports = { crearApp };
