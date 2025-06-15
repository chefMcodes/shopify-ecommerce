import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import BestSelling from './_partials/BestSelling';
import FashionParadise from './_partials/FashionParadise';
import HeroSection from './_partials/HeroSection';
import Latest from './_partials/Latest';
import NewsLetter from '../../components/NewsLetter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BestSelling />
      <FashionParadise />
      <Latest />
      <NewsLetter />
      <Footer />
    </>
  );
}
