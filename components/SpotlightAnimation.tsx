'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface SpotlightAnimationProps {
  onAnimationComplete?: () => void;
}

interface SlideData {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const SpotlightAnimation: React.FC<SpotlightAnimationProps> = ({ onAnimationComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const t = useTranslations();

  const slides: SlideData[] = [
    {
      image: '/Projects/alburhan1.jpg',
      title: t('carousel.slide1.title'),
      subtitle: t('carousel.slide1.subtitle'),
      description: t('carousel.slide1.description'),
    },
    {
      image: '/Projects/alburhan2.jpg',
      title: t('carousel.slide2.title'),
      subtitle: t('carousel.slide2.subtitle'),
      description: t('carousel.slide2.description'),
    },
    {
      image: '/Projects/alburhan3.jpg',
      title: t('carousel.slide3.title'),
      subtitle: t('carousel.slide3.subtitle'),
      description: t('carousel.slide3.description'),
    },
    {
      image: '/Projects/alburhan4.jpg',
      title: t('carousel.slide4.title'),
      subtitle: t('carousel.slide4.subtitle'),
      description: t('carousel.slide4.description'),
    },
    {
      image: '/Projects/alburhan5.jpg',
      title: t('carousel.slide5.title'),
      subtitle: t('carousel.slide5.subtitle'),
      description: t('carousel.slide5.description'),
    },
    {
      image: '/Projects/alburhan6.jpg',
      title: t('carousel.slide6.title'),
      subtitle: t('carousel.slide6.subtitle'),
      description: t('carousel.slide6.description'),
    },
    {
      image: '/Projects/alburhan7.jpg',
      title: t('carousel.slide7.title'),
      subtitle: t('carousel.slide7.subtitle'),
      description: t('carousel.slide7.description'),
    },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Call onAnimationComplete after first slide animation
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  // Smooth crossfade variants - images fade in/out without sliding
  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.05,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
    },
  };

  const textVariants = {
    initial: {
      y: 60,
      opacity: 0,
      filter: 'blur(10px)',
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: 0.15,
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      filter: 'blur(5px)',
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const childTextVariants = {
    initial: {
      y: 40,
      opacity: 0,
      filter: 'blur(8px)',
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      filter: 'blur(5px)',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const descriptionVariants = {
    initial: {
      y: 30,
      opacity: 0,
      filter: 'blur(6px)',
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: {
      y: -15,
      opacity: 0,
      filter: 'blur(5px)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        overflow: 'hidden',
        backgroundColor: '#000000',
        pt: { xs: 8, md: 10 },
      }}
    >
      {/* Image Backgrounds with Smooth Crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              priority={currentSlide === 0}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              sizes="100vw"
              quality={90}
            />
            
            {/* Subtle overlay for better text visibility */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 100%)',
                zIndex: 1,
              }}
            />
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Text Content with Smooth Animations */}
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: { xs: 'center', md: 'flex-start' },
          pb: { xs: 6, md: 10 },
          zIndex: 3,
          px: { xs: 3, md: 4 },
        }}
      >
        <AnimatePresence mode="wait">
          <Box
            component={motion.div}
            key={`text-${currentSlide}`}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: { xs: '100%', md: '800px' },
              width: '100%',
            }}
          >
            <motion.div variants={childTextVariants}>
              <Typography
                variant={isMobile ? 'h2' : 'h1'}
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem', lg: '4.5rem' },
                  color: '#f5f5f5',
                  mb: { xs: 1.5, md: 2 },
                  textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                  letterSpacing: { xs: '-0.01em', md: '-0.015em' },
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-montserrat), var(--font-poppins), var(--font-roboto), var(--font-open-sans), "Roboto", "Arial", sans-serif',
                  textTransform: 'none',
                }}
              >
                {slides[currentSlide].title}
              </Typography>
            </motion.div>
            <motion.div variants={childTextVariants}>
              <Typography
                variant={isMobile ? 'h5' : 'h3'}
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem', lg: '2.25rem' },
                  color: '#f0f0f0',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  textShadow: '1px 1px 6px rgba(0,0,0,0.4)',
                  letterSpacing: { xs: '0.02em', md: '0.03em' },
                  lineHeight: 1.25,
                  mb: { xs: 2, md: 3 },
                  fontFamily: 'var(--font-montserrat), var(--font-poppins), var(--font-roboto), var(--font-open-sans), "Roboto", "Arial", sans-serif',
                }}
              >
                {slides[currentSlide].subtitle}
              </Typography>
            </motion.div>
            <motion.div variants={descriptionVariants}>
              <Typography
                variant={isMobile ? 'body1' : 'h6'}
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem', lg: '1.25rem' },
                  color: '#e8e8e8',
                  fontWeight: 300,
                  fontStyle: 'normal',
                  textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
                  letterSpacing: { xs: '0.01em', md: '0.015em' },
                  lineHeight: { xs: 1.7, md: 1.8 },
                  maxWidth: { xs: '100%', md: '750px' },
                  fontFamily: 'var(--font-roboto), var(--font-open-sans), var(--font-poppins), "Roboto", "Open Sans", sans-serif',
                }}
              >
                {slides[currentSlide].description}
              </Typography>
            </motion.div>
          </Box>
        </AnimatePresence>
      </Container>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 30 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            sx={{
              width: { xs: 8, md: 12 },
              height: { xs: 8, md: 12 },
              borderRadius: '50%',
              backgroundColor: index === currentSlide ? '#dc2626' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: index === currentSlide ? '2px solid #ffffff' : '2px solid transparent',
              '&:hover': {
                backgroundColor: index === currentSlide ? '#dc2626' : 'rgba(255,255,255,0.6)',
                transform: 'scale(1.2)',
              },
            }}
          >
            <motion.div
              layout
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? '#dc2626' : 'transparent',
              }}
              animate={{
                scale: index === currentSlide ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: index === currentSlide ? Infinity : 0,
                repeatDelay: 4.5,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SpotlightAnimation;
