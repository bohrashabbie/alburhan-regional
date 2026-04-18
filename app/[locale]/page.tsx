import HeroSection from '@/components/sections/home/HeroSection';
import BannerCarousel from '@/components/sections/home/BannerCarousel';
import IntroSection from '@/components/sections/home/IntroSection';
import PresenceSection from '@/components/sections/home/PresenceSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import ProductsSection from '@/components/sections/home/ProductsSection';
import BrandsSection from '@/components/sections/home/BrandsSection';
import FoundersSection from '@/components/sections/home/FoundersSection';
import CTASection from '@/components/sections/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BannerCarousel />
      <IntroSection />
      <PresenceSection />
      <ServicesSection />
      <ProductsSection />
      <BrandsSection />
      <FoundersSection />
      <CTASection />
    </>
  );
}
