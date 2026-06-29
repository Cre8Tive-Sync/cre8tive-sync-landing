import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Values from "./components/Values";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BlackholeBackground from "./components/BlackholeBackground";

const LandingPage: React.FC = () => {
  return (
    <div>
      <BlackholeBackground started={true} />
      <Header loaded={true} />
      <main>
        <Hero loaded={true} />
        <Values />
        <Projects />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
