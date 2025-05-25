import "./StyleContent.css";
import imageApp from '../../assets/images/phone.png'
import playStore from '../../assets/images/playStore.png'

function Content() {
  return (
    <div className="contenedor-principal">
      <div className="contenedor-izquierdo">
        <h1>Las recetas para tus <br />pacientes en una App</h1>
        <p>
          Descubre y comparte deliciosas recetas personalizadas.
          Explora las creaciones de otros usuarios y accede a recomendaciones
          especializadas adaptadas a tus necesidades. ¡Inspírate y disfruta de una
          alimentación más saludable!
        </p>
          <img className="boton-googleplay"
            src={playStore}
            alt="Disponible en Google Play"
          />
      </div>
      <div className="contenedor-derecho">
        <img src={imageApp} alt="App Salud y Sabor" className="imagen-app" />
      </div>
    </div>
  );
}

export default Content;
