const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

function prepararAreaReservas(_req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

function validarReserva(req, res, next) {
  const valores = req.body ?? {};
  const estudiante = String(valores.estudiante ?? "").trim();
  const email = String(valores.email ?? "").trim();
  const sala = String(valores.sala ?? "").trim();
  const fecha = String(valores.fecha ?? "").trim();
  const turno = String(valores.turno ?? "").trim();
  const personas = Number(valores.personas);

  const esValido =
    estudiante &&
    fecha &&
    email.includes("@") &&
    salasPermitidas.includes(sala) &&
    turnosPermitidos.includes(turno) &&
    Number.isInteger(personas) &&
    personas >= 1 &&
    personas <= 6;

  if (!esValido) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error:
        "Por favor revisá los datos. Completá todos los campos correctamente.",
      valores,
      salasPermitidas,
      turnosPermitidos,
    });
  }

  req.reservaValidada = {
    estudiante,
    email,
    sala,
    fecha,
    turno,
    personas,
  };

  next();
}

module.exports = {
  prepararAreaReservas,
  validarReserva,
};
