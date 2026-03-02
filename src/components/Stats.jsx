import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menucons1.scss';

const Stats = () => {
	return (
            <main className="container-stats">
                {/* Header */}
                <header className="stats-header">
                    <h2>Estadísticas del Sistema</h2>
                </header>

                <section className="menu-registros-grid">
                    <div className="menu-item-card">
                        <div className="menu-summary-card">
                            <h3>Consumos</h3>
                            <div className="menu-stats">
                                <Link to="/metros-cubicos-facturados" className="btn">M³ Facturados</Link>
                                <Link to="/metros-cubicos-perdidos" className="btn">M³ Perdidos</Link>
                                <Link to="/eficiencia-bombeo" className="btn">Eficiencia de Bombeo</Link>
                            </div>
                        </div>
                    </div>

                    <div className="menu-item-card">
                        <div className="menu-summary-card">
                            <h3>Bombeo</h3>
                            <div className="menu-stats">
                                <Link to="/ContadorDiarioBombeo" className="btn">Consumo de Bombeo Contador</Link>
                                <Link to="/consumo-mensual-bombeo" className="btn">Consumo Mensual de Bombeo</Link>
                                <Link to="/ConsumoDiarioBombeo" className="btn">Consumo de Bombeo</Link>
                            </div>
                        </div>
                    </div>

                    <div className="menu-item-card">
                        <div className="menu-summary-card">
                            <h3>Energía</h3>
                            <div className="menu-stats">
                                <Link to="/ContadorDiarioKwh" className="btn">Consumo de Energía Contador</Link>
                                <Link to="/consumo-mensual-kwh" className="btn">Consumo Mensual de Energía</Link>
                                <Link to="/ConsumoDiarioKwh" className="btn">Consumo de Energía</Link>
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
	);
};

export default Stats;
