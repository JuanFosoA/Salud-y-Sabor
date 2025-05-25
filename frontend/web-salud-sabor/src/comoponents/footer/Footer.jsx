import "./StyleFooter.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-logo">
            <span>SALUD</span>
            <span>&</span>
            <span>SABOR</span>
          </div>
          <p className="footer-description">
            Salud y sabor es un sistema para especialistas y personas con una condición especial de salud. Permite a los
            especialistas crear recetas personalizadas para sus pacientes, y el paciente desde una app móvil podrá
            visualizar sus recetas y observar recetas de otras personas.
          </p>
        </div>
        <div className="footer-links">
          <h3>Enlaces</h3>
          <ul>
            <li>
              <a href="/contactos">• Contactos</a>
            </li>
            <li>
              <a href="/ayuda">• Ayuda</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2025</p>
      </div>
    </footer>
  )
}

export default Footer

