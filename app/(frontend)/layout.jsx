import Navbar from '@/components/ui/Navbar.jsx';
import Footer from '@/components/ui/Footer.jsx';

export default function FrontendLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}