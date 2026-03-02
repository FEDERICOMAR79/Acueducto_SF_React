import { useMemo, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.css";
import "../styles/consumo.scss";
import "../styles/datepicker-custom.scss";
import "../styles/monthSelect.scss";

const tiposPorDefecto = [
  { id: 1, tipo_usuario: "Acueducto Norte" },
  { id: 2, tipo_usuario: "Acueducto Sur" },
];

const AgregarUsuarios = () => {
  const [fechaActual, setFechaActual] = useState(() => {
    const hoy = new Date();
    return hoy.toISOString().slice(0, 7);
  });

  const tiposUsuarios = useMemo(() => {
    const ls = JSON.parse(localStorage.getItem("tiposUsuarios") || "[]");
    if (!Array.isArray(ls) || ls.length === 0) return tiposPorDefecto;

    return ls.map((t, idx) => ({
      id: t.id ?? t.tipo_id ?? idx + 1,
      tipo_usuario: t.tipo_usuario ?? t.nombre ?? `Tipo ${idx + 1}`,
    }));
  }, []);

  const [valores, setValores] = useState(() => {
    const initial = {};
    tiposUsuarios.forEach((t) => {
      initial[t.id] = "";
    });
    return initial;
  });

  const handleInputChange = (tipoId, value) => {
    setValores((prev) => ({ ...prev, [tipoId]: value }));
  };

  const changeByStep = (tipoId, step) => {
    const actual = Number(valores[tipoId] || 0);
    const siguiente = Math.max(0, actual + step);
    setValores((prev) => ({ ...prev, [tipoId]: String(siguiente) }));
  };

  const cambiarMes = (delta) => {
    const [year, month] = fechaActual.split("-").map(Number);
    let newMonth = month + delta;
    let newYear = year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    setFechaActual(`${newYear}-${String(newMonth).padStart(2, "0")}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registros = JSON.parse(localStorage.getItem("datosUsuarios") || "[]");

    tiposUsuarios.forEach((tipo) => {
      const valor = Number(valores[tipo.id] || 0);
      registros.push({
        id: Date.now() + tipo.id,
        fecha: fechaActual,
        tipo_id: tipo.id,
        tipo_usuario: tipo.tipo_usuario,
        usuarios: valor,
      });
    });

    localStorage.setItem("datosUsuarios", JSON.stringify(registros));
    alert(`Usuarios registrados para ${fechaActual}`);
  };

  return (
    <>
      <div className="periodo-header">
        <header>
          <h1>Registro de Usuarios</h1>
        </header>

        <div className="periodo-actual usuarios-periodo">
          <span style={{ display: "inline" }}>Registrando datos para:</span>
          <form id="form-fecha" style={{ display: "inline" }}>
            <Flatpickr
              id="monthpicker-usuarios"
              name="fecha"
              className="flatpickr-input"
              value={fechaActual}
              onChange={(_selectedDates, dateStr) => {
                if (dateStr) setFechaActual(dateStr);
              }}
              options={{
                locale: Spanish,
                dateFormat: "Y-m",
                allowInput: false,
                disableMobile: true,
                plugins: [
                  monthSelectPlugin({
                    shorthand: true,
                    dateFormat: "Y-m",
                    altFormat: "F Y",
                  }),
                ],
              }}
            />
          </form>
        </div>
      </div>

      <div className="bombas-grid">
        <form onSubmit={handleSubmit}>
          {tiposUsuarios.map((user) => (
            <div className="summary-card" key={user.id}>
              <h3>
                Usuarios {user.tipo_usuario} de {fechaActual}
              </h3>

              <div className="input-group">
                <button
                  type="button"
                  className="btn-decrement"
                  onClick={() => changeByStep(user.id, -1)}
                >
                  -
                </button>
                <input
                  type="number"
                  name={`usuarios_${user.id}`}
                  id={`usuarios_${user.id}`}
                  placeholder=" "
                  value={valores[user.id] ?? ""}
                  onChange={(e) => handleInputChange(user.id, e.target.value)}
                  min="0"
                />
                <label htmlFor={`usuarios_${user.id}`}>
                  Usuarios {user.tipo_usuario}
                </label>
                <button
                  type="button"
                  className="btn-increment"
                  onClick={() => changeByStep(user.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="form-submit">
            <button type="button" onClick={() => cambiarMes(-1)}>
              mes anterior
            </button>
            <button type="submit" className="registrar-btn">
              Registrar usuarios
            </button>
            <button type="button" onClick={() => cambiarMes(1)}>
              mes siguiente
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AgregarUsuarios;
