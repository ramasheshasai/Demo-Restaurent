import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Events from './components/Events'
import Testimonials from './components/Testimonials'
import Instagram from './components/Instagram'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Events />
        <Testimonials />
        <Instagram />
      </main>
      <Footer />
    </div>
  )
}
