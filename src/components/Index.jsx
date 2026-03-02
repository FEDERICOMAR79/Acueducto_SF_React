import '../styles/Index.scss';
import { Link } from 'react-router-dom'
import { getCurrentUser, mesesEspanol } from '../utils/session';

function Index() {
    // Ejemplo de datos, reemplaza por datos reales o props
    const usuarioLog = getCurrentUser();
    
    // Obtener fecha actual
    const fechaActual = new Date();
    const mes = mesesEspanol[fechaActual.getMonth()];
    const dia = fechaActual.getDate().toString();
    const total_energia = localStorage.getItem('datosPlantas') ? JSON.parse(localStorage.getItem('datosPlantas')).reduce((total, registro) => total + parseFloat(registro.valor), 0) : 0;
    const total_bombeo = localStorage.getItem('datosContadores') ? JSON.parse(localStorage.getItem('datosContadores')).reduce((total, registro) => total + parseFloat(registro.valor), 0) : 0;
    const total_rebombeo = 89;
    const variacion_ayer_vs_hoy = 5.2;
    const total_m3_facturados = localStorage.getItem('M3Facturados') ? JSON.parse(localStorage.getItem('M3Facturados')).reduce((total, registro) => total + parseFloat(registro.metros_cubicos), 0) : 0;
    const total_usuarios = 42;

    // Cargar últimos 5 registros de bombeo desde localStorage
    const ultimos_registros_bombeo = (() => {
        const registros = JSON.parse(localStorage.getItem('datosContadores') || '[]');
        return registros
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha descendente
            .slice(0, 5); // Tomar solo los últimos 5
    })();
    
    // Cargar últimos 5 registros de energía desde localStorage
    const ultimos_registros_energia = (() => {
        const registros = JSON.parse(localStorage.getItem('datosPlantas') || '[]');
        return registros
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .slice(0, 5);
    })();

    return (
        <main className="container">
            <header className="dashboard-header">
                <h1>Bienvenido, {usuarioLog}!</h1>
                <h2>Panel Principal</h2>
                <p>Este sistema te permite monitorear y gestionar el consumo de agua y energía del acueducto, registrar consumos, crear bombas y más.</p>
            </header>

            <section className="dashboard-summary">
                <div className="cards-container">
                    <div className="summary-card" id="index-card">
                        <h3>Consumo Energía {mes}</h3>
                        <p className="summary-value">{total_energia} kWh</p>
                    </div>
                    <div className="summary-card" id="index-card">
                        <h3>Bombeo {mes}</h3>
                        <p className="summary-value">{total_bombeo} m³</p>
                    </div>
                    <div className="summary-card" id="index-card">
                        <h3>Rebombeo {mes}</h3>
                        <p className="summary-value">{total_rebombeo} m³</p>
                    </div>
                    <div className="summary-card" id="index-card">
                        <h3>Variación ayer vs hoy {dia}</h3>
                        <p className="summary-value">{variacion_ayer_vs_hoy} %</p>
                    </div>
                    <div className="summary-card" id="index-card">
                        <h3>M3 Facturados {mes}</h3>
                        <p className="summary-value">{total_m3_facturados} m³</p>
                    </div>
                    <div className="summary-card" id="index-card">
                        <h3>Usuarios Totales {mes}</h3>
                        <p className="summary-value">{total_usuarios}</p>
                    </div>
                </div>
            </section>

            <div className="double-group">
                <section className="dashboard-actions">
                    <h2>Acciones rápidas</h2>
                    <div className="actions-grid">
                        <Link to="/plantas" className="action-btn">Registrar Energía</Link>
                        <Link to="/bombas" className="action-btn">Registrar Bombeo</Link>
                        <Link to="/consumo-m3-facturados" className="action-btn">Registrar M³ Facturados</Link>
                        <Link to="/registro_usuarios" className="action-btn">Registrar Usuarios</Link>
                    </div>
                </section>

                <section className="dashboard-latest">
                    <div className="table">
                        <h2>Últimos registros de bombeo</h2>
                        <table className="latest-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Tipo</th>
                                    <th>Bomba</th>
                                    <th>Consumo</th>
                                    <th>Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ultimos_registros_bombeo.length > 0 ? (
                                    ultimos_registros_bombeo.map((registro, idx) => (
                                        <tr key={idx}>
                                            <td>{registro.fecha}</td>
                                            <td>Bombeo</td>
                                            <td>{registro.bomba || 'N/A'}</td>
                                            <td>{registro.valor || registro.metros_cubicos} m³</td>
                                            <td>{registro.usuario || 'Local'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No hay registros recientes</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="table">
                        <h2>Últimos registros de energía</h2>
                        <table className="latest-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Tipo</th>
                                    <th>Planta</th>
                                    <th>Consumo</th>
                                    <th>Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ultimos_registros_energia.length > 0 ? (
                                    ultimos_registros_energia.map((registro, idx) => (
                                        <tr key={idx}>
                                            <td>{registro.fecha}</td>
                                            <td>Energía</td>
                                            <td>{registro.planta || 'N/A'}</td>
                                            <td>{registro.valor || registro.consumo_energia} kWh</td>
                                            <td>{registro.usuario || 'Local'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No hay registros recientes</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
export default Index;
