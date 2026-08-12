import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/home/HeroSection';
import MarqueeStrip from '@/components/sections/home/MarqueeStrip';

// Above the fold — imported statically so they SSR and paint immediately.
// Everything below is code-split into its own chunk and streamed in after
// hydration; `ssr: true` keeps the server-rendered HTML for SEO.

const IntroSection = dynamic(() => import('@/components/sections/home/IntroSection'));
const RangeSection = dynamic(() => import('@/components/sections/home/RangeSection'));
const BannerCarousel = dynamic(() => import('@/components/sections/home/BannerCarousel'));
const PresenceSection = dynamic(() => import('@/components/sections/home/PresenceSection'));
const ServicesSection = dynamic(() => import('@/components/sections/home/ServicesSection'));
const BrandsSection = dynamic(() => import('@/components/sections/home/BrandsSection'));
const FoundersSection = dynamic(() => import('@/components/sections/home/FoundersSection'));
const CTASection = dynamic(() => import('@/components/sections/home/CTASection'));

export default function Home() {
  return (
    <>
      {/* What we do → what we sell → where we are → who says so → the ask */}
      <HeroSection />
      <MarqueeStrip />
      <IntroSection />
      <RangeSection />
      <BannerCarousel />
      <ServicesSection />
      <PresenceSection />
      <BrandsSection />
      <FoundersSection />
      <CTASection />
    </>
  );
}
