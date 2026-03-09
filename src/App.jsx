import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Mascot from './components/Mascot'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <Mascot />
    </>
  )
}
