import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/home/HeroSection';

// Above-the-fold: HeroSection is imported statically so it SSRs instantly.
// Everything else is below the fold — load it only after the hero is painted.
// `ssr: true` keeps server-rendered HTML for SEO; the JS bundle for these
// sections is split into a separate chunk and streamed in after hydration.

const BannerCarousel = dynamic(() => import('@/components/sections/home/BannerCarousel'), {
  ssr: true,
});
const IntroSection = dynamic(() => import('@/components/sections/home/IntroSection'), {
  ssr: true,
});
const PresenceSection = dynamic(() => import('@/components/sections/home/PresenceSection'), {
  ssr: true,
});
const ServicesSection = dynamic(() => import('@/components/sections/home/ServicesSection'), {
  ssr: true,
});
const ProductsSection = dynamic(() => import('@/components/sections/home/ProductsSection'), {
  ssr: true,
});
const BrandsSection = dynamic(() => import('@/components/sections/home/BrandsSection'), {
  ssr: true,
});
const FoundersSection = dynamic(() => import('@/components/sections/home/FoundersSection'), {
  ssr: true,
});
const CTASection = dynamic(() => import('@/components/sections/home/CTASection'), {
  ssr: true,
});

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
