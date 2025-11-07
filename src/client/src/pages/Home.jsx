import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/foto-hero.jpeg"
import img1 from "../assets/grid-1.jpeg";
import img2 from "../assets/grid-2.jpeg";
import img3 from "../assets/grid-3.jpeg";
import img4 from "../assets/grid-4.jpeg";
import img5 from "../assets/grid-5.jpeg";
import img6 from "../assets/grid-6.jpeg";
import img7 from "../assets/grid-7.jpeg";
import img8 from "../assets/grid-8.jpeg";

function Home() {

  return (
    <div className="home">
      <header className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Comida deliciosa y saludable te espera en Verde y Vital</h1>
          <p>Frescura, sabor y bienestar en cada plato.</p>
        </div>
      </header>

         <section className="comidas-section">
        <h2 className="comidas-title">¡Resolvemos tus comidas!</h2>

        <div className="comidas-grid">
          <img src={img1} alt="Comida saludable 1" />
          <img src={img2} alt="Comida saludable 2" />
          <img src={img3} alt="Comida saludable 3" />
          <img src={img4} alt="Comida saludable 4" />
          <img src={img5} alt="Comida saludable 5" />
          <img src={img6} alt="Comida saludable 6" />
          <img src={img7} alt="Comida saludable 7" />
          <img src={img8} alt="Comida saludable 8" />
        </div>

        <div className="comidas-boton">
          <Link to="/categories">
            <button>Ver todos los productos</button>
          </Link>
        </div>
      </section>

    </div>
  );
}


export default Home;