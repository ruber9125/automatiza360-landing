import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Metrics from './components/sections/Metrics';
import Problems from './components/sections/Problems';
import Benefits from './components/sections/Benefits';
import HowItWorks from './components/sections/HowItWorks';
import UseCases from './components/sections/UseCases';
import Testimonials from './components/sections/Testimonials';
import Faq from './components/sections/Faq';
import FinalCta from './components/sections/FinalCta';
import Footer from './components/sections/Footer';

/**
 * Orden de la landing.
 * Para reordenar secciones, mueve las líneas de abajo.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Problems />
        <Benefits />
        <HowItWorks />
        <UseCases />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
