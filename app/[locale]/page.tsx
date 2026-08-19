import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/home/HeroSection';
import MarqueeStrip from '@/components/sections/home/MarqueeStrip';

// Above the fold — imported statically so they SSR and paint immediately.
// Everything below is code-split into its own chunk and streamed in after
// hydration; `ssr: true` keeps the server-rendered HTML for SEO.

const IntroSection = dynamic(() => import('@/components/sections/home/IntroSection'));
const FeaturedProjectSection = dynamic(() => import('@/components/sections/home/FeaturedProjectSection'));
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
      {/* Who we are → what we just delivered → what we sell → where we are →
          who says so → the ask.

          The featured project sits directly under the positioning statement
          on purpose: IntroSection makes the claim (we own the factory), and
          the newest handover is the evidence for it. Claim then proof, before
          the page moves on to the catalogue. */}
      <HeroSection />
      <MarqueeStrip />
      <IntroSection />
      <FeaturedProjectSection />
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
