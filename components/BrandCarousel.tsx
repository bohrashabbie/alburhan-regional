'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function BrandCarousel() {
  const theme = useTheme();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 960px

  // Brand images array (excluding featured brands: brand6, brand4, brand3, kosla_page-0001)
  const brands = [
    '/Brands/brand1.png',
    '/Brands/brand2.png',
    '/Brands/brand5.png',
    '/Brands/brand7.png',
    '/Brands/brand8.png',
    '/Brands/brand9new.jpeg',
    '/Brands/brand10.png',
    '/Brands/brand11.png',
    '/Brands/brand12.png',
    '/Brands/brand13.png',
  ];

  // Show 5 images on desktop, 3 on mobile
  const visibleItems = isMobile ? 3 : 5;
  // Start at brands.length to be in the middle of extended array for seamless loop
  const [currentIndex, setCurrentIndex] = useState(brands.length);
  const [isResetting, setIsResetting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide functionality - move one image every 3 seconds with infinite loop
  // English: slides right to left (forward direction)
  // Arabic: slides left to right (backward direction)
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          // English: move forward (right to left visually)
          // Arabic: move backward (left to right visually)
          const direction = isRTL ? -1 : 1;
          const nextIndex = prevIndex + direction;
          
          // English: If we've reached the end of the second cycle, reset to start of second cycle
          // This creates a seamless infinite loop (visually identical position)
          if (!isRTL && nextIndex >= brands.length * 2) {
            // Set flag for instant transition
            setIsResetting(true);
            // Reset to brands.length (start of second cycle) instantly
            // Reset flag after transition completes
            setTimeout(() => setIsResetting(false), 100);
            return brands.length;
          }
          
          // Arabic: If we've gone below 0, reset to end of second cycle
          if (isRTL && nextIndex < 0) {
            setIsResetting(true);
            setTimeout(() => setIsResetting(false), 100);
            return brands.length * 2 - 1;
          }
          
          return nextIndex;
        });
      }, 3000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [brands.length, isRTL]);

  // Create extended array for infinite loop
  const extendedBrands = [...brands, ...brands, ...brands, ...brands];
  
  // No gap between cards
  const gapSize = 0;
  
  // Calculate item width - 40% of original width
  // Original: 100% / visibleItems
  // 40% of original: 40% / visibleItems
  const itemWidthPercent = `calc(40% / ${visibleItems})`;
  
  // Calculate transform - move one item at a time
  // English: slides right to left (negative transform)
  // Arabic: slides left to right (positive transform)
  const moveDistance = itemWidthPercent;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        mx: 'auto',
        pt: 0,
        pb: { xs: 1, sm: 1.5, md: 2 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          component={motion.div}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 0,
            willChange: 'transform',
          }}
          animate={{
            // English: slides right to left (negative transform moves left)
            // Arabic: slides left to right (positive transform moves right)
            x: isRTL ? `calc(${currentIndex} * ${moveDistance})` : `calc(-${currentIndex} * ${moveDistance})`,
          }}
          transition={{
            duration: isResetting ? 0 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {extendedBrands.map((brand, index) => (
            <Box
              key={`${brand}-${index}`}
              sx={{
                flexShrink: 0,
                width: itemWidthPercent,
                height: {
                  xs: 120,
                  sm: 140,
                  md: 160,
                  lg: 180,
                },
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                backgroundColor: 'background.default',
                p: { xs: 2, sm: 2.5, md: 3 },
                boxShadow: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  backgroundColor: 'background.paper',
                },
              }}
            >
              <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                fill
                style={{
                  objectFit: 'contain',
                  padding: '12px',
                }}
                sizes={isMobile ? '(max-width: 960px) 33vw' : '(max-width: 1280px) 20vw, 20vw'}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}