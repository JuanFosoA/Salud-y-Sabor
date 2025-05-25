import "./StyleHeader.css"

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <div className="logo-text">
            <span>SALUD</span>
            <div className="logo-and">
              <span>&</span>
              <span>SABOR</span>
            </div>
          </div>
        </a>
      </div>
      <a href="/login" className="login-button">
        Iniciar Sesión
      </a>
    </header>
  )
}

export default Header

