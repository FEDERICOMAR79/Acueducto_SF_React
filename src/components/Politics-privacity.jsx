import React from 'react';

const PoliticsPrivacity = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Política de Privacidad</h1>
      <p style={styles.updated}><strong>Última actualización:</strong> 16 de marzo de 2026</p>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>1. Introducción</h2>
      <p style={styles.text}>
        Esta Política de Privacidad describe cómo <strong>Acueducto SF</strong> ("la Aplicación")
        recopila, usa y protege la información de los usuarios.
      </p>
      <p style={styles.text}>Al usar la Aplicación, aceptas las prácticas descritas en este documento.</p>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>2. Información que recopilamos</h2>
      <p style={styles.text}>La Aplicación puede almacenar información ingresada por el usuario para su funcionamiento, incluyendo:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Datos de acceso (por ejemplo, nombre de usuario y contraseña).</li>
        <li style={styles.listItem}>Registros operativos ingresados en la app (por ejemplo, consumos de energía, bombeo, usuarios y métricas relacionadas).</li>
        <li style={styles.listItem}>Información de uso necesaria para mostrar reportes y estadísticas dentro de la propia app.</li>
      </ul>
      <div style={styles.note}>
        <strong>Importante:</strong> Actualmente, los datos se utilizan para el funcionamiento interno de la Aplicación.
      </div>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>3. Cómo usamos la información</h2>
      <p style={styles.text}>Usamos la información para:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Permitir autenticación e inicio de sesión.</li>
        <li style={styles.listItem}>Registrar y visualizar datos operativos del sistema.</li>
        <li style={styles.listItem}>Generar resúmenes y estadísticas dentro de la app.</li>
        <li style={styles.listItem}>Mejorar la experiencia de uso y estabilidad de la Aplicación.</li>
      </ul>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>4. Almacenamiento de datos</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>La información se almacena localmente en el dispositivo del usuario.</li>
        <li style={styles.listItem}>No se vende información personal a terceros.</li>
        <li style={styles.listItem}>No se comparte información con terceros, salvo obligación legal.</li>
      </ul>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>5. Servicios de terceros</h2>
      <p style={styles.text}>
        En la versión actual, la Aplicación <strong>no integra</strong> servicios de publicidad
        comportamental ni venta de datos personales.
      </p>
      <p style={styles.text}>
        Si en futuras versiones se incorporan servicios de terceros (analítica, nube, etc.),
        esta Política se actualizará para reflejarlo.
      </p>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>6. Seguridad</h2>
      <p style={styles.text}>
        Tomamos medidas razonables para proteger la información almacenada en la Aplicación.
        Sin embargo, ningún método de almacenamiento o transmisión es 100% seguro.
      </p>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>7. Privacidad de menores</h2>
      <p style={styles.text}>
        La Aplicación no está dirigida a menores de 13 años.
        No recopilamos intencionalmente datos personales de menores.
      </p>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>8. Derechos del usuario</h2>
      <p style={styles.text}>Puedes solicitar:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Acceso a tu información.</li>
        <li style={styles.listItem}>Corrección de datos.</li>
        <li style={styles.listItem}>Eliminación de datos almacenados, cuando aplique.</li>
      </ul>
      <p style={styles.text}>Para ejercer estos derechos, contáctanos usando la información de la sección 10.</p>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>9. Cambios a esta política</h2>
      <p style={styles.text}>
        Podemos actualizar esta Política de Privacidad ocasionalmente.
        Cualquier cambio será publicado en esta misma página con la fecha de actualización correspondiente.
      </p>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>10. Contacto</h2>
      <p style={styles.text}>Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos en:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Responsable:</strong> [NOMBRE DEL RESPONSABLE / ORGANIZACIÓN]</li>
        <li style={styles.listItem}><strong>Correo electrónico:</strong> [CORREO@EJEMPLO.COM]</li>
        <li style={styles.listItem}><strong>País:</strong> [PAÍS]</li>
      </ul>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>11. Consentimiento</h2>
      <p style={styles.text}>
        Al usar la Aplicación, confirmas que has leído y aceptado esta Política de Privacidad.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px 24px',
    fontFamily: 'sans-serif',
    color: '#1a1a1a',
    lineHeight: '1.7',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '8px',
  },
  updated: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '16px',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '24px',
    marginBottom: '8px',
  },
  text: {
    marginBottom: '12px',
    fontSize: '1rem',
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '12px',
  },
  listItem: {
    marginBottom: '6px',
    fontSize: '1rem',
  },
  note: {
    backgroundColor: '#f0f4ff',
    borderLeft: '4px solid #4a6cf7',
    padding: '12px 16px',
    borderRadius: '4px',
    marginBottom: '12px',
    fontSize: '0.95rem',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e0e0e0',
    margin: '24px 0',
  },
};

export default PoliticsPrivacity;
