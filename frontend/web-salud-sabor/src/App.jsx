import CarouselComponent from "./comoponents/carousel/Carousel"
import Content from "./comoponents/content/Content"
import Footer from "./comoponents/footer/Footer"
import Header from "./comoponents/header/Header"

function App(){
  return (
    <div>
      <Header/>
      <main>
        <CarouselComponent/>
        <Content/>
      </main>
      <Footer/>
    </div>
)
}

export default App