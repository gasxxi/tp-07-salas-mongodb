const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

function crearControladorReservas(servicioReservas) {
  return {
    mostrarInicio(_req, res) {
      res.status(200).render("inicio", {
        titulo: "Inicio - Sistema de Reservas",
      });
    },

    obtenerEstado(_req, res) {
      res.status(200).json({
        servicio: "activo",
        cantidad: servicioReservas.contar(),
        solicitudId: res.locals.solicitudId,
      });
    },

    listar(_req, res) {
      const reservas = servicioReservas.obtenerTodas();
      res.status(200).render("reservas/lista", {
        titulo: "Listado de reservas",
        reservas,
      });
    },

    formularioNueva(_req, res) {
      res.status(200).render("reservas/nueva", {
        titulo: "Nueva reserva",
        error: null,
        valores: {},
        salasPermitidas,
        turnosPermitidos,
      });
    },

    mostrarDetalle(req, res) {
      const reserva = servicioReservas.obtenerPorId(req.params.id);
      if (!reserva) {
        return res.status(404).render("no-encontrado", {
          titulo: "Reserva no encontrada",
          mensaje: `No se encontró la reserva con ID ${req.params.id}`,
        });
      }
      res.status(200).render("reservas/detalle", {
        titulo: `Detalle de reserva #${reserva.id}`,
        reserva,
      });
    },

    crear(req, res) {
      servicioReservas.crear(req.reservaValidada);
      res.redirect(302, "/reservas");
    },
  };
}

module.exports = {
  crearControladorReservas,
  salasPermitidas,
  turnosPermitidos,
};
