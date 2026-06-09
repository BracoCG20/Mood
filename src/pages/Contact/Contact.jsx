//src/pages/Contact/Contact.jsx
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ContactHero from '../../components/ContactHero/ContactHero';

const Contact = () => {
  return (
    <main>
      <Navbar />

      <ContactHero />

      {/* Puedes agregar un div con clase de fondo oscuro si quieres que el footer empalme igual que en MoodPrint */}
      <div style={{ backgroundColor: '#1c1c1e' }}>
        <Footer />
      </div>
    </main>
  );
};

export default Contact;
