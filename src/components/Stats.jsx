import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menucons1.scss';
import BaseLayout from './BaseLayout';

const Stats = () => {
	return (
        <BaseLayout>
            <main className="container-stats">
                {/* Header */}
                <header className="stats-header">
                    <h2>Estadísticas del Sistema</h2>
                    <div className="link-graficas">
                        <Link to="/graficas" className="btn">Gráficas</Link>
                    </div>
                </header>

                <section className="menu-registros-grid">
                    <div className="menu-item-card">
                        <div className="menu-summary-card">
                            <h3>Consumos</h3>
                            <div className="menu-stats">
                                <Link to="/metros-cubicos-facturados" className="btn">M³ Facturados</Link>
                                <Link to="/metros-cubicos-perdidos" className="btn">M³ Perdidos</Link>
                                <Link to="/eficiencia-bombeo" className="btn">Eficiencia de Bombeo</Link>
                                <Link to="/metros-cubicos-perdidos-porcentaje" className="btn">M³ Perdidos (%)</Link>
                                <Link to="/kwh-por-metro-cubico" className="btn">Kwh/m³ Diario</Link>
                                <Link to="/kwh-por-metro-cubico-mensual" className="btn">Kwh/m³ Mensual</Link>
                            </div>
                        </div>
                    </div>

                    <div className="menu-item-card">
                        <div className="menu-summary-card">
                            <h3>Bombeo</h3>
                            <div className="menu-stats">
                                <Link to="/contador-diario-bombeo" className="btn">Consumo de Bombeo Contador</Link>
                                <Link to="/consumo-mensual-bombeo" className="btn">Consumo Mensual de Bombeo</Link>
                                <Link to="/consumo-diario-bombeo" className="btn">Consumo de Bombeo</Link>
                                <Link to="/total-bombeo" className="btn">Reporte de Bombeo Total</Link>
                                <Link to="/total-bombeo-mensual" className="btn">Reporte de Bombeo Total Mensual</Link>
                            </div>
                        </div>
                    </div>

                    <div className="menu-item-card">
                        <div className="menu-summary-card">
                            <h3>Energía</h3>
                            <div className="menu-stats">
                                <Link to="/contador-diario-kwh" className="btn">Consumo de Energía Contador</Link>
                                <Link to="/consumo-mensual-kwh" className="btn">Consumo Mensual de Energía</Link>
                                <Link to="/consumo-diario-kwh" className="btn">Consumo de Energía</Link>
                                <Link to="/total-energia" className="btn">Reporte de Energía Total</Link>
                                <Link to="/total-energia-mensual" className="btn">Reporte de Energía Total Mensual</Link>
                            </div>
                        </div>
                    </div>

                    <div className="menu-item-card">
                        <div className="menu-summary-card">
                            <h3>Usuarios</h3>
                            <div className="menu-stats">
                                <Link to="/usuarios-totales" className="btn">Usuarios Totales</Link>
                                <Link to="/consumo-por-usuario" className="btn">Consumo por Usuario</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </BaseLayout>
	);
};

export default Stats;
